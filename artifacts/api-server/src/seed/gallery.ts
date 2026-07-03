/**
 * Reproducible seed for the Operations Gallery.
 *
 * Reads the committed operation photos from `attached_assets/stock_images/`,
 * runs the same responsive-WebP + object-storage pipeline used by the admin
 * upload route, and inserts fully-described, published gallery items across
 * all categories. Idempotent: it skips if the gallery already has rows.
 *
 * Run with: `pnpm --filter @workspace/api-server run seed-gallery`
 */
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { db, pool, galleryItemsTable } from "@workspace/db";
import { saveGalleryVariant } from "../lib/galleryStorage";

const TARGET_WIDTHS = [480, 800, 1200, 1600, 2000, 2400];
const MAX_WIDTH = 2400;

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
// artifacts/api-server/src/seed -> repo root
const ASSETS_DIR = path.resolve(SCRIPT_DIR, "../../../../attached_assets/stock_images");

interface SeedItem {
  file: string;
  title: string;
  description: string;
  altText: string;
  category: string;
  location: string;
  monthYear: string;
}

const ITEMS: SeedItem[] = [
  // ── Operations ────────────────────────────────────────────────────────────
  {
    file: "envod_operations_1.jpg",
    title: "Container Vessel Discharge at Jeddah Islamic Port",
    location: "Jeddah Islamic Port",
    monthYear: "2026-05",
    altText: "Ship-to-shore gantry cranes discharging containers from a vessel at Jeddah Islamic Port",
    description: "Coordinated quayside discharge of a full container vessel, one of ENVOD KINGDOM's core seaport operations on the Red Sea.",
    category: "operations",
  },
  {
    file: "envod_operations_2.jpg",
    title: "Stacked Container Yard Operations",
    location: "King Abdulaziz Port, Dammam",
    monthYear: "2026-05",
    altText: "Rows of stacked shipping containers in a busy port yard with reach stackers",
    description: "Yard planning and container marshalling at Dammam ahead of onward inland distribution.",
    category: "operations",
  },
  {
    file: "envod_operations_3.jpg",
    title: "Quayside Crane Loading at Dusk",
    location: "Jeddah Islamic Port",
    monthYear: "2026-04",
    altText: "Port gantry crane loading containers onto a cargo ship at dusk",
    description: "Round-the-clock loading operations keep client cargo moving on schedule.",
    category: "operations",
  },
  {
    file: "envod_operations_4.jpg",
    title: "Inland Container Depot Handling",
    location: "Riyadh Dry Port",
    monthYear: "2026-03",
    altText: "Containers being handled at an inland dry port with heavy lift equipment",
    description: "Rail-linked dry port handling connecting Riyadh to the Kingdom's seaports.",
    category: "operations",
  },
  // ── Customs Clearance ──────────────────────────────────────────────────────
  {
    file: "envod_customs_1.jpg",
    title: "Customs Cargo Inspection",
    location: "Jeddah Islamic Port Customs",
    monthYear: "2026-05",
    altText: "Customs officer inspecting palletised cargo inside a bonded warehouse",
    description: "Hands-on customs inspection support ensuring smooth, compliant clearance for imported goods.",
    category: "customs",
  },
  {
    file: "envod_customs_2.jpg",
    title: "Clearance Documentation Review",
    location: "Riyadh Customs",
    monthYear: "2026-04",
    altText: "Logistics agent reviewing customs clearance documents with shipping containers behind",
    description: "ENVOD KINGDOM's licensed brokers prepare and file declarations to clear shipments quickly.",
    category: "customs",
  },
  {
    file: "envod_customs_3.jpg",
    title: "Bonded Warehouse Verification",
    location: "Batha Border Crossing",
    monthYear: "2026-02",
    altText: "Inspector verifying cargo against manifest in a bonded warehouse near a land border",
    description: "Cross-border clearance and verification at one of the Kingdom's key land gateways.",
    category: "customs",
  },
  // ── Exhibitions ────────────────────────────────────────────────────────────
  {
    file: "envod_exhibitions_1.jpg",
    title: "Exhibition Freight & Stand Delivery",
    location: "Riyadh Front Exhibition Center",
    monthYear: "2026-04",
    altText: "Exhibition hall with booths being set up and freight crates being delivered",
    description: "On-site exhibition logistics, from inbound freight to timed stand delivery for major Riyadh events.",
    category: "exhibitions",
  },
  {
    file: "envod_exhibitions_2.jpg",
    title: "Trade Show Cargo Handling",
    location: "Jeddah Superdome",
    monthYear: "2026-03",
    altText: "Crates and exhibition cargo being handled at a large trade show venue",
    description: "Time-critical handling of exhibitor cargo including customs, delivery and on-stand positioning.",
    category: "exhibitions",
  },
  {
    file: "envod_exhibitions_3.jpg",
    title: "Event Logistics Setup",
    location: "Dhahran Expo",
    monthYear: "2026-01",
    altText: "Workers setting up an exhibition booth with logistics equipment nearby",
    description: "End-to-end event logistics support for exhibitors across the Eastern Province.",
    category: "exhibitions",
  },
  // ── Project Cargo ──────────────────────────────────────────────────────────
  {
    file: "envod_project-cargo_1.jpg",
    title: "Oversized Industrial Equipment Transport",
    location: "Jubail Industrial City",
    monthYear: "2026-05",
    altText: "Oversized industrial equipment loaded on a flatbed trailer for heavy transport",
    description: "Route-surveyed movement of out-of-gauge industrial equipment to a Jubail plant.",
    category: "project-cargo",
  },
  {
    file: "envod_project-cargo_2.jpg",
    title: "Heavy Lift Crane Operation",
    location: "Ras Al-Khair",
    monthYear: "2026-04",
    altText: "Mobile crane lifting a heavy industrial module at a project site",
    description: "Engineered heavy-lift execution for a large-scale project cargo consignment.",
    category: "project-cargo",
  },
  {
    file: "envod_project-cargo_3.jpg",
    title: "Project Module Load-Out",
    location: "NEOM, Tabuk Province",
    monthYear: "2026-02",
    altText: "Large project module being loaded out onto a multi-axle trailer",
    description: "Multi-axle load-out and transport of prefabricated modules for a giga-project site.",
    category: "project-cargo",
  },
  {
    file: "envod_project-cargo_4.jpg",
    title: "Flatbed Convoy Departure",
    location: "Jubail Industrial City",
    monthYear: "2025-12",
    altText: "Convoy of flatbed trucks carrying oversized cargo departing an industrial yard",
    description: "Coordinated convoy movement with escort and permits for oversized project cargo.",
    category: "project-cargo",
  },
  // ── Warehousing ────────────────────────────────────────────────────────────
  {
    file: "envod_warehousing_1.jpg",
    title: "Distribution Center Racking",
    location: "Riyadh Logistics Park",
    monthYear: "2026-05",
    altText: "Interior of a modern warehouse with tall racking full of pallets",
    description: "High-bay storage and inventory management at ENVOD KINGDOM's Riyadh distribution hub.",
    category: "warehousing",
  },
  {
    file: "envod_warehousing_2.jpg",
    title: "Forklift Pallet Handling",
    location: "Jeddah Distribution Center",
    monthYear: "2026-03",
    altText: "Forklift moving palletised goods inside a large warehouse",
    description: "Efficient pallet handling and put-away supporting fast order fulfilment.",
    category: "warehousing",
  },
  {
    file: "envod_warehousing_3.jpg",
    title: "Warehouse Inventory Operations",
    location: "Dammam Second Industrial City",
    monthYear: "2026-02",
    altText: "Warehouse aisle with stacked pallets and shelving in a distribution center",
    description: "Managed storage with real-time inventory control for client goods in the Eastern Province.",
    category: "warehousing",
  },
  {
    file: "envod_warehousing_4.jpg",
    title: "Order Picking & Staging",
    location: "Riyadh Logistics Park",
    monthYear: "2025-11",
    altText: "Staged pallets ready for dispatch in a modern distribution warehouse",
    description: "Pick, pack and staging operations preparing consignments for last-mile delivery.",
    category: "warehousing",
  },
  // ── Freight ────────────────────────────────────────────────────────────────
  {
    file: "envod_freight_1.jpg",
    title: "Air Freight Cargo Handling",
    location: "King Khalid International Airport, Riyadh",
    monthYear: "2026-05",
    altText: "Air cargo being loaded onto a freight aircraft on the tarmac",
    description: "Time-definite air freight forwarding for urgent international consignments.",
    category: "freight",
  },
  {
    file: "envod_freight_2.jpg",
    title: "Long-Haul Truck Fleet",
    location: "Riyadh–Dammam Highway",
    monthYear: "2026-04",
    altText: "Fleet of freight trucks travelling on a highway carrying cargo",
    description: "Reliable overland freight across the Kingdom and to GCC destinations.",
    category: "freight",
  },
  {
    file: "envod_freight_3.jpg",
    title: "Sea Freight Consolidation",
    location: "Jeddah Islamic Port",
    monthYear: "2026-03",
    altText: "Containers staged for sea freight consolidation at a port terminal",
    description: "FCL and LCL sea freight consolidation connecting clients to global trade lanes.",
    category: "freight",
  },
  {
    file: "envod_freight_4.jpg",
    title: "Cross-Border Road Freight",
    location: "King Fahd Causeway",
    monthYear: "2026-01",
    altText: "Cargo trucks crossing an international causeway for regional freight",
    description: "Cross-border road freight and clearance linking Saudi Arabia with the wider GCC.",
    category: "freight",
  },
];

