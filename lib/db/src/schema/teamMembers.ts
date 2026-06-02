import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const teamMembersTable = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  role: text("role").notNull(),
  roleAr: text("role_ar"),
  department: text("department").notNull(),
  bio: text("bio"),
  bioAr: text("bio_ar"),
  photoUrl: text("photo_url"),
  linkedinUrl: text("linkedin_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembersTable).omit({ id: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembersTable.$inferSelect;
