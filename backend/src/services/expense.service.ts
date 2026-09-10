import { eq, desc, count, sum, sql } from "drizzle-orm";
import db from "../db";
import { expenses, users } from "../db/schema";
import { AppError } from "../middleware/errorHandler.middleware";

// ---------------------------------------------------------------------------
// expense.service.ts — fleet operating cost tracking
// ---------------------------------------------------------------------------

export interface CreateExpenseInput {
  name: string;
  category: "maintenance" | "fuel" | "insurance" | "office" | "marketing" | "other";
  amount: number;
  quantity?: number;
  vehicleId?: string;
  expenseDate: string;
  notes?: string;
}

export async function getAllExpenses(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const rows = await db
    .select({
      id:          expenses.id,
      name:        expenses.name,
      category:    expenses.category,
      amount:      expenses.amount,
      quantity:    expenses.quantity,
      status:      expenses.status,
      expenseDate: expenses.expenseDate,
      notes:       expenses.notes,
      createdAt:   expenses.createdAt,
    })
    .from(expenses)
    .orderBy(desc(expenses.expenseDate))
    .limit(limit)
    .offset(offset);

  return rows;
}

export async function createExpense(userId: string, input: CreateExpenseInput) {
  const [row] = await db
    .insert(expenses)
    .values({
      name:        input.name,
      category:    input.category,
      amount:      String(input.amount),
      quantity:    input.quantity ?? 1,
      vehicleId:   input.vehicleId,
      recordedBy:  userId,
      expenseDate: input.expenseDate,
      notes:       input.notes,
    })
    .returning();
  if (!row) throw new AppError("Failed to create expense", 500);
  return row;
}

export async function getExpenseStats() {
  const rows = await db
    .select({
      category: expenses.category,
      total:    sum(expenses.amount),
    })
    .from(expenses)
    .where(eq(expenses.status, "completed"))
    .groupBy(expenses.category);

  const totalAll = rows.reduce((s, r) => s + Number(r.total ?? 0), 0);

  // This month
  const thisMonthResult = await db.execute(sql`
    SELECT coalesce(sum(amount)::numeric, 0) AS total
    FROM expenses
    WHERE date_trunc('month', expense_date::date) = date_trunc('month', now())
  `);
  const thisMonthRows = (thisMonthResult as unknown as { rows: Record<string, unknown>[] }).rows ?? thisMonthResult as unknown as Record<string, unknown>[];
  const thisMonthRow = thisMonthRows[0];

  return {
    totalExpenses: totalAll,
    thisMonth:     Number(thisMonthRow?.total ?? 0),
    byCategory:    rows.map((r) => ({ category: r.category, total: Number(r.total ?? 0) })),
  };
}