async function processImage(item: SeedItem, sortOrder: number): Promise<void> {
  const filePath = path.join(ASSETS_DIR, item.file);
  const buffer = fs.readFileSync(filePath);

  const meta = await sharp(buffer).metadata();
  let origW = meta.width ?? 0;
  let origH = meta.height ?? 0;
  if (meta.orientation && meta.orientation >= 5) {
    [origW, origH] = [origH, origW];
  }
  if (!origW || !origH) {
    throw new Error(`Could not read dimensions for ${item.file}`);
  }

  const cap = Math.min(origW, MAX_WIDTH);
  const widthSet = new Set<number>(TARGET_WIDTHS.filter((w) => w <= cap));
  widthSet.add(cap);
  const widths = Array.from(widthSet).sort((a, b) => a - b);

  const objectKey = randomUUID();

  for (const w of widths) {
    const buf = await sharp(buffer)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    await saveGalleryVariant(objectKey, `${w}.webp`, buf, "image/webp");
  }

  const blurBuf = await sharp(buffer).rotate().resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  const blurDataUrl = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  await db.insert(galleryItemsTable).values({
    mediaType: "image",
    objectKey,
    widths: widths.join(","),
    width: origW,
    height: origH,
    blurDataUrl,
    title: item.title,
    description: item.description,
    altText: item.altText,
    category: item.category,
    location: item.location,
    monthYear: item.monthYear,
    sortOrder,
    isPublished: true,
  });

  console.log(`  ✓ [${item.category}] ${item.title}`);
}

