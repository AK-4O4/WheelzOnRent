// =============================================================================
// data/constants/app.constants.ts
// App-wide constants — replaces all inline process.env lookups.
// =============================================================================

/** Backend API base URL. Reads from env, falls back to localhost in dev. */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/**
 * Generates a DiceBear initials avatar URL for a given seed string.
 * Used as default avatar when no profile picture is set.
 */
export function dicebearInitials(seed: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0ea5e9`;
}

/**
 * Generates a DiceBear shapes placeholder (used for vehicle images).
 */
export function dicebearShapes(seed: string): string {
  return `https://api.dicebear.com/9.x/shapes/svg?seed=${seed}&backgroundColor=e2e8f0`;
}

/** App name */
export const APP_NAME = "Ceepii";

/** App tagline */
export const APP_TAGLINE = "Rent a car for any trip";
