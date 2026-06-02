---
name: ENVOD KINGDOM Setup
description: Architecture decisions, sharp edges, and conventions for the ENVOD KINGDOM logistics platform
---

## Auth
- SHA256 password hashing with literal salt string `"envod_salt_2024"` — NOT bcrypt
- Session stored via express-session; `adminId` written to `req.session`
- Default admin: username `admin`, password `Envod@2024!`

## DB quirks
- `weight` column is `numeric()` in Drizzle — PostgreSQL returns it as a string. Zod infers it as `number`. Always coerce: `String(parsed.data.weight)` before inserting/updating shipments.
- `pieces` column is `integer()` — no coercion needed.
- Lib rebuild required (`pnpm run typecheck:libs`) before API server typecheck when DB schema changes.

## Bilingual / RTL
- Language toggled via `LanguageContext` — sets `document.documentElement.dir` to `"rtl"` for Arabic
- Google Font imports in `index.css` must be the absolute first lines (before `@import "tailwindcss"`)

## Hook patterns
- When using a query hook with `enabled`, always also pass `queryKey`: `{ query: { enabled: !!id, queryKey: getXQueryKey(id) } }`
- Mutation pattern: `mutation.mutate({ data: { ... } })`
- After mutation: `queryClient.invalidateQueries({ queryKey: getListXQueryKey() })`

## Route return types
- All Express route handlers must be typed `async (req, res): Promise<void> =>` to avoid TS7030 "not all code paths return a value" errors
- Early exits: use `{ res.status(N).json(...); return; }` not `return res.status(N).json(...)`

**Why:** Express 5 types `res.json()` return as `void`; mixing `return res.json()` with fall-through paths confuses TypeScript's control flow analysis.
