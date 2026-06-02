import { Router } from "express";
import { db } from "@workspace/db";
import { settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateSettingsBody } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    let [settings] = await db.select().from(settingsTable);
    if (!settings) {
      [settings] = await db.insert(settingsTable).values({}).returning();
    }
    res.json(settings);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/", async (req, res): Promise<void> => {
  try {
    const parsed = UpdateSettingsBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }

    let [settings] = await db.select().from(settingsTable);
    if (!settings) {
      [settings] = await db.insert(settingsTable).values({ ...parsed.data, updatedAt: new Date() }).returning();
    } else {
      [settings] = await db.update(settingsTable)
        .set({ ...parsed.data, updatedAt: new Date() })
        .where(eq(settingsTable.id, settings.id))
        .returning();
    }
    res.json(settings);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
