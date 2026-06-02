import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  companyNameEn: text("company_name_en").notNull().default("ENVOD KINGDOM SHIPPING SERVICES LLC"),
  companyNameAr: text("company_name_ar").notNull().default("انفود كينجدم لخدمات الشحن ذ.م.م"),
  taglineEn: text("tagline_en"),
  taglineAr: text("tagline_ar"),
  phone: text("phone").default("+966 58 367 1739"),
  whatsapp: text("whatsapp").default("+966 50 226 0256"),
  email: text("email"),
  address: text("address").default("Prince Mansour Bin Abdulaziz Street, Al Malaz District"),
  addressAr: text("address_ar"),
  city: text("city").default("Riyadh"),
  country: text("country").default("Saudi Arabia"),
  postalCode: text("postal_code").default("12831"),
  logoUrl: text("logo_url"),
  facebookUrl: text("facebook_url"),
  twitterUrl: text("twitter_url"),
  linkedinUrl: text("linkedin_url"),
  instagramUrl: text("instagram_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSettingsSchema = createInsertSchema(settingsTable).omit({ id: true });
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settingsTable.$inferSelect;
