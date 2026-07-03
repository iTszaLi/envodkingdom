import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
    setupFiles: ["./src/test/setup.ts"],
    env: {
      NODE_ENV: "test",
      SESSION_SECRET: "test_secret",
      DATABASE_URL: "postgres://test:test@localhost:5432/test",
    },
  },
});
