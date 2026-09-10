"use client";
// =============================================================================
// hooks/use-bookings-screen.ts
// Drives the BookingsScreen: live list + stats + search + status filter + pagination
// =============================================================================
import { useState, useEffect, useCallback } from "react";
import {
  fetchBookings, fetchBookingStats, updateBookingStatus,
  type BookingRow,
} from "@/lib/api";
import { bookingRows as PLACEHOLDER_ROWS, bookingStats as PLACEHOLDER_STATS }
  from "@/data/placeholders/dashboard.placeholders";

const PAGE_SIZE = 10;

export function useBookingsScreen() {
  const [rows,      setRows]      = useState<BookingRow[]>([]);
  const [stats,     setStats]     = useState<Record<string, number>>({ pending: 0, confirmed: 0, ongoing: 0, completed: 0, cancelled: 0 });
  const [search,    setSearch]    = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page,      setPage]      = useState(1);
  const [total,     setTotal]     = useState(0);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [rowsRes, statsRes] = await Promise.allSettled([
        fetchBookings({ status: statusFilter || undefined, search: search || undefined, page, limit: PAGE_SIZE }),
        fetchBookingStats(),
      ]);

      if (rowsRes.status === "fulfilled") {
        setRows(rowsRes.value.data);
        setTotal(rowsRes.value.count);
      }
      if (statsRes.status === "fulfilled") {
        setStats(statsRes.value.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load bookings");
      // keep placeholder data on error
      setRows(PLACEHOLDER_ROWS as unknown as BookingRow[]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => { load(); }, [load]);

  async function changeStatus(id: string, status: string) {
    try {
      await updateBookingStatus(id, status);
      await load();
    } catch (e) {
      console.error(e);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    rows, stats, loading, error,
    search, setSearch,
    statusFilter, setStatusFilter,
    page, setPage, totalPages,
    changeStatus, reload: load,
  };
}
