// =============================================================================
// assets/svg/index.tsx
// Central barrel of all named SVG icon components used across the app.
// Keeps component files clean and makes icons reusable and searchable.
//
// Usage:
//   import { LocationPinIcon, HeartIcon } from "@/assets/svg";
// =============================================================================

import type { SVGProps } from "react";

/** Base props for all SVG icons */
type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  size?: number;
};

function icon(
  displayName: string,
  paths: (props: IconProps) => React.ReactNode,
  defaultViewBox = "0 0 24 24",
  defaultStrokeWidth: number | string = 2
) {
  const Comp = ({ className, size, width, height, strokeWidth, ...rest }: IconProps) => (
    <svg
      className={className}
      width={size ?? width ?? 24}
      height={size ?? height ?? 24}
      viewBox={defaultViewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? defaultStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {paths({ className, size, width, height, strokeWidth, ...rest })}
    </svg>
  );
  Comp.displayName = displayName;
  return Comp;
}

// ── Navigation / UI ───────────────────────────────────────────────────────────

export const ChevronDownIcon = icon("ChevronDownIcon", () => (
  <path d="M19 9l-7 7-7-7" />
));

export const ChevronUpIcon = icon("ChevronUpIcon", () => (
  <path d="M5 15l7-7 7 7" />
));

export const CloseIcon = icon("CloseIcon", () => (
  <path d="M18 6L6 18M6 6l12 12" />
));

export const SearchIcon = icon("SearchIcon", () => (
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </>
));

export const ArrowRightIcon = icon("ArrowRightIcon", () => (
  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
));

export const MenuIcon = icon("MenuIcon", () => (
  <path d="M3 12h18M3 6h18M3 18h18" />
));

export const GridIcon = icon("GridIcon", () => (
  <path d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5" />
));

export const HomeIcon = icon("HomeIcon", () => (
  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
));

export const FilterIcon = icon("FilterIcon", () => (
  <path d="M3 4h18M7 12h10M11 20h2" />
));

export const GlobeIcon = icon("GlobeIcon", () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M2.5 12h19M12 2.5a15 15 0 010 19M12 2.5a15 15 0 000 19" />
  </>
));

// ── Locations / Map ───────────────────────────────────────────────────────────

export const LocationPinIcon = icon("LocationPinIcon", () => (
  <>
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </>
));

export const MapPinIcon = icon("MapPinIcon", () => (
  <>
    <path d="M12 21s-7-6.3-7-11a7 7 0 1114 0c0 4.7-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
));

export const MapPinSolidIcon = icon("MapPinSolidIcon", () => (
  <path
    fillRule="evenodd"
    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
    clipRule="evenodd"
    fill="currentColor"
    stroke="none"
  />
), "0 0 20 20");

// ── Calendar / Time ───────────────────────────────────────────────────────────

export const CalendarIcon = icon("CalendarIcon", () => (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
));

export const ClockIcon = icon("ClockIcon", () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
));

// ── User / Auth ───────────────────────────────────────────────────────────────

export const UserCircleIcon = icon("UserCircleIcon", () => (
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0116 0" />
  </>
));

export const UsersIcon = icon("UsersIcon", () => (
  <>
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 00-3-3.87" />
  </>
));

export const EyeOpenIcon = icon("EyeOpenIcon", () => (
  <>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </>
));

export const EyeOffIcon = icon("EyeOffIcon", () => (
  <>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </>
));

export const PencilIcon = icon("PencilIcon", () => (
  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
));

export const LogOutIcon = icon("LogOutIcon", () => (
  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
));

// ── Vehicle ───────────────────────────────────────────────────────────────────

export const CarIcon = icon("CarIcon", () => (
  <>
    <path d="M5 17h14M5 17a2 2 0 01-2-2v-3l2-5a2 2 0 012-1.5h10a2 2 0 012 1.5l2 5v3a2 2 0 01-2 2" />
    <circle cx="7.5" cy="14.5" r="1" />
    <circle cx="16.5" cy="14.5" r="1" />
  </>
), "0 0 24 24", 1.9);

export const CarDetailIcon = icon("CarDetailIcon", () => (
  <>
    <path d="M5 17h14M5 17a2 2 0 01-2-2v-3l2-5a2 2 0 012-1.5h10a2 2 0 012 1.5l2 5v3a2 2 0 01-2 2M7 17v2M17 17v2" />
    <circle cx="7.5" cy="14.5" r="1" />
    <circle cx="16.5" cy="14.5" r="1" />
  </>
));

export const LicensePlateIcon = icon("LicensePlateIcon", () => (
  <>
    <rect x="2" y="7" width="20" height="10" rx="2" />
    <path d="M7 12h10" />
  </>
));

export const TruckIcon = icon("TruckIcon", () => (
  <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
));

// ── Actions ───────────────────────────────────────────────────────────────────

export const HeartIcon = icon("HeartIcon", () => (
  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
));

export const ShareIcon = icon("ShareIcon", () => (
  <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
));

export const PlusIcon = icon("PlusIcon", () => (
  <path d="M12 4v16m8-8H4" />
));

export const CheckCircleIcon = icon("CheckCircleIcon", () => (
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
));

export const SadFaceIcon = icon("SadFaceIcon", () => (
  <>
    <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </>
), "0 0 24 24", 1.5);

export const GridPhotosIcon = icon("GridPhotosIcon", () => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </>
));

// ── Payment / Finance ─────────────────────────────────────────────────────────

export const CreditCardIcon = icon("CreditCardIcon", () => (
  <>
    <rect x="2" y="6" width="20" height="13" rx="2" />
    <path d="M2 10h20M7 15h3" />
  </>
));

export const DollarIcon = icon("DollarIcon", () => (
  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
));

// ── Communication ─────────────────────────────────────────────────────────────

export const ChatIcon = icon("ChatIcon", () => (
  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
));

export const BellIcon = icon("BellIcon", () => (
  <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
));

// ── Security / Trust ──────────────────────────────────────────────────────────

export const ShieldIcon = icon("ShieldIcon", () => (
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </>
));

// ── System / Misc ─────────────────────────────────────────────────────────────

export const WrenchIcon = icon("WrenchIcon", () => (
  <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
));

export const LightningIcon = icon("LightningIcon", () => (
  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
));

export const StarIcon = icon("StarIcon", () => (
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
), "0 0 20 20");

export const TransmissionIcon = icon("TransmissionIcon", () => (
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
  </>
));

export const PhoneIcon = icon("PhoneIcon", () => (
  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
));

/** Google logo — used in OAuth buttons */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={20} height={20}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
