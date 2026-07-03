import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { galleryItemsTable, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import app from "../app";
import { getTestDb } from "../test/testDb";

function eqTitle(title: string) {
  return eq(galleryItemsTable.title, title);
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "envod_salt_2024").digest("hex");
}

async function loginAgent() {
  const db = getTestDb();
  await db.insert(adminUsersTable).values({
    username: "admin",
    passwordHash: hashPassword("secret"),
    role: "admin",
  });
  const agent = request.agent(app);
  const res = await agent
    .post("/api/auth/login")
    .send({ username: "admin", password: "secret" });
  expect(res.status).toBe(200);
  return agent;
}

beforeEach(async () => {
  const db = getTestDb();
  await db.insert(galleryItemsTable).values([
    { objectKey: "pub-1", title: "Published One", category: "operations", isPublished: true, sortOrder: 1 },
    { objectKey: "pub-2", title: "Published Two", category: "warehouse", isPublished: true, sortOrder: 2 },
    { objectKey: "hidden-1", title: "Hidden One", category: "operations", isPublished: false, sortOrder: 3 },
  ]);
});

describe("gallery access control", () => {
  it("public list only returns published items", async () => {
    const res = await request(app).get("/api/gallery");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    for (const item of res.body) {
      expect(item.isPublished).toBe(true);
    }
    const keys = res.body.map((i: { objectKey: string }) => i.objectKey);
    expect(keys).not.toContain("hidden-1");
  });

  it("public list respects category filter and still hides unpublished", async () => {
    const res = await request(app).get("/api/gallery?category=operations");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].objectKey).toBe("pub-1");
  });

  it("admin list returns unpublished items too", async () => {
    const agent = await loginAgent();
    const res = await agent.get("/api/gallery");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    const keys = res.body.map((i: { objectKey: string }) => i.objectKey);
    expect(keys).toContain("hidden-1");
  });

  it("admin can force published-only view with ?published=true", async () => {
    const agent = await loginAgent();
    const res = await agent.get("/api/gallery?published=true");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    const keys = res.body.map((i: { objectKey: string }) => i.objectKey);
    expect(keys).not.toContain("hidden-1");
  });

  it("public GET /:id returns a published item", async () => {
    const db = getTestDb();
    const [pub] = await db
      .select()
      .from(galleryItemsTable)
      .where(eqTitle("Published One"));
    const res = await request(app).get(`/api/gallery/${pub.id}`);
    expect(res.status).toBe(200);
    expect(res.body.objectKey).toBe("pub-1");
  });

  it("public GET /:id on an unpublished item returns 404", async () => {
    const db = getTestDb();
    const [hidden] = await db
      .select()
      .from(galleryItemsTable)
      .where(eqTitle("Hidden One"));
    const res = await request(app).get(`/api/gallery/${hidden.id}`);
    expect(res.status).toBe(404);
  });

  it("admin GET /:id on an unpublished item returns 200", async () => {
    const agent = await loginAgent();
    const db = getTestDb();
    const [hidden] = await db
      .select()
      .from(galleryItemsTable)
      .where(eqTitle("Hidden One"));
    const res = await agent.get(`/api/gallery/${hidden.id}`);
    expect(res.status).toBe(200);
    expect(res.body.objectKey).toBe("hidden-1");
  });

  it("GET /:id with a non-numeric id returns 400", async () => {
    const res = await request(app).get("/api/gallery/not-a-number");
    expect(res.status).toBe(400);
  });

  it("admin-only mutations reject unauthenticated callers", async () => {
    const del = await request(app).delete("/api/gallery/1");
    expect(del.status).toBe(401);
    const patch = await request(app).patch("/api/gallery/1").send({ title: "x" });
    expect(patch.status).toBe(401);
    const reorder = await request(app).post("/api/gallery/reorder").send({ ids: [1] });
    expect(reorder.status).toBe(401);
  });
});
