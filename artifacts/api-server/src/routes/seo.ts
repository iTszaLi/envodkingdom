import { Router } from "express";
import { db } from "@workspace/db";
import { galleryItemsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

function xmlEscape(s: string): string {
  return s.replace(
    /[<>&'"]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string),
  );
}

router.get("/sitemap-images.xml", async (req, res): Promise<void> => {
  try {
    const proto = (req.headers["x-forwarded-proto"] as string)?.split(",")[0] || req.protocol;
    const host = (req.headers["x-forwarded-host"] as string) || req.get("host") || "";
    const base = `${proto}://${host}`;

    const rows = await db
      .select()
      .from(galleryItemsTable)
      .where(eq(galleryItemsTable.isPublished, true))
      .orderBy(asc(galleryItemsTable.sortOrder));

    const pageUrl = `${base}/gallery`;
    const images = rows
      .map((r) => {
        const widths = r.widths
          .split(",")
          .map((w) => parseInt(w, 10))
          .filter((n) => !Number.isNaN(n));
        const largest = widths.length ? Math.max(...widths) : 1200;
        const loc = `${base}/api/gallery/media/${r.objectKey}/${largest}.webp`;
        const title = xmlEscape(r.title || "ENVOD KINGDOM operation");
        const caption = xmlEscape(r.description || r.title || "");
        return `    <image:image>\n      <image:loc>${loc}</image:loc>\n      <image:title>${title}</image:title>\n      <image:caption>${caption}</image:caption>\n    </image:image>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${pageUrl}</loc>\n${images}\n  </url>\n</urlset>\n`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(xml);
  } catch (err) {
    req.log.error(err);
    res.status(500).send("Internal server error");
  }
});

export default router;
