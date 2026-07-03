import type { GalleryItem } from "@workspace/api-client-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Public URL for a specific responsive WebP variant of a gallery image. */
export function mediaUrl(objectKey: string, width: number): string {
  return `${BASE}/api/gallery/media/${objectKey}/${width}.webp`;
}

/** Build a responsive srcset string from an item's available widths. */
export function buildSrcSet(item: Pick<GalleryItem, "objectKey" | "widths">): string {
  return item.widths.map((w) => `${mediaUrl(item.objectKey, w)} ${w}w`).join(", ");
}

/** Pick a sensible default `src` — largest variant at or below `preferred`, else largest. */
export function defaultSrc(
  item: Pick<GalleryItem, "objectKey" | "widths">,
  preferred = 1200,
): string {
  if (item.widths.length === 0) return mediaUrl(item.objectKey, preferred);
  const sorted = [...item.widths].sort((a, b) => a - b);
  const atOrBelow = sorted.filter((w) => w <= preferred);
  const chosen = atOrBelow.length ? atOrBelow[atOrBelow.length - 1] : sorted[sorted.length - 1];
  return mediaUrl(item.objectKey, chosen);
}

/** The largest available variant — used for lightbox and Open Graph. */
export function largestSrc(item: Pick<GalleryItem, "objectKey" | "widths">): string {
  if (item.widths.length === 0) return mediaUrl(item.objectKey, 1600);
  return mediaUrl(item.objectKey, Math.max(...item.widths));
}

/** Default responsive `sizes` for the masonry grid. */
export const GRID_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw";

export interface GalleryCategory {
  id: string;
  en: string;
  ar: string;
}

/** Known categories with bilingual labels. `all` is the default filter. */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: "all", en: "All", ar: "الكل" },
  { id: "operations", en: "Operations", ar: "العمليات" },
  { id: "customs", en: "Customs Clearance", ar: "التخليص الجمركي" },
  { id: "exhibitions", en: "Exhibitions", ar: "المعارض" },
  { id: "project-cargo", en: "Project Cargo", ar: "بضائع المشاريع" },
  { id: "warehousing", en: "Warehousing", ar: "التخزين" },
  { id: "freight", en: "Freight", ar: "الشحن" },
];

/** Categories the admin can assign on upload (excludes the "all" pseudo-filter). */
export const UPLOAD_CATEGORIES = GALLERY_CATEGORIES.filter((c) => c.id !== "all");

export function categoryLabel(id: string, t: (en: string, ar: string) => string): string {
  const found = GALLERY_CATEGORIES.find((c) => c.id === id);
  if (found) return t(found.en, found.ar);
  return id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Format a `YYYY-MM` month key into a readable label, e.g. "March 2026". */
export function formatMonthYear(monthYear: string | null | undefined): string | null {
  if (!monthYear) return null;
  const match = /^(\d{4})-(\d{2})$/.exec(monthYear.trim());
  if (!match) return monthYear;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) return monthYear;
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export interface MonthGroup {
  key: string;
  label: string;
  items: GalleryItem[];
}

/** Group published items by month/year (newest first), skipping items with no month. */
export function groupByMonth(items: GalleryItem[]): MonthGroup[] {
  const map = new Map<string, GalleryItem[]>();
  for (const item of items) {
    if (!item.monthYear) continue;
    const arr = map.get(item.monthYear) ?? [];
    arr.push(item);
    map.set(item.monthYear, arr);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, groupItems]) => ({
      key,
      label: formatMonthYear(key) ?? key,
      items: groupItems,
    }));
}
