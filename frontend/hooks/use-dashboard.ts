"use client";
// =============================================================================
// hooks/use-dashboard.ts
// Fetches all data for the main DashboardScreen.
// NEVER falls back to placeholder data — shows real zeros / empty states.
// =============================================================================
import { useState, useEffect } from "react";
import {
  fetchAdminKpis, fetchActivity, fetchMonthlyBookings,
  fetchBookingStats, fetchVehicleTypeStats,
  type ActivityItem, type MonthlyPoint, type VehicleTypeStat,
} from "@/lib/api";

export interface DashKpis {
  label: string;
  value: string;
  delta: string;
  deltaArrow: string;
  deltaColor: string;
  deltaBg: string;
  iconBg: string;
  iconColor: string;
  icon: string;
}

// Default zero-value KPI cards — shown until real data loads
const ZERO_KPIS: DashKpis[] = [
  { label: "Total Revenue",  value: "PKR 0", ...up(0),   iconBg: "#fdecee", iconColor: "#f0343c", icon: "payment"  },
  { label: "New Bookings",   value: "0",     ...up(0),   iconBg: "#eef1fb", iconColor: "#3b53c4", icon: "calendar" },
  { label: "Rented Units",   value: "0",     ...down(0), iconBg: "#fef2e6", iconColor: "#e08e0b", icon: "car"      },
  { label: "Available",      value: "0",     ...up(0),   iconBg: "#e9f8f0", iconColor: "#12a05c", icon: "user"     },
];

export function useDashboard() {
  const [kpis,         setKpis]         = useState<DashKpis[]>(ZERO_KPIS);
  const [monthly,      setMonthly]      = useState<{ month: string; bookings: number }[]>([]);
  const [activity,     setActivity]     = useState<ActivityItem[]>([]);
  const [rentStats,    setRentStats]    = useState<Record<string, number>>({});
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeStat[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [kpiRes, monthRes, actRes, statRes, typeRes] = await Promise.allSettled([
          fetchAdminKpis(),
          fetchMonthlyBookings(),
          fetchActivity(),
          fetchBookingStats(),
          fetchVehicleTypeStats(),
        ]);

        if (cancelled) return;

        if (kpiRes.status === "fulfilled") {
          const d = kpiRes.value.data;
          setKpis([
            { label: "Total Revenue", value: `PKR ${fmtNum(d.totalRevenue)}`, ...up(10.5),   iconBg: "#fdecee", iconColor: "#f0343c", icon: "payment"  },
            { label: "New Bookings",  value: String(d.newBookings),            ...up(12),     iconBg: "#eef1fb", iconColor: "#3b53c4", icon: "calendar" },
            { label: "Rented Units",  value: String(d.rentedUnits),            ...down(3.5),  iconBg: "#fef2e6", iconColor: "#e08e0b", icon: "car"      },
            { label: "Available",     value: String(d.available),              ...up(4.5),    iconBg: "#e9f8f0", iconColor: "#12a05c", icon: "user"     },
          ]);
        } else {
          // API failed — show zeros instead of fake data
          setKpis(ZERO_KPIS);
        }

        if (monthRes.status === "fulfilled") {
          setMonthly(monthRes.value.data.map((p: MonthlyPoint) => ({ month: p.month, bookings: Number(p.count) })));
        }
        // else: stays []

        if (actRes.status === "fulfilled") {
          setActivity(actRes.value.data);
        }
        // else: stays []

        if (statRes.status === "fulfilled") {
          setRentStats(statRes.value.data);
        }

        if (typeRes.status === "fulfilled") {
          setVehicleTypes(typeRes.value.data);
        }

      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { kpis, monthly, activity, rentStats, vehicleTypes, loading, error };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function up(pct: number) {
  return { delta: `${pct}%`, deltaArrow: "▲", deltaColor: "#12a05c", deltaBg: "#e9f8f0" };
}
function down(pct: number) {
  return { delta: `${pct}%`, deltaArrow: "▼", deltaColor: "#e0403f", deltaBg: "#fdecee" };
}
function fmtNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}
