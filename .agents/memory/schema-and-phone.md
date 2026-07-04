---
name: Site schema locations & primary phone
description: Where JSON-LD structured data lives on the envod-kingdom site and the primary-phone consistency invariant across all of it
---

# JSON-LD lives in two places

The envod-kingdom marketing site emits structured data from **two** independent
sources. When auditing or editing schema, check both:

1. **Static, hand-written blocks in `artifacts/envod-kingdom/index.html`** —
   the `Organization`, `LocalBusiness`/`MovingCompany`, and `WebSite` nodes.
   These are plain `<script type="application/ld+json">` tags with no
   `data-seo-ssg` attribute, so they persist across the `useSeo` head-manager's
   cleanup and are always present on every page.
2. **Dynamic, per-page blocks built in `src/lib/seo-config.ts`** — e.g.
   `WebPage`, `BreadcrumbList`, `ItemList` (services), `OfferCatalog`,
   `FAQPage`, and per-service `Service`. These are injected per route by the
   prerenderer (`prerender.mjs`) and by `useSeo`/`useJsonLd` at runtime.

**Graph linkage:** dynamic nodes reference the static Organization via its
`@id` (`ORG_ID = ${SITE_URL}/#organization`). The OfferCatalog is emitted as an
`Organization` node with the same `@id` carrying `hasOfferCatalog`, so JSON-LD
`@id` graph-merging attaches the catalog to the static Organization node instead
of leaving an orphan. Keep `ORG_ID` identical in both files.

**Schema.org gotchas** (validator warnings, worth avoiding): `provider` is NOT a
valid property of `OfferCatalog` (it extends `ItemList`); `position` is a
`ListItem` property, not an `Offer` property. Put `provider` on the nested
`Service` (via `itemOffered`), and don't add `position` to `Offer`.

# Primary phone invariant

**Primary phone = `+966 50 226 0256`** (display), `+966502260256` (schema
`telephone` E.164), `966502260256` (wa.me links). Fax is `+966 11 238 0517`.

This number must be identical across: the visible site (footer, contact page,
service pages, WhatsApp links), the static schema in `index.html`
(`Organization.telephone`, its `contactPoint`, `LocalBusiness.telephone`), and
any dynamic schema. A stray different primary number once lived ONLY in the
`index.html` schema (nowhere visible) — grep the whole repo (including
`attached_assets/`) for any old number before assuming consistency.
