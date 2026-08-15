// =============================================================================
// data/placeholders/home.placeholders.ts
// Placeholder data for homepage sections.
// TODO: DESTINATIONS vehicle counts should come from the API.
//       QUOTES should come from a real reviews/testimonials API.
//       HOW_IT_WORKS_STEPS images should use production CDN images.
// =============================================================================

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  stat: string;
  statLabel: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Booked a car for a Lahore trip in under 5 minutes. The Honda Civic was spotless and the host was super responsive. No hidden charges whatsoever.",
    author: "Hamza Raza",
    role: "Renter, Islamabad",
    avatar: "https://i.pravatar.cc/80?img=3",
    stat: "4.9",
    statLabel: "average rating",
  },
  {
    id: 2,
    quote:
      "My Corolla was sitting idle for weeks. Listed it on Ceepii and earned PKR 45,000 in the first month alone. Payouts hit my account on time.",
    author: "Ayesha Malik",
    role: "Host, Karachi",
    avatar: "https://i.pravatar.cc/80?img=5",
    stat: "PKR 45K",
    statLabel: "earned in one month",
  },
  {
    id: 3,
    quote:
      "I've used other platforms but Ceepii is the only one where the photos match the actual car. Great experience from pick-up to drop-off.",
    author: "Bilal Ahmed",
    role: "Renter, Lahore",
    avatar: "https://i.pravatar.cc/80?img=8",
    stat: "50k+",
    statLabel: "verified reviews",
  },
];

// ── Destinations ──────────────────────────────────────────────────────────────

export interface Destination {
  city: string;
  country: string;
  count: string; // TODO: Replace with real API count
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    city: "Karachi",
    country: "Pakistan",
    count: "2,400+",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  },
  {
    city: "Lahore",
    country: "Pakistan",
    count: "1,870+",
    image:
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=1200&q=80",
  },
  {
    city: "Islamabad",
    country: "Pakistan",
    count: "980+",
    image:
      "https://images.unsplash.com/photo-1567416661576-659d50397f04?w=1200&q=80",
  },
];

// ── How It Works ──────────────────────────────────────────────────────────────

export interface HowItWorksStep {
  title: string;
  body: string;
  image: string; // TODO: replace with production CDN image
  filter: string;
  bg: string;
  accent: string;
  dark?: boolean;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    title: "Book your car",
    body: "Browse hundreds of verified vehicles and reserve in under two minutes.",
    image: "https://picsum.photos/seed/booking-calendar-car/800/500",
    filter: "contrast(1.05) saturate(0.85)",
    bg: "bg-sky-50",
    accent: "text-sky-600",
  },
  {
    title: "Smart checklist",
    body: "A pre-trip checklist lands in your inbox so nothing gets missed on collection day.",
    image: "https://picsum.photos/seed/checklist-road-plan/600/400",
    filter: "grayscale(0.2) contrast(1.1)",
    bg: "bg-slate-900",
    accent: "text-sky-400",
    dark: true,
  },
  {
    title: "Save with Ceepii",
    body: "No hidden fees. Price you see is the price you pay, including insurance.",
    image: "https://picsum.photos/seed/save-money-car-keys/600/400",
    filter: "contrast(1.05) saturate(0.9)",
    bg: "bg-slate-50",
    accent: "text-slate-700",
  },
  {
    title: "Drive, enjoy, return",
    body: "Pick up, explore freely, drop off at any supported location. Easy.",
    image: "https://picsum.photos/seed/road-trip-sunset-highway/800/500",
    filter: "contrast(1.1) saturate(0.8) brightness(0.95)",
    bg: "bg-sky-600",
    accent: "text-white",
    dark: true,
  },
];

// ── Trust Stats (Testimonials section) ───────────────────────────────────────

export interface TrustStat {
  val: string;
  label: string;
}

export const TRUST_STATS: TrustStat[] = [
  { val: "PKR 2B+", label: "earned by hosts, all-time" },
  { val: "500K+", label: "trips completed" },
  { val: "4.8", label: "average renter rating" },
];
