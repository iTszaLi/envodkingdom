import { Router } from "express";
import { db } from "@workspace/db";
import { notificationsTable, shipmentsTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { sendWhatsAppNotification, buildWhatsAppMessage } from "../lib/whatsapp";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const items = await db
      .select()
      .from(notificationsTable)
      .orderBy(desc(notificationsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [totalResult] = await db.select({ count: count() }).from(notificationsTable);
    res.json({ notifications: items, total: Number(totalResult?.count ?? 0), page });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/retry/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [notification] = await db.select().from(notificationsTable).where(eq(notificationsTable.id, id));
    if (!notification) { res.status(404).json({ error: "Not found" }); return; }

    const [shipment] = await db.select().from(shipmentsTable)
      .where(eq(shipmentsTable.id, notification.shipmentId));

    const result = await sendWhatsAppNotification({
      trackingNumber: notification.trackingNumber,
      consigneeName: shipment?.consigneeName,
      consigneePhone: notification.recipientPhone,
      newStatus: notification.shipmentStatus,
    });

    const [updated] = await db.update(notificationsTable)
      .set({
        status: result.success ? "sent" : "failed",
        errorMessage: result.error ?? null,
        sentAt: result.success ? new Date() : null,
      })
      .where(eq(notificationsTable.id, id))
      .returning();

    res.json({ notification: updated, result });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/test", async (req, res): Promise<void> => {
  try {
    const { phone, trackingNumber } = req.body;
    if (!phone || !trackingNumber) {
      res.status(400).json({ error: "phone and trackingNumber are required" });
      return;
    }

    const [shipment] = await db.select().from(shipmentsTable)
      .where(eq(shipmentsTable.trackingNumber, trackingNumber));

    if (!shipment) { res.status(404).json({ error: "Shipment not found" }); return; }

    const result = await sendWhatsAppNotification({
      trackingNumber,
      consigneeName: shipment.consigneeName,
      consigneePhone: phone,
      newStatus: shipment.status,
      location: shipment.destination,
      description: `Test notification for shipment ${trackingNumber}`,
    });

    const [notification] = await db.insert(notificationsTable).values({
      shipmentId: shipment.id,
      trackingNumber,
      recipientPhone: phone,
      recipientName: shipment.consigneeName,
      channel: "whatsapp",
      status: result.success ? "sent" : "failed",
      message: buildWhatsAppMessage({
        trackingNumber,
        consigneeName: shipment.consigneeName,
        consigneePhone: phone,
        newStatus: shipment.status,
      }),
      shipmentStatus: shipment.status,
      errorMessage: result.error ?? null,
      sentAt: result.success ? new Date() : null,
    }).returning();

    res.json({ notification, result });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
