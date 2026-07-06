# ENVOD KINGDOM SHIPPING SERVICES LLC

Fully static, bilingual (English / Arabic, LTR / RTL) marketing site. React 19 + Vite, Tailwind CSS, framer-motion, wouter. Every content page is prerendered to real HTML for SEO; no backend, no database, no server required.

## Commands

```bash
pnpm install     # install dependencies
pnpm dev         # local dev server
pnpm build       # production build → dist/
pnpm preview     # preview the production build locally
pnpm typecheck   # TypeScript check
```

`pnpm build` outputs a single `dist/` folder containing the client bundle, all prerendered pages, `spa.html` (SPA fallback), and `sitemap.xml`.

## Deploying to Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | `pnpm install && pnpm build` |
| Build output directory | `dist` |
| Environment variables | `NODE_VERSION=24` |

> **Important:** do NOT set `NODE_ENV=production` as an environment variable in Cloudflare Pages — it would make pnpm skip the dev dependencies (Vite, TypeScript, React) that the build needs. The `packageManager` field in `package.json` pins pnpm to a version compatible with the lockfile automatically.

No other configuration is needed:

- `public/_redirects` provides the `/* /spa.html 200` fallback for client-only routes (e.g. `/track`).
- `public/_headers` sets the security headers (X-Frame-Options, CSP `frame-ancestors`, etc.).
- Cloudflare Pages resolves clean URLs (`/services` → `/services/index.html`) automatically.

## Structure

- `src/` — application code
  - `src/lib/service-data.ts` — static services catalog (source of truth for all service pages)
  - `src/lib/quote-mailto.ts` — shared `mailto:` builder for the quote/contact forms
  - `src/lib/seo-config.ts` — per-route SEO + `CONTENT_ROUTES` (drives prerendering and the sitemap)
- `public/` — favicons, robots.txt, `_redirects`, `_headers`, media
- `attached_assets/` — imported images (via the `@assets/` alias)
- `prerender.mjs` — post-build SSG step (runs automatically as part of `pnpm build`)

## Notes

- Quote/contact forms open the visitor's mail app with a pre-filled draft to `info@envodkingdom.net` (subject "Quote Request") — no backend involved.
- The track page shows a bilingual "online tracking available soon — contact operations" notice.
- Google Font imports in `src/index.css` must stay the very first lines, before `@import "tailwindcss"`.
