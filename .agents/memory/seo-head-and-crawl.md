---
name: SEO head management & crawlability
description: How this app manages document head/SEO and a robots.txt gotcha for dynamically-served media
---

# SEO head hook

- This app manages SEO/head tags imperatively via a shared hook `useSeo` in `artifacts/envod-kingdom/src/lib/seo.tsx`. There is **no react-helmet**.
- `useSeo` sets title + meta (description/OG/Twitter) + canonical + injects JSON-LD `<script>`s; it removes injected JSON-LD and restores the previous `document.title` on unmount.

**Why:** Only some pages adopt `useSeo`. If a page sets the title but does not restore it, navigating away leaves that page's title site-wide (other pages don't manage the title). Restoring `previousTitle` on unmount avoids stale tab titles.

**How to apply:** For any new page needing SEO, reuse `useSeo` rather than adding another head library. Ideally adopt it on all top-level pages so titles are always correct.

# robots.txt disallow precedence (general lesson)

- The site is fully static (July 2026): robots.txt is now just `Allow: /` + `Sitemap:` — no disallowed paths remain.
- Durable lesson kept from the API era: Google uses longest-match precedence, so a broad `Disallow:` (e.g. `Disallow: /api/`) blocks everything under it unless a more specific `Allow:` overrides it.

**How to apply:** If a disallowed path prefix is ever reintroduced, add specific `Allow:` lines for any crawlable assets or sitemaps living under it, and list the sitemap in a `Sitemap:` directive.
