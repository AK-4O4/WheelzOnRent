// ---------------------------------------------------------------------------
// lib/api.ts — Typed fetch helpers for the backend API.
// Base URL is read from NEXT_PUBLIC_API_URL (defaults to localhost:5000).
// ---------------------------------------------------------------------------

import type { VehicleSummary, VehicleDetail } from "@/types";
import { supabase } from "@/lib/supabase";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ── Types ──────────────────────────────────────────────────────────────────

/**
 * Vehicle — alias for VehicleSummary from @/types.
 * Exported for backward compat with existing imports (e.g. PopularCarRental).
 */
export type Vehicle = VehicleSummary;

export interface VehicleFilters {
  city?: string;
  transmission?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  page?: number;
  limit?: number;
}

// ── Auth helper ────────────────────────────────────────────────────────────

/**
 * Returns the current Supabase access token, or throws if the user is not
 * signed in. Use this to attach `Authorization: Bearer <token>` to requests
 * that target protected backend endpoints.
 */
export async function getAuthToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Not authenticated");
  return session.access_token;
}

/**
 * Wrapper around fetch that automatically attaches the Supabase JWT.
 * Throws on non-OK responses with the error body included in the message.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAuthToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `API error ${res.status}`;
    try {
      const body = await res.json();
      message = body.error ?? body.message ?? message;
    } catch {
      // body is not JSON — keep generic message
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ── Public helpers ─────────────────────────────────────────────────────────

/**
 * Fetch a paginated, filtered list of ACTIVE vehicles.
 * Matches GET /api/vehicles query params. No auth required.
 */
export async function fetchVehicles(
  filters: VehicleFilters = {}
): Promise<{ data: Vehicle[]; count: number }> {
  const params = new URLSearchParams();
  if (filters.city) params.set("city", filters.city);
  if (filters.transmission) params.set("transmission", filters.transmission);
  if (filters.fuelType) params.set("fuelType", filters.fuelType);
  if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.seats != null) params.set("seats", String(filters.seats));
  if (filters.page != null) params.set("page", String(filters.page));
  if (filters.limit != null) params.set("limit", String(filters.limit));

  const url = `${BASE}/api/vehicles${params.toString() ? `?${params}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch vehicles: ${res.status}`);
  return res.json();
}

/**
 * Fetch full vehicle detail including images and owner.
 * No auth required (public endpoint).
 */
export async function fetchVehicleById(id: string): Promise<{ data: VehicleDetail }> {
  const res = await fetch(`${BASE}/api/vehicles/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Vehicle not found: ${res.status}`);
  return res.json();
}

// ── Authenticated helpers ──────────────────────────────────────────────────

/**
 * Create a new vehicle listing.
 * POST /api/vehicles — requires auth.
 */
export async function createVehicle(data: {
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  transmission: "manual" | "automatic";
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
  seats: number;
  city: string;
  dailyRate: number;
}): Promise<{ data: VehicleDetail }> {
  return apiFetch("/api/vehicles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Attach an image URL to a vehicle listing.
 * POST /api/vehicles/:id/images — requires auth.
 * The file must already be uploaded to Supabase Storage.
 */
export async function addVehicleImage(
  vehicleId: string,
  imageUrl: string,
  isPrimary: boolean,
  displayOrder: number,
): Promise<void> {
  await apiFetch(`/api/vehicles/${vehicleId}/images`, {
    method: "POST",
    body: JSON.stringify({ imageUrl, isPrimary, displayOrder }),
  });
}

/**
 * Fetch all vehicles owned by the authenticated user (including under_review).
 * GET /api/vehicles/mine — requires auth.
 */
export async function fetchMyVehicles(): Promise<{ data: Vehicle[] }> {
  return apiFetch("/api/vehicles/mine");
}

// ── Admin / Dashboard helpers ──────────────────────────────────────────────

export interface AdminKpis {
  totalRevenue: number;
  newBookings: number;
  rentedUnits: number;
  available: number;
  bookingStats: Record<string, number>;
}

export interface BookingRow {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
  pickupAddress: string | null;
  createdAt: string;
  renterName: string;
  renterEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  plateNumber: string;
}

export interface ActivityItem {
  who: string;
  avatar: string;
  what: string;
  time: string;
}

export interface MonthlyPoint {
  month: string;
  month_num: number;
  year: number;
  count: number;
}

export interface ExpenseRow {
  id: string;
  name: string;
  category: string;
  amount: string;
  quantity: number;
  status: string;
  expenseDate: string;
  notes: string | null;
  createdAt: string;
}

export interface ReminderRow {
  id: string;
  title: string;
  scheduledAt: string;
  icon: string;
  isDone: boolean;
}

/** GET /api/bookings/kpis */
export async function fetchAdminKpis(): Promise<{ data: AdminKpis }> {
  return apiFetch("/api/bookings/kpis");
}

/** GET /api/bookings?status=&search=&page= */
export async function fetchBookings(params: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ data: BookingRow[]; count: number }> {
  const q = new URLSearchParams();
  if (params.status) q.set("status", params.status);
  if (params.search) q.set("search", params.search);
  if (params.page)   q.set("page",   String(params.page));
  if (params.limit)  q.set("limit",  String(params.limit));
  return apiFetch(`/api/bookings${q.toString() ? `?${q}` : ""}`);
}

/** GET /api/bookings/stats */
export async function fetchBookingStats(): Promise<{ data: Record<string, number> }> {
  return apiFetch("/api/bookings/stats");
}

/** GET /api/bookings/activity */
export async function fetchActivity(): Promise<{ data: ActivityItem[] }> {
  return apiFetch("/api/bookings/activity");
}

/** GET /api/bookings/monthly */
export async function fetchMonthlyBookings(): Promise<{ data: MonthlyPoint[] }> {
  return apiFetch("/api/bookings/monthly");
}

/** PATCH /api/bookings/:id/status */
export async function updateBookingStatus(id: string, status: string): Promise<void> {
  await apiFetch(`/api/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/** GET /api/admin/expenses */
