---
name: Catalog-only services vs live API
description: Why a service added only to the frontend SERVICE_CATALOG can silently disappear, and the merge/fallback pattern required to keep it visible.
---

The envod-kingdom service list has TWO sources:
- the live API (`useListServices`), backed by the DB seed — currently returns only the originally-seeded services;
- a static `SERVICE_CATALOG` + `SERVICE_META` in the frontend (`src/lib/service-data.ts`), which can hold MORE services than the DB.

**Rule:** a service added only to the static catalog (no DB seed row) will NOT appear once the API query hydrates, because the listing/detail pages prefer API data.

**Why:** `/services` (services.tsx) and `/services/:slug` (service-detail.tsx) default to the API result; before hydration they show the catalog, then the catalog-only entry silently drops out when API data arrives.

**How to apply — when adding a catalog-only service (e.g. ATA Carnet, id 19):**
- Listing page must MERGE catalog-only entries: append `SERVICE_CATALOG.filter(c => !apiData.some(s => s.id === c.id))` (dedupe by id; note merged entries append at the end and are not re-sorted by `sortOrder`).
- Detail page must FALL BACK: `apiData?.find(...) ?? SERVICE_CATALOG.find(...)`.
- Add the slug's prerender rewrite to `artifact.toml` (via the verify-and-replace flow). `CONTENT_ROUTES` auto-derives from `SERVICE_CATALOG`, and prerender.mjs asserts CONTENT_ROUTES↔artifact.toml both ways, so the build FAILS without the rewrite.
- Icons are string names resolved by a per-file lucide `ServiceIcon` map. Add any new icon to EVERY map: services.tsx, service-detail.tsx, ServicesSection.tsx (the homepage is catalog-driven and shares the same string→component pattern).
