---
name: drizzle-orm peer variants across the workspace
description: Why adding an optional drizzle driver (like PGlite) to one package breaks typecheck in others, and how to fix it
---

# drizzle-orm peer variants

`drizzle-orm` declares its DB drivers (`pg`, `@electric-sql/pglite`, `mysql2`, `better-sqlite3`, …) as **optional peer dependencies**. pnpm builds a *separate physical copy* of `drizzle-orm` for each unique set of those optional peers present in a dependent's subtree (the `.pnpm/drizzle-orm@<ver>_<peers-hash>` folders).

If two workspace packages resolve **different** drizzle-orm variants and their types meet (e.g. one imports tables/types from `@workspace/db` and calls `eq()`/`and()` from its own drizzle-orm), typecheck fails with cryptic errors like:

> Types have separate declarations of a private property 'shouldInlineParams'.
> Property 'config' is protected but type 'Column<…>' is not a class derived from 'Column<…>'.

**Why:** the two `drizzle-orm` copies are structurally identical but nominally distinct, so protected/private members don't line up.

**How to apply:** keep every package that (a) depends on `drizzle-orm` directly **and** (b) shares drizzle types with `@workspace/db` on the *same* variant. Concretely, when you add an optional driver peer (PGlite for in-memory tests), install that same peer in **all** such packages so they share one variant. In this repo the drizzle-orm dependents are `lib/db`, `artifacts/api-server`, and `scripts` — all three now carry `@electric-sql/pglite` as a devDependency for this reason.

Diagnose with:
```
for p in lib/db artifacts/api-server scripts; do echo -n "$p: "; readlink -f $p/node_modules/drizzle-orm | sed 's#.*/.pnpm/##;s#/node_modules.*##'; done
```
All lines must print the identical variant hash.

Note: PGlite is only imported by test code, so it is **not** bundled into the production esbuild output (the only "pglite" strings in the bundle are esbuild path comments containing the `.pnpm` dir name).
