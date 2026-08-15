// =============================================================================
// hooks/use-cars-filter.ts
// Fetches all vehicles and manages the filter/sort state for /cars page.
// =============================================================================

"use client";

import { useState, useEffect } from "react";
import type { VehicleSummary as Vehicle } from "@/types";
import { API_BASE } from "@/data/constants/app.constants";
import {
  FUEL_LABELS, TRANS_LABELS,
  FUEL_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
  DEFAULT_MAX_PRICE,
} from "@/data/constants/vehicles.constants";

export function useCarsFilter() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fuel, setFuel] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/vehicles`);
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        setVehicles(json.data ?? []);
      } catch (e) {
        console.error(e);
        setError("Could not load vehicles. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = vehicles
    .filter((c) => {
      const fuelLabel = FUEL_LABELS[c.fuelType] ?? c.fuelType;
      const transLabel = TRANS_LABELS[c.transmission] ?? c.transmission;
      return (
        (fuel === "All" || fuelLabel === fuel) &&
        (transmission === "All" || transLabel === transmission) &&
        parseFloat(c.dailyRate) <= maxPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") return parseFloat(a.dailyRate) - parseFloat(b.dailyRate);
      if (sortBy === "price_desc") return parseFloat(b.dailyRate) - parseFloat(a.dailyRate);
      return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    });

  function clearFilters() {
    setFuel("All");
    setTransmission("All");
    setMaxPrice(DEFAULT_MAX_PRICE);
  }

  return {
    // Data
    vehicles, loading, error,
    // Filters
    fuel, setFuel,
    transmission, setTransmission,
    maxPrice, setMaxPrice,
    sortBy, setSortBy,
    // Derived
    filtered,
    fuelOptions: [...FUEL_FILTER_OPTIONS] as string[],
    transmissionOptions: [...TRANSMISSION_FILTER_OPTIONS] as string[],
    // Actions
    clearFilters,
  };
}