async function main(): Promise<void> {
  try {
    if (!fs.existsSync(ASSETS_DIR)) {
      throw new Error(`Seed assets directory not found: ${ASSETS_DIR}`);
    }

    // Resumable idempotency: skip items already present (matched by title), so
    // an interrupted run can be re-invoked to finish the remaining items.
    const existing = await db.select().from(galleryItemsTable);
    const existingTitles = new Set(existing.map((r) => r.title));
    const pending = ITEMS.map((item, index) => ({ item, sortOrder: index + 1 })).filter(
      ({ item }) => !existingTitles.has(item.title),
    );

    if (pending.length === 0) {
      console.log(`⚠️  All ${ITEMS.length} gallery items already present — nothing to seed.`);
      return;
    }

    console.log(
      `Seeding ${pending.length} gallery item(s) (${existing.length} already present) from ${ASSETS_DIR} ...`,
    );
    // Process in small concurrent batches to keep the run fast while staying
    // gentle on the object-storage sidecar. sortOrder is derived from the
    // item's fixed index, so ordering is deterministic regardless of timing.
    const BATCH_SIZE = 5;
    for (let i = 0; i < pending.length; i += BATCH_SIZE) {
      const batch = pending.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(({ item, sortOrder }) => processImage(item, sortOrder)));
    }
    console.log(`✅  Seeded ${pending.length} published gallery item(s) across all categories.`);
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
