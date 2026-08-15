// =============================================================================
// data/placeholders/become-host.placeholders.ts
// Placeholder content for the /become-host page.
// TODO: Earnings estimates should eventually pull from real aggregate API data.
// =============================================================================

import type { ReactNode } from "react";

// ── Perks ─────────────────────────────────────────────────────────────────────

export interface HostPerk {
  iconName: string; // references an icon in assets/svg/index.tsx
  title: string;
  desc: string;
  bg: string;
  color: string;
}

export const HOST_PERKS: HostPerk[] = [
  {
    iconName: "MoneyCircleIcon",
    title: "Earn in PKR",
    desc: "Get paid directly to your bank account. Hosts in Karachi earn up to PKR 60,000 per month.",
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    iconName: "ShieldCheckIcon",
    title: "Full insurance coverage",
    desc: "Every trip is covered with comprehensive insurance so you rent with total peace of mind.",
    bg: "bg-sky-50",
    color: "text-sky-600",
  },
  {
    iconName: "UsersVerifiedIcon",
    title: "Verified renters only",
    desc: "Every renter is CNIC-verified and licence-checked before they can book your car.",
    bg: "bg-violet-50",
    color: "text-violet-600",
  },
  {
    iconName: "SupportIcon",
    title: "24/7 support",
    desc: "Our team is available around the clock to help you with any issue during a trip.",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
];

// ── Steps ─────────────────────────────────────────────────────────────────────

export interface HostStep {
  step: string;
  title: string;
  desc: string;
}

export const HOST_STEPS: HostStep[] = [
  {
    step: "01",
    title: "List your car",
    desc: "Add photos, set your availability, and choose your daily rate. Takes under 10 minutes.",
  },
  {
    step: "02",
    title: "We review your listing",
    desc: "Our team verifies your car's documents. Most listings are approved within 24 hours.",
  },
  {
    step: "03",
    title: "Accept booking requests",
    desc: "Renters send requests. You review their profile and confirm or decline.",
  },
  {
    step: "04",
    title: "Get paid",
    desc: "Money hits your bank account after each completed trip. No chasing, no delays.",
  },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────

export interface HostFaqItem {
  q: string;
  a: string;
}

export const HOST_FAQS: HostFaqItem[] = [
  {
    q: "Do I need to be present during the handover?",
    a: "Yes, we recommend meeting the renter in person to hand over the keys and do a quick vehicle check. This protects both parties.",
  },
  {
    q: "What if the renter damages my car?",
    a: "All trips include damage protection. If damage occurs, file a claim through the app and our team handles it — including contacting insurance if needed.",
  },
  {
    q: "Can I block dates when I need my car?",
    a: "Absolutely. Your availability calendar is fully in your control. Block any dates and renters won't be able to request those periods.",
  },
  {
    q: "Is there a minimum rental period?",
    a: "The minimum is 1 day. You set your own rules — some hosts prefer 3-day minimum bookings to reduce turnover.",
  },
];

// ── Earnings estimates (static) ───────────────────────────────────────────────

export interface EarningsRow {
  city: string;
  rate: string;
  monthly: string;
}

export const EARNINGS_BY_CITY: EarningsRow[] = [
  { city: "Karachi", rate: "PKR 4,500/day", monthly: "PKR 45,000" },
  { city: "Lahore", rate: "PKR 5,000/day", monthly: "PKR 50,000" },
  { city: "Islamabad", rate: "PKR 4,000/day", monthly: "PKR 40,000" },
];
