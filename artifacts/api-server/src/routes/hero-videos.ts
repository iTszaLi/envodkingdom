import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRAMES_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "artifacts",
  "envod-kingdom",
  "public",
  "frames",
);

const SECTIONS: Record<string, { key: string; label: string }> = {
  crane: { key: "crane", label: "Air Freight / Airport Operations" },
  air: { key: "air", label: "Warehouse to Trailer / Road Logistics" },
  warehouse: { key: "warehouse", label: "Sea Terminal / Port Operations" },
};

const BASE_URL = "/frames";

function getSectionInfo(key: string) {
  const dir = path.join(FRAMES_DIR, key);
  let frameCount = 0;
  let updatedAt = new Date().toISOString();
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".jpg"))
      .sort();
    frameCount = files.length;
    if (files.length > 0) {
      const stat = fs.statSync(path.join(dir, files[files.length - 1]));
      updatedAt = stat.mtime.toISOString();
    }
  } catch {
    frameCount = 0;
  }
  return {
    key,
    label: SECTIONS[key].label,
    frameCount,
    thumbnailUrl: `${BASE_URL}/${key}/0000.jpg`,
    updatedAt,
  };
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 200 * 1024 * 1024 } });

const router = Router();

router.get("/", async (req, res): Promise<void> => {
  try {
    const sections = Object.keys(SECTIONS).map(getSectionInfo);
    res.json(sections);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:section", upload.single("file"), async (req, res): Promise<void> => {
  const section = String(req.params.section);
  if (!SECTIONS[section]) {
    res.status(400).json({ error: `Unknown section '${section}'. Must be: crane, air, warehouse.` });
    return;
  }
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded. Send a WebP file as form-data field 'file'." });
    return;
  }

  const tmpPath = path.join("/tmp", `hero-upload-${Date.now()}.webp`);
  const destDir = path.join(FRAMES_DIR, section);

  try {
    fs.writeFileSync(tmpPath, req.file.buffer);

    const pyScript = `
import sys, os, math
from PIL import Image

src = sys.argv[1]
dst = sys.argv[2]
TARGET = 120

img = Image.open(src)
total = 0
try:
    while True:
        img.seek(total)
        total += 1
except EOFError:
    pass

# Clear existing frames
for f in os.listdir(dst):
    if f.endswith('.jpg'):
        os.remove(os.path.join(dst, f))

step = max(1, math.ceil(total / TARGET))
written = 0
for i in range(0, total, step):
    img.seek(i)
    frame = img.convert('RGB')
    frame.save(os.path.join(dst, f'{written:04d}.jpg'), 'JPEG', quality=80, optimize=True)
    written += 1

print(written)
`;

    const result = execSync(`python3 -c '${pyScript.replace(/'/g, "'\\''")}' '${tmpPath}' '${destDir}'`, {
      timeout: 120_000,
      encoding: "utf-8",
    });

    const frameCount = parseInt(result.trim(), 10);
    req.log.info({ section, frameCount }, "Hero video frames updated");

    res.json({
      key: section,
      label: SECTIONS[section].label,
      frameCount,
      thumbnailUrl: `${BASE_URL}/${section}/0000.jpg`,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Frame extraction failed");
    res.status(500).json({ error: "Frame extraction failed. Ensure the file is a valid animated WebP." });
  } finally {
    try { fs.unlinkSync(tmpPath); } catch { /* ignore */ }
  }
});

export default router;
