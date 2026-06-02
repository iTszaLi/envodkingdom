import { Router } from "express";
import { db } from "@workspace/db";
import { shipmentsTable, statusUpdatesTable } from "@workspace/db";
import { eq, like, desc, count, or } from "drizzle-orm";
import { CreateShipmentBody, UpdateShipmentBody, AddShipmentStatusBody } from "@workspace/api-zod";

const router = Router();

const STATUS_ORDER = [
  "booking_confirmed",
  "cargo_received",
  "documentation_complete",
  "customs_clearance",
  "port_processing",
  "in_transit",
  "warehouse_arrival",
  "out_for_delivery",
  "delivered",
];

router.get("/", async (req, res): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search as string | undefined;
    const status = req.query.status as string | undefined;

    let query = db.select().from(shipmentsTable);
    if (status) {
      query = query.where(eq(shipmentsTable.status, status)) as any;
    } else if (search) {
      query = query.where(
        or(
          like(shipmentsTable.trackingNumber, `%${search}%`),
          like(shipmentsTable.consigneeName, `%${search}%`),
          like(shipmentsTable.shipperName, `%${search}%`),
        )
      ) as any;
    }

    const shipments = await (query as any).orderBy(desc(shipmentsTable.createdAt)).limit(limit).offset(offset);
    const [totalResult] = await db.select({ count: count() }).from(shipmentsTable);
    res.json({ shipments, total: Number(totalResult?.count ?? 0), page, limit });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res): Promise<void> => {
  try {
    const parsed = CreateShipmentBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const insertData = {
      ...parsed.data,
      weight: parsed.data.weight != null ? String(parsed.data.weight) : undefined,
    };
    const [shipment] = await db.insert(shipmentsTable).values(insertData as any).returning();
    await db.insert(statusUpdatesTable).values({
      shipmentId: shipment!.id,
      status: "booking_confirmed",
      location: parsed.data.origin,
      description: "Shipment booking confirmed",
    });
    res.status(201).json(shipment);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/track/:trackingNumber", async (req, res): Promise<void> => {
  try {
    const { trackingNumber } = req.params;
    const [shipment] = await db.select().from(shipmentsTable)
      .where(eq(shipmentsTable.trackingNumber, trackingNumber));
    if (!shipment) { res.status(404).json({ error: "Shipment not found" }); return; }

    const timeline = await db.select().from(statusUpdatesTable)
      .where(eq(statusUpdatesTable.shipmentId, shipment.id))
      .orderBy(statusUpdatesTable.timestamp);

    const statusIndex = STATUS_ORDER.indexOf(shipment.status);
    const progressPercent = statusIndex >= 0
      ? Math.round(((statusIndex + 1) / STATUS_ORDER.length) * 100)
      : 0;

    res.json({ shipment, timeline, progressPercent });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [shipment] = await db.select().from(shipmentsTable).where(eq(shipmentsTable.id, id));
    if (!shipment) { res.status(404).json({ error: "Not found" }); return; }
    res.json(shipment);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateShipmentBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const updateData = {
      ...parsed.data,
      weight: parsed.data.weight != null ? String(parsed.data.weight) : undefined,
      updatedAt: new Date(),
    };
    const [updated] = await db.update(shipmentsTable)
      .set(updateData as any)
      .where(eq(shipmentsTable.id, id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Not found" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await db.delete(shipmentsTable).where(eq(shipmentsTable.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/status", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = AddShipmentStatusBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }

    const [statusUpdate] = await db.insert(statusUpdatesTable).values({
      shipmentId: id,
      ...parsed.data,
      timestamp: parsed.data.timestamp ? new Date(parsed.data.timestamp) : new Date(),
    }).returning();

    await db.update(shipmentsTable)
      .set({ status: parsed.data.status, updatedAt: new Date() })
      .where(eq(shipmentsTable.id, id));

    res.status(201).json(statusUpdate);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
