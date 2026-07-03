# ENVOD KINGDOM SHIPPING SERVICES LLC

Enterprise-grade bilingual (English/Arabic, LTR/RTL) logistics platform for ENVOD KINGDOM SHIPPING SERVICES LLC, featuring a cinematic marketing site, shipment tracking portal, knowledge center, and admin CMS.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/envod-kingdom run dev` — run the frontend (Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL`, `SESSION_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, framer-motion, wouter, TanStack Query
- API: Express 5 + express-session
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/envod-kingdom/` — React + Vite frontend
- `artifacts/api-server/` — Express API server
- `lib/db/src/schema/` — Drizzle ORM schema (11 tables)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API)
- `lib/api-client-react/src/generated/` — Generated React Query hooks
- `lib/api-zod/src/generated/` — Generated Zod validation schemas

## Architecture decisions

- Contract-first API: OpenAPI spec drives codegen for hooks and Zod schemas; never hand-write these
- Session auth via express-session with SHA256 password hashing (salt: `envod_salt_2024`)
- Bilingual support via React context (`LanguageContext`) that toggles `dir="rtl"` on `document.documentElement`
- All server logs use `req.log` / `logger` (pino) — never `console.log`
- `numeric` DB columns for `weight` must be coerced with `String()` before insert (Drizzle types `numeric` as string)

## Product

- Cinematic homepage with hero, animated stats, 14 services grid, testimonials, client logo wall, blog preview
- Shipment tracking portal (track by tracking number, reference, or invoice)
- Knowledge center / blog with category filtering
- Contact page with quote inquiry form
- Admin CMS: dashboard, shipments, services, testimonials, FAQs, articles, clients, inquiries, settings
- Bilingual: full EN/AR toggle with RTL layout mirroring

## Admin credentials

- URL: `/admin`
- Username: `admin`
- Password: `Envod@2024!`

## Test data

- Tracking number: `ENVOD-2024-001` (delivered, 9-step timeline)
- Tracking number: `ENVOD-2024-002` (in transit)
- Tracking number: `ENVOD-2024-003` (customs clearance)

## Brand

- Primary: `#0A2342` (deep navy)
- Secondary: `#D62828` (Saudi red)
- Logo: `attached_assets/image_1780437854819.png` (import via `@assets/` alias)
- Phone / WhatsApp: +966 50 226 0256
- Fax: +966 11 238 0517
- P.O. Box: 2383
- Address: Prince Mansour Bin Abdulaziz Street, Al Malaz District, Riyadh 12831

## Gotchas

- Google Font imports in `index.css` must be the VERY FIRST lines before `@import "tailwindcss"`
- When using query hooks with `enabled`, always pass `queryKey` too: `{ query: { enabled: !!id, queryKey: getXQueryKey(id) } }`
- `pnpm run typecheck:libs` must be run before `pnpm --filter @workspace/api-server run typecheck` if DB schema changed
- Never run `pnpm dev` at workspace root — use workflow restarts instead

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
