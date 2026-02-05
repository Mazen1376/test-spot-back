import { Router } from "express";
import { getStats } from "../controllers/statsController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

export const statsRoutes = Router();

statsRoutes.get("/stats", requireAuth, requireAdmin, getStats);
