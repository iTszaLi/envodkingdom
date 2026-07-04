---
name: Hand-maintained test DB schema
description: The api-server vitest suite builds its Postgres schema from hand-written SQL, not from the drizzle schema — column additions must be mirrored there.
---

# api-server test DB schema is hand-written, not derived from drizzle

`artifacts/api-server/src/test/testDb.ts` spins up an in-memory PGlite Postgres by
executing a hardcoded `CREATE_SQL` string (one `CREATE TABLE` per table). It does
**not** run drizzle-kit push or derive DDL from `lib/db/src/schema/*`.

**Why:** the tests need a fast, dependency-free schema; the SQL is kept in sync by hand.

**How to apply:** whenever you add/rename/drop a column on any `lib/db` table, you must
also edit the matching `CREATE TABLE` in `testDb.ts`, or tests fail at insert time with
`column "<name>" does not exist` (error code 42703) — not at typecheck. Real dev/prod DBs
need `pnpm --filter @workspace/db run push` separately; the two are independent.

## Related: api-server dev workflow builds once (no watch)

The `artifacts/api-server: API Server` dev workflow runs `pnpm run build && pnpm run start`
(esbuild bundle → node), so it does **not** hot-reload on source changes. After editing
`lib/db` schema (or any bundled lib), the running API keeps the stale bundle and silently
omits new columns from `db.select()` DTOs until you restart that workflow. Symptom: the new
field is present in the DB and generated types but missing from live API JSON.
