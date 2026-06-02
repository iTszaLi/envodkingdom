import { pgTable, serial, integer, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  shipmentId: integer("shipment_id").notNull(),
  trackingNumber: text("tracking_number").notNull(),
  recipientPhone: text("recipient_phone").notNull(),
  recipientName: text("recipient_name"),
  channel: text("channel").notNull().default("whatsapp"),
  status: text("status").notNull().default("pending"),
  message: text("message").notNull(),
  shipmentStatus: text("shipment_status").notNull(),
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNotificationSchema = createInsertSchema(notificationsTable).omit({ id: true, createdAt: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;
