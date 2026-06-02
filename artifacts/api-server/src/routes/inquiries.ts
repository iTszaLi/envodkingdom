import { Router } from "express";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { SubmitInquiryBody, UpdateInquiryBody } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    const status = req.query.status as string | undefined;

    let query = db.select().from(inquiriesTable);
    if (status) {
      query = query.where(eq(inquiriesTable.status, status)) as any;
    }

    const inquiries = await (query as any).orderBy(desc(inquiriesTable.createdAt)).limit(limit).offset(offset);
    const [totalResult] = await db.select({ count: count() }).from(inquiriesTable);
    res.json({ inquiries, total: Number(totalResult?.count ?? 0), page });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res): Promise<void> => {
  try {
    const parsed = SubmitInquiryBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [item] = await db.insert(inquiriesTable).values(parsed.data).returning();
    res.status(201).json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateInquiryBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [updated] = await db.update(inquiriesTable).set(parsed.data).where(eq(inquiriesTable.id, id)).returning();
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
    await db.delete(inquiriesTable).where(eq(inquiriesTable.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
