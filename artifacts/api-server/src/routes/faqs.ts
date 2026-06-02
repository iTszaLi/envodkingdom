import { Router } from "express";
import { db } from "@workspace/db";
import { faqsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { CreateFaqBody, UpdateFaqBody } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    let query = db.select().from(faqsTable).where(eq(faqsTable.isActive, true)).orderBy(asc(faqsTable.sortOrder));
    if (category) {
      query = db.select().from(faqsTable)
        .where(eq(faqsTable.category, category))
        .orderBy(asc(faqsTable.sortOrder)) as any;
    }
    res.json(await query);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res): Promise<void> => {
  try {
    const parsed = CreateFaqBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [item] = await db.insert(faqsTable).values(parsed.data).returning();
    res.status(201).json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateFaqBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [updated] = await db.update(faqsTable).set(parsed.data).where(eq(faqsTable.id, id)).returning();
    if (!updated) { res.status(404).json({ error: "Not found" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await db.delete(faqsTable).where(eq(faqsTable.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
