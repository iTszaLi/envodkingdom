# ENVOD KINGDOM SHIPPING SERVICES LLC

Enterprise-grade bilingual (English / Arabic, LTR / RTL) logistics platform for ENVOD KINGDOM SHIPPING SERVICES LLC — a cinematic marketing site with a shipment tracking portal, operations gallery, knowledge center, and a full admin CMS.

- **Frontend** — React 19 + Vite, Tailwind CSS, framer-motion, wouter, TanStack Query. Statically prerendered (42 routes) for SEO, with client-side hydration.
- **API** — Express 5 + express-session, PostgreSQL via Drizzle ORM.
- **Contract-first API** — an OpenAPI spec (`lib/api-spec/openapi.yaml`) drives code generation for React Query hooks and Zod validation schemas.

## Repository layout

```
artifacts/envod-kingdom/   React + Vite frontend (public site + admin CMS)
artifacts/api-server/      Express API server (port 8080)
artifacts/mockup-sandbox/  Internal design-preview sandbox (not deployed)
lib/db/                    Drizzle ORM schema (PostgreSQL)
lib/api-spec/              OpenAPI spec — source of truth for the API
lib/api-client-react/      Generated React Query hooks (do not edit by hand)
lib/api-zod/               Generated Zod schemas (do not edit by hand)
scripts/                   Utility / seed scripts
```

## Prerequisites

- **Node.js 24+**
- **pnpm 10** (`corepack enable` or `npm i -g pnpm`)
- **PostgreSQL** database (for the API server)

## Installation

```bash
pnpm install
```

## Environment variables

The API server requires:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Session-cookie signing secret (required in production) |

Optional (gallery photo uploads via object storage):

| Variable | Purpose |
|---|---|
| `DEFAULT_OBJECT_STORAGE_BUCKET_ID` | Object storage bucket |
| `PRIVATE_OBJECT_DIR` | Private upload directory |
| `PUBLIC_OBJECT_SEARCH_PATHS` | Public asset search paths |

Never commit secrets — `.env` files are gitignored. Provide these via your host's secret manager.

Push the database schema (development):

```bash
pnpm --filter @workspace/db run push
```

## Development

```bash
# API server (http://localhost:8080) — PORT and DATABASE_URL are required
PORT=8080 DATABASE_URL=<postgres-url> pnpm --filter @workspace/api-server run dev

# Frontend dev server (PORT and BASE_PATH are required by vite.config)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/envod-kingdom run dev
```

Other useful commands:

```bash
pnpm run typecheck                                  # full typecheck across all packages
pnpm --filter @workspace/api-server run test        # API test suite (vitest, in-memory Postgres)
pnpm --filter @workspace/api-spec run codegen       # regenerate hooks/schemas from the OpenAPI spec
pnpm --filter @workspace/api-server run seed-gallery # seed the gallery from committed photos
```

## Production build

```bash
# Frontend — static output with 42 prerendered routes
BASE_PATH=/ PORT=3000 pnpm --filter @workspace/envod-kingdom run build
# → artifacts/envod-kingdom/dist/public

# API server — single bundled file
pnpm --filter @workspace/api-server run build
node --enable-source-maps artifacts/api-server/dist/index.mjs
```

## Deploying to Cloudflare Pages

The **frontend** is fully compatible with Cloudflare Pages (it builds to plain static files with an SPA fallback via the included `_redirects` file).

**Pages project settings:**

| Setting | Value |
|---|---|
| Build command | `pnpm install --frozen-lockfile && BASE_PATH=/ PORT=3000 pnpm --filter @workspace/envod-kingdom run build` |
| Build output directory | `artifacts/envod-kingdom/dist/public` |
| Environment variables | `NODE_VERSION=24` and `PNPM_VERSION=10` (the lockfile requires pnpm 10 — the Pages default pnpm cannot read it) |

**Important — the API must be hosted separately.** Cloudflare Pages serves static files only; the Express API server (`/api/*` — shipment tracking, gallery content, contact form, admin CMS) cannot run there. Options:

1. **Keep full-stack hosting on Replit** (simplest — one deployment serves both site and API), or
2. Deploy the frontend to Pages and host the API elsewhere (Replit, Fly.io, Railway, a VPS), then route `/api/*` from your Cloudflare zone to the API origin with a Cloudflare Worker or origin rule. The frontend calls the API with relative `/api/...` URLs, so same-domain routing is required (no code changes needed once routing is in place).

Without the API attached, the static site still renders all 42 prerendered marketing pages, but dynamic features will show empty/error states.

## Security notes

- All secrets are read from environment variables; nothing sensitive is committed.
- The admin CMS lives at `/admin`. **Rotate the admin password before making this repository public** — old commit history may contain earlier credentials. There is currently no in-app password change: reset it by updating `admin_users.password_hash` in the database with the SHA256 hash of `<new-password>` + the salt constant found in `artifacts/api-server/src/routes/auth.ts`.
- `robots.txt`, sitemaps, and an image sitemap are served by the API for SEO.
