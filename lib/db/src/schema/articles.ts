import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const articlesTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  excerptAr: text("excerpt_ar"),
  content: text("content"),
  contentAr: text("content_ar"),
  category: text("category").notNull().default("shipping-regulations"),
  tags: text("tags"),
  featuredImageUrl: text("featured_image_url"),
  authorName: text("author_name").notNull().default("ENVOD Team"),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertArticleSchema = createInsertSchema(articlesTable).omit({ id: true, createdAt: true });
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articlesTable.$inferSelect;
