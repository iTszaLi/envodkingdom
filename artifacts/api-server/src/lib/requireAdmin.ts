import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const adminId = (req.session as { adminId?: number } | undefined)?.adminId;
  if (!adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  next();
}
