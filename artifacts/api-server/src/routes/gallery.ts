import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { randomUUID } from "crypto";
import { db } from "@workspace/db";
import { galleryItemsTable, type GalleryItem } from "@workspace/db";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import { UpdateGalleryItemBody, ReorderGalleryBody } from "@workspace/api-zod";
import { requireAdmin } from "../lib/requireAdmin";
import {
  saveGalleryVariant,
  getGalleryVariantStream,
  deleteGalleryObject,
} from "../lib/galleryStorage";

const router = Router();

const TARGET_WIDTHS = [480, 800, 1200, 1600, 2000, 2400];
const MAX_WIDTH = 2400;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024, files: 24 },
});

function toDto(row: GalleryItem) {
  return {
    ...row,
    widths: row.widths
      .split(",")
      .map((w) => parseInt(w, 10))
      .filter((n) => !Number.isNaN(n)),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function deriveTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const cleaned = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "Operation";
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 120);
}

// ── PUBLIC: media streaming (long-lived immutable cache) ─────────────────────
router.get("/media/:key/:variant", async (req, res): Promise<void> => {
  const { key, variant } = req.params;
  if (!/^[a-zA-Z0-9-]+$/.test(key) || !/^\d+\.webp$/.test(variant)) {
    res.status(400).json({ error: "Invalid media path" });
    return;
  }
  try {
    const result = await getGalleryVariantStream(key, variant);
    if (!result) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    if (result.metadata.size) {
      res.setHeader("Content-Length", String(result.metadata.size));
    }
    result.stream.on("error", (err) => {
      req.log.error(err, "Gallery media stream error");
      if (!res.headersSent) res.status(500).end();
    });
    result.stream.pipe(res);
  } catch (err) {
    req.log.error(err, "Gallery media fetch failed");
    if (!res.headersSent) res.status(500).json({ error: "Internal server error" });
  }
});

// ── PUBLIC: list ─────────────────────────────────────────────────────────────
router.get("/", async (req, res): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const published = req.query.published;
    const isAdmin = !!(req.session as { adminId?: number } | undefined)?.adminId;

    const conditions = [];
    if (!isAdmin || published === "true") conditions.push(eq(galleryItemsTable.isPublished, true));
    if (category && category !== "all") conditions.push(eq(galleryItemsTable.category, category));

    const rows = await db
      .select()
      .from(galleryItemsTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(galleryItemsTable.sortOrder), desc(galleryItemsTable.createdAt));

    res.json(rows.map(toDto));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── ADMIN: multi-file upload (sharp → responsive WebP → object storage) ──────
router.post("/upload", requireAdmin, upload.array("files", 24), async (req, res): Promise<void> => {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  if (files.length === 0) {
    res.status(400).json({ error: "No files uploaded. Send images as form-data field 'files'." });
    return;
  }

  const category = typeof req.body.category === "string" && req.body.category ? req.body.category : "operations";

  try {
    const [maxRow] = await db
      .select({ max: sql<number>`coalesce(max(${galleryItemsTable.sortOrder}), 0)` })
      .from(galleryItemsTable);
    let nextSort = Number(maxRow?.max ?? 0);

    const created: ReturnType<typeof toDto>[] = [];
    const skipped: string[] = [];

    for (const file of files) {
      if (!file.mimetype.startsWith("image/")) {
        skipped.push(file.originalname);
        continue;
      }

      const meta = await sharp(file.buffer).metadata();
      let origW = meta.width ?? 0;
      let origH = meta.height ?? 0;
      if (meta.orientation && meta.orientation >= 5) {
        [origW, origH] = [origH, origW];
      }
      if (!origW || !origH) {
        skipped.push(file.originalname);
        continue;
      }

      const cap = Math.min(origW, MAX_WIDTH);
      const widthSet = new Set<number>(TARGET_WIDTHS.filter((w) => w <= cap));
      widthSet.add(cap);
      const widths = Array.from(widthSet).sort((a, b) => a - b);

      const objectKey = randomUUID();

      for (const w of widths) {
        const buf = await sharp(file.buffer)
          .rotate()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();
        await saveGalleryVariant(objectKey, `${w}.webp`, buf, "image/webp");
      }

      const blurBuf = await sharp(file.buffer)
        .rotate()
        .resize({ width: 24 })
        .webp({ quality: 40 })
        .toBuffer();
      const blurDataUrl = `data:image/webp;base64,${blurBuf.toString("base64")}`;

      nextSort += 1;
      const [row] = await db
        .insert(galleryItemsTable)
        .values({
          mediaType: "image",
          objectKey,
          widths: widths.join(","),
          width: origW,
          height: origH,
          blurDataUrl,
          title: deriveTitle(file.originalname),
          category,
          sortOrder: nextSort,
          isPublished: true,
        })
        .returning();
      created.push(toDto(row));
    }

    if (created.length === 0) {
      res.status(400).json({ error: "No valid images were processed.", skipped });
      return;
    }

    req.log.info({ count: created.length, skipped: skipped.length }, "Gallery upload processed");
    res.status(201).json({ created, skipped });
  } catch (err) {
    req.log.error(err, "Gallery upload failed");
    res.status(500).json({ error: "Upload failed while processing images." });
  }
});

// ── ADMIN: reorder ───────────────────────────────────────────────────────────
router.post("/reorder", requireAdmin, async (req, res): Promise<void> => {
  try {
    const parsed = ReorderGalleryBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const { ids } = parsed.data;
    await db.transaction(async (tx) => {
      for (let i = 0; i < ids.length; i++) {
        await tx
          .update(galleryItemsTable)
          .set({ sortOrder: i + 1, updatedAt: new Date() })
          .where(eq(galleryItemsTable.id, ids[i]));
      }
    });
    const rows = await db
      .select()
      .from(galleryItemsTable)
      .orderBy(asc(galleryItemsTable.sortOrder), desc(galleryItemsTable.createdAt));
    res.json(rows.map(toDto));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── PUBLIC: get one ──────────────────────────────────────────────────────────
router.get("/:id", async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [row] = await db.select().from(galleryItemsTable).where(eq(galleryItemsTable.id, id));
    const isAdmin = !!(req.session as { adminId?: number } | undefined)?.adminId;
    if (!row || (!row.isPublished && !isAdmin)) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(toDto(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── ADMIN: update metadata ───────────────────────────────────────────────────
router.patch("/:id", requireAdmin, async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const parsed = UpdateGalleryItemBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const [updated] = await db
      .update(galleryItemsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(galleryItemsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(toDto(updated));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── ADMIN: delete ────────────────────────────────────────────────────────────
router.delete("/:id", requireAdmin, async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [row] = await db.select().from(galleryItemsTable).where(eq(galleryItemsTable.id, id));
    if (row) {
      await deleteGalleryObject(row.objectKey);
      await db.delete(galleryItemsTable).where(eq(galleryItemsTable.id, id));
    }
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
