// =============================================================================
// hooks/use-hero-search.ts
// Manages the car search form state for the Hero section.
// =============================================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type DateRange } from "react-day-picker";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

export function useHeroSearch() {
  const router = useRouter();
  const [dropMode, setDropMode] = useState<"different" | "same">("different");
  const [pickupCity, setPickupCity] = useState("");
  const [dropoffCity, setDropoffCity] = useState("");

  const today = new Date();
  const defaultFrom = new Date(today);
  defaultFrom.setDate(today.getDate() + 3);
  const defaultTo = new Date(today);
  defaultTo.setDate(today.getDate() + 6);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: defaultFrom,
    to: defaultTo,
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setCalendarOpen(false);
      }
    }
    if (calendarOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [calendarOpen]);

  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${formatDate(dateRange.from)} – ${formatDate(dateRange.to)}`
      : formatDate(dateRange.from)
    : "Pick dates";

  function handleSearch() {
    const params = new URLSearchParams();
    const city = pickupCity.trim();
    if (city) params.set("city", city);
    if (dateRange?.from)
      params.set("from", dateRange.from.toISOString().slice(0, 10));
    if (dateRange?.to)
      params.set("to", dateRange.to.toISOString().slice(0, 10));
    router.push(`/cars${params.toString() ? `?${params}` : ""}`);
  }

  return {
    // State
    dropMode, setDropMode,
    pickupCity, setPickupCity,
    dropoffCity, setDropoffCity,
    dateRange, setDateRange,
    calendarOpen, setCalendarOpen,
    calendarRef,
    // Derived
    dateLabel,
    // Actions
    handleSearch,
  };
}
