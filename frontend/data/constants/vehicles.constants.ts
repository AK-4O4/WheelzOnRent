// =============================================================================
// data/constants/vehicles.constants.ts
// Vehicle-related label maps, filter arrays, and form constants.
// Previously duplicated across app/cars/page.tsx and app/cars/[id]/page.tsx.
// =============================================================================

/** Human-readable labels for fuel type values from the API */
export const FUEL_LABELS: Record<string, string> = {
  gasoline: "Gasoline",
  diesel: "Diesel",
  electric: "Electric",
  hybrid: "Hybrid",
};

/** Human-readable labels for transmission values from the API */
export const TRANS_LABELS: Record<string, string> = {
  manual: "Manual",
  automatic: "Automatic",
};

/** Fuel type filter options for the car listing page */
export const FUEL_FILTER_OPTIONS = ["All", "Gasoline", "Diesel", "Electric", "Hybrid"] as const;

/** Transmission filter options for the car listing page */
export const TRANSMISSION_FILTER_OPTIONS = ["All", "Automatic", "Manual"] as const;

/** Default max price filter value (PKR) */
export const DEFAULT_MAX_PRICE = 100_000;

/** Minimum price filter value (PKR) */
export const MIN_PRICE = 1_000;

/** Price filter step (PKR) */
export const PRICE_STEP = 1_000;

// ── List-car form constants ───────────────────────────────────────────────────

/** Cities available for car listing location selection */
export const PAKISTAN_CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar",
  "Multan", "Faisalabad", "Quetta", "Sialkot", "Gujranwala",
] as const;

/** Car make options for the list-car form */
export const CAR_MAKES = [
  "Toyota", "Honda", "Suzuki", "Hyundai", "KIA",
  "Daihatsu", "Mitsubishi", "Nissan", "Mercedes", "BMW",
] as const;

/** Seat count options for the list-car form */
export const SEAT_OPTIONS = [2, 4, 5, 6, 7, 8] as const;

/** Steps for the multi-step list-car form */
export const LIST_CAR_STEPS = [
  { id: 1, label: "Car details", icon: "🚗" },
  { id: 2, label: "Location & price", icon: "📍" },
  { id: 3, label: "Photos & docs", icon: "📸" },
  { id: 4, label: "Rules", icon: "📋" },
] as const;

/** Account navigation tabs */
export const ACCOUNT_TABS = [
  { id: "profile",   label: "Profile" },
  { id: "rentals",   label: "My Rentals" },
  { id: "listings",  label: "My Listings" },
  { id: "settings",  label: "Settings" },
] as const;

