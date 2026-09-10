"use client";
// =============================================================================
// hooks/use-expenses-screen.ts
// Drives the ExpensesScreen: live expense list + stats + add expense form
// =============================================================================
import { useState, useEffect, useCallback } from "react";
import {
  fetchExpenses, fetchExpenseStats, createExpense,
  type ExpenseRow,
} from "@/lib/api";
import { transactions as PLACEHOLDER_TX, expenseStats as PLACEHOLDER_STATS }
  from "@/data/placeholders/dashboard.placeholders";

export function useExpensesScreen() {
  const [rows,    setRows]    = useState<ExpenseRow[]>([]);
  const [stats,   setStats]   = useState<{ totalExpenses: number; thisMonth: number; byCategory: { category: string; total: number }[] } | null>(null);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  // Add expense modal state
  const [showAdd,    setShowAdd]    = useState(false);
  const [adding,     setAdding]     = useState(false);
  const [addError,   setAddError]   = useState<string | null>(null);
  const [newExpense, setNewExpense] = useState({
    name: "", category: "maintenance", amount: "", quantity: "1",
    expenseDate: new Date().toISOString().split("T")[0], notes: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [rowsRes, statsRes] = await Promise.allSettled([
        fetchExpenses(page),
        fetchExpenseStats(),
      ]);
      if (rowsRes.status  === "fulfilled") setRows(rowsRes.value.data);
      if (statsRes.status === "fulfilled") setStats(statsRes.value.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load expenses");
      setRows(PLACEHOLDER_TX as unknown as ExpenseRow[]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  async function submitExpense() {
    setAdding(true);
    setAddError(null);
    try {
      await createExpense({
        name:        newExpense.name,
        category:    newExpense.category,
        amount:      Number(newExpense.amount),
        quantity:    Number(newExpense.quantity) || 1,
        expenseDate: newExpense.expenseDate,
        notes:       newExpense.notes || undefined,
      });
      setShowAdd(false);
      setNewExpense({ name: "", category: "maintenance", amount: "", quantity: "1", expenseDate: new Date().toISOString().split("T")[0], notes: "" });
      await load();
    } catch (e) {
      setAddError(e instanceof Error ? e.message : "Failed to add expense");
    } finally {
      setAdding(false);
    }
  }

  return {
    rows, stats, loading, error, page, setPage,
    showAdd, setShowAdd,
    adding, addError,
    newExpense, setNewExpense,
    submitExpense,
  };
}
