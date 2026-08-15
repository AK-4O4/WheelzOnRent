// =============================================================================
// data/placeholders/cars.placeholders.ts
// Static placeholder data for the /cars/[id] car detail page.
// TODO: Replace STATIC_REVIEWS with real reviews API.
//       Replace STATIC_EXTRAS with real extras/add-ons API.
//       INCLUDED_FEATURES should eventually come from the vehicle record.
// =============================================================================

export interface StaticReview {
  id: number;
  author: string;
  date: string;
  rating: number;
  avatar: string;
  text: string;
}

export interface Extra {
  name: string;
  price: number; // PKR per day
}

/** Placeholder reviews. Replace with real reviews API data. */
export const STATIC_REVIEWS: StaticReview[] = [
  {
    id: 1,
    author: "S. Walkinshaw",
    date: "May 16, 2025",
    rating: 5,
    avatar: "https://i.pravatar.cc/48?img=10",
    text: "Great vehicle, very clean and smooth ride!",
  },
  {
    id: 2,
    author: "Risako M",
    date: "May 11, 2024",
    rating: 4,
    avatar: "https://i.pravatar.cc/48?img=3",
    text: "Host was super friendly. Would rent again.",
  },
];

/** Placeholder add-on extras. Replace with real extras API data. */
export const STATIC_EXTRAS: Extra[] = [
  { name: "Child seat", price: 500 },
  { name: "GPS device", price: 300 },
  { name: "Additional driver", price: 200 },
];

/** Features included in every booking. Move to vehicle record eventually. */
export const INCLUDED_FEATURES = [
  "Free cancellation up to 48 hours",
  "Collision Damage Waiver",
  "Theft Protection",
  "Unlimited mileage",
  "Interiors cleaned before pick-up",
  "24/7 roadside assistance",
  "GPS navigation system",
  "Child safety seat available on request",
] as const;
