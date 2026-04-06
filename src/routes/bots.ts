import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { InstarConfig } from "../models/InstarConfig";
import { FelixConfig } from "../models/FelixConfig";
import { XavierConfig } from "../models/XavierConfig";
import { CindyConfig } from "../models/CindyConfig";
import { requireApiKey } from "../middleware/auth";

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyModel = mongoose.Model<any>;

const MODEL_MAP: Record<string, AnyModel> = {
  instar_config: InstarConfig as AnyModel,
  felix_config: FelixConfig as AnyModel,
  xavier_config: XavierConfig as AnyModel,
  cindy_config: CindyConfig as AnyModel
};

const TYPE_MAP: Record<string, string> = {
  instar_config: "ig_session",
  felix_config: "fb_session",
  xavier_config: "tw_session",
  cindy_config: "li_session"
};

// PATCH /api/bots/:collection/update-session
router.patch(
  "/:collection/update-session",
  requireApiKey,
  async (req: Request, res: Response): Promise<void> => {
    const { collection } = req.params;
    const Model = MODEL_MAP[collection];

    if (!Model) {
      res.status(404).json({ error: `Unknown collection: ${collection}` });
      return;
    }

    const { cookies, fetchedAt, status, passcode } = req.body as {
      cookies: Record<string, string | null>;
      fetchedAt?: string;
      status?: string;
      passcode?: string;
    };

    if (!cookies || typeof cookies !== "object") {
      res.status(400).json({ error: "Missing or invalid 'cookies' field in request body" });
      return;
    }

    try {
      // Strip null values — only persist cookies that were actually found
      const cookieFields: Record<string, string> = {};
      for (const [k, v] of Object.entries(cookies)) {
        if (v !== null && v !== undefined && v !== "") {
          cookieFields[k] = v;
        }
      }

      const rawCookies = Object.entries(cookieFields)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ");

      const newDoc: Record<string, unknown> = {
        type: TYPE_MAP[collection],
        ...cookieFields,
        rawCookies,
        savedAt: fetchedAt ? new Date(fetchedAt) : new Date(),
        status: status ?? "active",
        passcode: passcode ?? "1122"
      };

      // Delete all existing sessions then insert the fresh one
      await Model.deleteMany({});
      const result = await Model.create(newDoc);

      res.json({
        success: true,
        message: `Session replaced for ${collection}`,
        id: result._id
      });
    } catch (err) {
      console.error("[BotAuth] DB update failed:", err);
      res.status(500).json({ error: "Database update failed" });
    }
  }
);

export default router;
