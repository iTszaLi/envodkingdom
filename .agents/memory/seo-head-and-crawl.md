---
name: SEO head management & crawlability
description: How this app manages document head/SEO and a robots.txt gotcha for dynamically-served media
---

# SEO head hook

- This app manages SEO/head tags imperatively via a shared hook `useSeo` in `artifacts/envod-kingdom/src/lib/seo.tsx`. There is **no react-helmet**.
- `useSeo` sets title + meta (description/OG/Twitter) + canonical + injects JSON-LD `<script>`s; it removes injected JSON-LD and restores the previous `document.title` on unmount.

**Why:** Only some pages adopt `useSeo`. If a page sets the title but does not restore it, navigating away leaves that page's title site-wide (other pages don't manage the title). Restoring `previousTitle` on unmount avoids stale tab titles.

**How to apply:** For any new page needing SEO, reuse `useSeo` rather than adding another head library. Ideally adopt it on all top-level pages so titles are always correct.

# robots.txt vs dynamically-served media/sitemaps

- Image files and the image sitemap are served by the API server under `/api/...` (e.g. `/api/gallery/media/:key/:w.webp`, `/api/sitemap-images.xml`).
- robots.txt has a blanket `Disallow: /api/`. That would block search engines from crawling the images and the image sitemap.

**Why:** Google uses longest-match precedence, so a broad `Disallow: /api/` blocks anything under it unless a more specific `Allow:` overrides it.

**How to apply:** When serving crawlable assets or sitemaps under an otherwise-disallowed path, add specific `Allow:` lines (e.g. `Allow: /api/gallery/media/`, `Allow: /api/sitemap-images.xml`) and list the sitemap in a `Sitemap:` directive. Keep the blanket disallow for the rest of `/api/`.
