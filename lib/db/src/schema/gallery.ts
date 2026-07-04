import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const galleryItemsTable = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  mediaType: text("media_type").notNull().default("image"),
  objectKey: text("object_key").notNull(),
  widths: text("widths").notNull().default("480,800,1200,1600,2000"),
  width: integer("width").notNull().default(0),
  height: integer("height").notNull().default(0),
  blurDataUrl: text("blur_data_url"),
  title: text("title").notNull().default("Operation"),
  titleAr: text("title_ar"),
  description: text("description"),
  descriptionAr: text("description_ar"),
  altText: text("alt_text"),
  altTextAr: text("alt_text_ar"),
  category: text("category").notNull().default("operations"),
  location: text("location"),
  locationAr: text("location_ar"),
  monthYear: text("month_year"),
  videoUrl: text("video_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItemsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItemsTable.$inferSelect;
