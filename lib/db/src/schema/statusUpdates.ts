import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { shipmentsTable } from "./shipments";

export const statusUpdatesTable = pgTable("status_updates", {
  id: serial("id").primaryKey(),
  shipmentId: integer("shipment_id").notNull().references(() => shipmentsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertStatusUpdateSchema = createInsertSchema(statusUpdatesTable).omit({ id: true });
export type InsertStatusUpdate = z.infer<typeof insertStatusUpdateSchema>;
export type StatusUpdate = typeof statusUpdatesTable.$inferSelect;
