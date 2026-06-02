import { Router } from "express";
import { db } from "@workspace/db";
import { adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "envod_salt_2024").digest("hex");
}

router.post("/login", async (req, res): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) { res.status(400).json({ error: "Username and password required" }); return; }
    const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.username, username));
    if (!admin || admin.passwordHash !== hashPassword(password)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    (req.session as any).adminId = admin.id;
    res.json({ admin: { id: admin.id, username: admin.username, role: admin.role } });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res): void => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/me", async (req, res): Promise<void> => {
  try {
    const adminId = (req.session as any).adminId;
    if (!adminId) { res.status(401).json({ error: "Not authenticated" }); return; }
    const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminId));
    if (!admin) { res.status(401).json({ error: "Not authenticated" }); return; }
    res.json({ id: admin.id, username: admin.username, role: admin.role });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
