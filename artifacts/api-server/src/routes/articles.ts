import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { CreateArticleBody, UpdateArticleBody, PublishArticleBody } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const category = req.query.category as string | undefined;
    const published = req.query.published;

    let baseQuery = db.select().from(articlesTable);
    if (published === "true") {
      baseQuery = baseQuery.where(eq(articlesTable.isPublished, true)) as any;
    }
    if (category) {
      baseQuery = baseQuery.where(eq(articlesTable.category, category)) as any;
    }

    const articles = await (baseQuery as any).orderBy(desc(articlesTable.createdAt)).limit(limit).offset(offset);
    const [totalResult] = await db.select({ count: count() }).from(articlesTable);
    res.json({ articles, total: Number(totalResult?.count ?? 0), page, limit });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res): Promise<void> => {
  try {
    const parsed = CreateArticleBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [item] = await db.insert(articlesTable).values(parsed.data).returning();
    res.status(201).json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:slug", async (req, res): Promise<void> => {
  try {
    const { slug } = req.params;
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.slug, slug));
    if (!article) { res.status(404).json({ error: "Not found" }); return; }
    res.json(article);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id/publish", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = PublishArticleBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [updated] = await db.update(articlesTable)
      .set({
        isPublished: parsed.data.isPublished,
        publishedAt: parsed.data.isPublished ? new Date() : null,
      })
      .where(eq(articlesTable.id, id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Not found" }); return; }
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateArticleBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [updated] = await db.update(articlesTable).set(parsed.data).where(eq(articlesTable.id, id)).returning();
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
    await db.delete(articlesTable).where(eq(articlesTable.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
