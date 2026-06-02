import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const shipmentsTable = pgTable("shipments", {
  id: serial("id").primaryKey(),
  trackingNumber: text("tracking_number").notNull().unique(),
  referenceNumber: text("reference_number"),
  invoiceNumber: text("invoice_number"),
  status: text("status").notNull().default("booking_confirmed"),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  serviceType: text("service_type"),
  description: text("description"),
  weight: numeric("weight"),
  pieces: integer("pieces"),
  estimatedDelivery: text("estimated_delivery"),
  actualDelivery: text("actual_delivery"),
  shipperName: text("shipper_name"),
  consigneeName: text("consignee_name"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertShipmentSchema = createInsertSchema(shipmentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertShipment = z.infer<typeof insertShipmentSchema>;
export type Shipment = typeof shipmentsTable.$inferSelect;
