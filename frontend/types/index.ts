// =============================================================================
// types/index.ts
// Central barrel for all shared TypeScript interfaces & types.
// Import from here instead of defining types inline in page/component files.
// =============================================================================

// ── Vehicle / API ─────────────────────────────────────────────────────────────

export interface VehicleImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface VehicleOwner {
  id: string;
  fullName: string;
  profilePictureUrl: string | null;
  createdAt: string;
}

/** Full vehicle detail (used on /cars/[id] page) */
export interface VehicleDetail {
  id: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
  fuelType: string;
  seats: number;
  city: string;
  dailyRate: string;
  status: string;
  plateNumber: string;
  createdAt: string;
  ownerId: string;
  images: VehicleImage[];
  owner: VehicleOwner | null;
}

/** Lightweight vehicle summary (used in listing cards) */
export interface VehicleSummary {
  id: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
  fuelType: string;
  seats: number;
  city: string;
  dailyRate: string;
  status: string;
  createdAt?: string;
  ownerId?: string;
  primaryImage: string | null;
}

// ── User / Auth ───────────────────────────────────────────────────────────────

/** User data shown in the Navbar (compact) */
export interface NavUser {
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

/** Full user profile (used on /account page) */
export interface UserProfile {
  id: string;
  fullName: string | null;
  email: string | null;
  profilePictureUrl: string | null;
  phoneNumber: string | null;
}

// ── Account ───────────────────────────────────────────────────────────────────

/** A listing owned by the current user */
export interface MyListing {
  id: string;
  make: string;
  model: string;
  year: number;
  city: string;
  dailyRate: string;
  status: string;
  primaryImage: string | null;
}

// ── Car Cards / Sections ──────────────────────────────────────────────────────

export interface CarCardProps {
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  badges?: string[];
  isCompact?: boolean;
}

export interface SectionProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  children: React.ReactNode;
  scrollable?: boolean;
}

// ── Auth Modal ────────────────────────────────────────────────────────────────

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export type Screen =
  | 'dashboard'
  | 'bookings'
  | 'units'
  | 'unitDetail'
  | 'calendar'
  | 'clients'
  | 'drivers'
  | 'payments'
  | 'expenses'
  | 'tracking'
  | 'messages'

// ── List Car Form ─────────────────────────────────────────────────────────────

export interface ListCarFormData {
  // Step 1 — Car details
  make: string;
  model: string;
  year: string;
  plateNumber: string;
  transmission: string;
  fuelType: string;
  seats: string;
  // Step 2 — Location & pricing
  city: string;
  address: string;
  dailyRate: string;
  minDays: string;
  // Step 3 — Photos & docs
  photos: File[];
  registration: File | null;
  insurance: File | null;
  // Step 4 — Rules & availability
  rules: string;
  noSmoking: boolean;
  noPets: boolean;
  instantBook: boolean;
}

// ── Account ───────────────────────────────────────────────────────────────────

export type AccountTabId = 'profile' | 'rentals' | 'listings' | 'settings';

export interface AccountTab {
  id: AccountTabId;
  label: string;
}

