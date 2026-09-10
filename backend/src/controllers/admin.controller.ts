import type { Request, Response, NextFunction } from "express";
import * as expenseService from "../services/expense.service";
import * as reminderService from "../services/reminder.service";

// ---------------------------------------------------------------------------
// admin.controller.ts — expense + reminder HTTP plumbing
// ---------------------------------------------------------------------------

type IdParam = { id: string };

/** GET /api/admin/expenses */
export async function listExpenses(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query;
    const rows = await expenseService.getAllExpenses(
      page  ? Number(page)  : 1,
      limit ? Number(limit) : 20,
    );
    return res.json({ data: rows, count: rows.length });
  } catch (err) { next(err); }
}

/** POST /api/admin/expenses */
export async function createExpense(req: Request, res: Response, next: NextFunction) {
  try {
    const expense = await expenseService.createExpense(req.user!.id, req.body);
    return res.status(201).json({ data: expense });
  } catch (err) { next(err); }
}

/** GET /api/admin/expenses/stats */
export async function expenseStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await expenseService.getExpenseStats();
    return res.json({ data: stats });
  } catch (err) { next(err); }
}

/** GET /api/admin/reminders */
export async function listReminders(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await reminderService.getReminders();
    return res.json({ data: rows });
  } catch (err) { next(err); }
}

/** POST /api/admin/reminders */
export async function createReminder(req: Request, res: Response, next: NextFunction) {
  try {
    const reminder = await reminderService.createReminder(req.user!.id, req.body);
    return res.status(201).json({ data: reminder });
  } catch (err) { next(err); }
}

/** PATCH /api/admin/reminders/:id/done */
export async function doneReminder(req: Request<IdParam>, res: Response, next: NextFunction) {
  try {
    const reminder = await reminderService.markReminderDone(req.params.id);
    return res.json({ data: reminder });
  } catch (err) { next(err); }
}
