import { Router } from "express";
import { db } from "@workspace/db";
import { shipmentsTable, inquiriesTable, clientsTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const [shipmentCount] = await db.select({ count: count() }).from(shipmentsTable);
    const [activeShipments] = await db.select({ count: count() }).from(shipmentsTable)
      .where(eq(shipmentsTable.status, "in_transit"));
    const [clientCount] = await db.select({ count: count() }).from(clientsTable)
      .where(eq(clientsTable.isActive, true));
    const [pendingInquiries] = await db.select({ count: count() }).from(inquiriesTable)
      .where(eq(inquiriesTable.status, "new"));

    res.json({
      yearsExperience: 25,
      shipmentsDelivered: Math.max(10000, Number(shipmentCount?.count ?? 0)),
      corporateClients: Math.max(500, Number(clientCount?.count ?? 0)),
      globalPartners: 50,
      onTimeDeliveryRate: 99.8,
      customsClearanceHours: 24,
      activeShipments: Number(activeShipments?.count ?? 0),
      pendingInquiries: Number(pendingInquiries?.count ?? 0),
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
