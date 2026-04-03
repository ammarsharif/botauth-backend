import { Request, Response, NextFunction } from "express";

export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers["x-api-key"];
  if (!process.env.API_KEY || key === process.env.API_KEY) {
    next();
    return;
  }
  res.status(401).json({ error: "Unauthorized" });
}
