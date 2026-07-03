import { vi, beforeEach } from "vitest";

vi.mock("@workspace/db", async () => {
  const schema = await vi.importActual<Record<string, unknown>>(
    "@workspace/db/schema",
  );
  const { getTestDb } = await import("./testDb");
  return {
    ...schema,
    get db() {
      return getTestDb();
    },
  };
});

vi.mock("../lib/whatsapp", () => ({
  sendWhatsAppNotification: vi.fn(async () => ({ success: true })),
  buildWhatsAppMessage: vi.fn(() => "test message"),
}));

beforeEach(async () => {
  const { resetTestDb } = await import("./testDb");
  await resetTestDb();
});
