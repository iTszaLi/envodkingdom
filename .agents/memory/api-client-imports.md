---
name: API client import path
description: Correct workspace import alias for the generated React Query hooks and types
---

Always import from `@workspace/api-client-react`:

```ts
import { useListClients } from "@workspace/api-client-react";
import type { Client } from "@workspace/api-client-react";
```

**Why:** The generated barrel re-exports everything from `lib/api-client-react/src/index.ts`. Using `@api-client-react/generated/api` fails at Vite resolve time even though it might pass TS's path aliases.

**How to apply:** Any new component that calls a generated hook or imports a schema type must use `@workspace/api-client-react`.
