import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import * as adminController from "../controllers/admin.controller";

// ---------------------------------------------------------------------------
// admin.routes.ts — expense tracking + reminders
// ---------------------------------------------------------------------------

const router = Router();

// ── Expenses ──────────────────────────────────────────────────────────────────
router.get("/expenses/stats", requireAuth, adminController.expenseStats);
router.get("/expenses",       requireAuth, adminController.listExpenses);
router.post("/expenses",      requireAuth, adminController.createExpense);

// ── Reminders ─────────────────────────────────────────────────────────────────
router.get("/reminders",          requireAuth, adminController.listReminders);
router.post("/reminders",         requireAuth, adminController.createReminder);
router.patch("/reminders/:id/done", requireAuth, adminController.doneReminder);

export default router;
