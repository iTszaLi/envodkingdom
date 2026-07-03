import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { shipmentsTable, statusUpdatesTable } from "@workspace/db";
import app from "../app";
import { getTestDb } from "../test/testDb";

async function seedShipment() {
  const db = getTestDb();
  const [shipment] = await db
    .insert(shipmentsTable)
    .values({
      trackingNumber: "ENVOD-2024-001",
      origin: "Riyadh",
      destination: "Jeddah",
      status: "in_transit",
    })
    .returning();
  await db.insert(statusUpdatesTable).values([
    { shipmentId: shipment.id, status: "booking_confirmed", location: "Riyadh", description: "Booked" },
    { shipmentId: shipment.id, status: "in_transit", location: "Riyadh", description: "On the way" },
  ]);
  return shipment;
}

describe("shipment tracking lookup", () => {
  beforeEach(async () => {
    await seedShipment();
  });

  it("returns the shipment, ordered timeline, and progress for a valid tracking number", async () => {
    const res = await request(app).get("/api/shipments/track/ENVOD-2024-001");
    expect(res.status).toBe(200);
    expect(res.body.shipment.trackingNumber).toBe("ENVOD-2024-001");
    expect(res.body.timeline).toHaveLength(2);
    expect(res.body.timeline[0].status).toBe("booking_confirmed");
    // in_transit is index 5 of 9 statuses -> round(6/9*100) = 67
    expect(res.body.progressPercent).toBe(67);
  });

  it("returns 404 for an unknown tracking number", async () => {
    const res = await request(app).get("/api/shipments/track/DOES-NOT-EXIST");
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  it("computes 0 progress for an unrecognized status", async () => {
    const db = getTestDb();
    await db.insert(shipmentsTable).values({
      trackingNumber: "ENVOD-2024-999",
      origin: "Riyadh",
      destination: "Dammam",
      status: "unknown_status",
    });
    const res = await request(app).get("/api/shipments/track/ENVOD-2024-999");
    expect(res.status).toBe(200);
    expect(res.body.progressPercent).toBe(0);
    expect(res.body.timeline).toHaveLength(0);
  });
});