export async function fetchExpenses(page = 1): Promise<{ data: ExpenseRow[]; count: number }> {
  return apiFetch(`/api/admin/expenses?page=${page}`);
}

/** GET /api/admin/expenses/stats */
export async function fetchExpenseStats(): Promise<{ data: { totalExpenses: number; thisMonth: number; byCategory: { category: string; total: number }[] } }> {
  return apiFetch("/api/admin/expenses/stats");
}

/** POST /api/admin/expenses */
export async function createExpense(data: {
  name: string;
  category: string;
  amount: number;
  quantity?: number;
  expenseDate: string;
  notes?: string;
}): Promise<{ data: ExpenseRow }> {
  return apiFetch("/api/admin/expenses", { method: "POST", body: JSON.stringify(data) });
}

/** GET /api/admin/reminders */
export async function fetchReminders(): Promise<{ data: ReminderRow[] }> {
  return apiFetch("/api/admin/reminders");
}

/** POST /api/admin/reminders */
export async function createReminder(data: {
  title: string;
  scheduledAt: string;
  icon?: string;
}): Promise<{ data: ReminderRow }> {
  return apiFetch("/api/admin/reminders", { method: "POST", body: JSON.stringify(data) });
}

/** PATCH /api/admin/reminders/:id/done */
export async function markReminderDone(id: string): Promise<void> {
  await apiFetch(`/api/admin/reminders/${id}/done`, { method: "PATCH" });
}

/** GET /api/vehicles — all vehicles (admin uses this for fleet view) */
export async function fetchAllVehiclesAdmin(): Promise<{ data: VehicleSummary[]; count: number }> {
  return apiFetch("/api/vehicles?limit=100");
}

// ── Chart stat helpers ─────────────────────────────────────────────────────

export interface VehicleTypeStat {
  type: string;
  count: number;
  pct: number;
}

export interface CashflowPoint {
  month: string;
  income: number;
  expense: number;
}

/** GET /api/vehicles/stats — vehicle type distribution (public) */
export async function fetchVehicleTypeStats(): Promise<{ data: VehicleTypeStat[] }> {
  const res = await fetch(`${BASE}/api/vehicles/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch vehicle stats");
  return res.json();
}

/** GET /api/bookings/cashflow — monthly income vs expenses */
export async function fetchCashflow(): Promise<{ data: CashflowPoint[] }> {
  return apiFetch("/api/bookings/cashflow");
}
