// =============================================================================
// hooks/use-popular-cars.ts
// Fetches and manages popular car listing data for the home page section.
// =============================================================================

"use client";

import { useState, useEffect } from "react";
import { fetchVehicles, type Vehicle } from "@/lib/api";

interface UsePopularCarsReturn {
  cars: Vehicle[];
  loading: boolean;
  error: string | null;
}

export function usePopularCars(limit = 6): UsePopularCarsReturn {
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await fetchVehicles({ limit, page: 1 });
        if (!cancelled) setCars(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load cars");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [limit]);

  return { cars, loading, error };
}
