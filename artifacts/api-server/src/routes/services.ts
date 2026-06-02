import { Router } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { CreateServiceBody, UpdateServiceBody } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const services = await db.select().from(servicesTable)
      .where(eq(servicesTable.isActive, true))
      .orderBy(asc(servicesTable.sortOrder));
    res.json(services);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res): Promise<void> => {
  try {
    const parsed = CreateServiceBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [service] = await db.insert(servicesTable).values(parsed.data).returning();
    res.status(201).json(service);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateServiceBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error }); return; }
    const [updated] = await db.update(servicesTable).set(parsed.data).where(eq(servicesTable.id, id)).returning();
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
    await db.delete(servicesTable).where(eq(servicesTable.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
