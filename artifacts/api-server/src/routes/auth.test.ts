import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { adminUsersTable } from "@workspace/db";
import crypto from "crypto";
import app from "../app";
import { getTestDb } from "../test/testDb";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "envod_salt_2024").digest("hex");
}

describe("admin login & session auth", () => {
  beforeEach(async () => {
    const db = getTestDb();
    await db.insert(adminUsersTable).values({
      username: "admin",
      passwordHash: hashPassword("secret"),
      role: "admin",
    });
  });

  it("rejects missing credentials with 400", async () => {
    const res = await request(app).post("/api/auth/login").send({ username: "admin" });
    expect(res.status).toBe(400);
  });

  it("rejects a wrong password with 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "admin", password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("rejects an unknown user with 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "nobody", password: "secret" });
    expect(res.status).toBe(401);
  });

  it("logs in with valid credentials and never leaks the password hash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "admin", password: "secret" });
    expect(res.status).toBe(200);
    expect(res.body.admin.username).toBe("admin");
    expect(res.body.admin.role).toBe("admin");
    expect(res.body.admin.passwordHash).toBeUndefined();
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("/me returns 401 without a session", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("/me returns the admin once logged in, and 401 after logout", async () => {
    const agent = request.agent(app);
    await agent.post("/api/auth/login").send({ username: "admin", password: "secret" });

    const me = await agent.get("/api/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.username).toBe("admin");

    const logout = await agent.post("/api/auth/logout");
    expect(logout.status).toBe(200);

    const after = await agent.get("/api/auth/me");
    expect(after.status).toBe(401);
  });
});
