import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import * as bookingController from "../controllers/booking.controller";

// ---------------------------------------------------------------------------
// booking.routes.ts
// Static segments (/stats, /kpis, /activity, /monthly) MUST come before /:id
// ---------------------------------------------------------------------------

const router = Router();

// ── Static segments first ─────────────────────────────────────────────────────
router.get("/stats",    requireAuth, bookingController.bookingStats);
router.get("/kpis",     requireAuth, bookingController.adminKpis);
router.get("/activity", requireAuth, bookingController.recentActivity);
router.get("/monthly",  requireAuth, bookingController.monthlyBookings);
router.get("/cashflow", requireAuth, bookingController.cashflow);

// ── Collection ────────────────────────────────────────────────────────────────
router.get("/", requireAuth, bookingController.listBookings);

// ── Dynamic segment ───────────────────────────────────────────────────────────
router.patch("/:id/status", requireAuth, bookingController.updateStatus);

export default router;
