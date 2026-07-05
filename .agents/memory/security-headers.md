---
name: Security headers architecture
description: Where CSP / referrer / frame headers live for the static site and API, and CSP directives that must not be tightened
---

Security headers live in THREE places — keep them consistent when changing policy:

1. **Build-time meta tags** — `prerender.mjs` injects `<meta http-equiv="Content-Security-Policy">` + `<meta name="referrer">` into every prerendered HTML file and `spa.html`. Dev `index.html` is untouched (meta CSP would break Vite HMR / react-refresh inline scripts). Meta CSP cannot express `frame-ancestors` / `X-Frame-Options` — those only work as real HTTP headers.
2. **`public/_headers`** — full header set (XFO, nosniff, Referrer-Policy, CSP incl. `frame-ancestors`) for Cloudflare Pages if the site is ever hosted there. Inert on Replit hosting.
3. **API HTTP headers** — `app.ts` sets XFO SAMEORIGIN + minimal CSP (`default-src 'none'; img-src 'self'; media-src 'self'; frame-ancestors 'self'`). img/media 'self' is required so directly-opened gallery images/media still render.

**CSP directives that look removable but aren't:**
- `style-src 'unsafe-inline'` — SSG output has framer-motion style="" attributes everywhere.
- `fonts.googleapis.com` / `fonts.gstatic.com` — Google Fonts via CSS import.
- `frame-src maps.google.com www.google.com` — footer map embed (may redirect between the two).
- JSON-LD `<script type="application/ld+json">` blocks are data blocks — NOT subject to script-src; `script-src 'self'` is safe.
- Admin uploads go through same-origin `/api/...` fetches (server-side streaming, no browser presigned PUTs), so `connect-src 'self'` suffices; `storage.googleapis.com` entries are headroom only.

**Why:** headers were requested as SEO/security hardening with zero visual change; the three-location split exists because Replit static hosting offers no custom-header hook, so meta injection at prerender time is the only option there.
**How to apply:** any CSP change must be made in prerender.mjs AND `_headers` together; verify with `grep -l 'http-equiv="Content-Security-Policy"' dist/public/**/*.html | wc -l` (expect 44) and `curl -sI localhost:80/api/healthz`.
