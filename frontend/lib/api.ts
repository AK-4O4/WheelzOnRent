// ---------------------------------------------------------------------------
// lib/api.ts — Typed fetch helpers for the backend API.
// Base URL is read from NEXT_PUBLIC_API_URL (defaults to localhost:5000).
// ---------------------------------------------------------------------------

import type { VehicleSummary } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ── Types ─────────────────────────────────────────────────────────────────

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

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Fetch a paginated, filtered list of active vehicles.
 * Matches GET /api/vehicles query params.
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
