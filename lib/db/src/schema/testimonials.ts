import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  company: text("company").notNull(),
  role: text("role"),
  content: text("content").notNull(),
  contentAr: text("content_ar"),
  rating: integer("rating").notNull().default(5),
  logoUrl: text("logo_url"),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonialsTable.$inferSelect;
