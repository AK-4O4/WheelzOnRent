"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

// ─── Static data (replace with API fetch later) ───────────────────────────
const CAR = {
  id: 1,
  name: "Nissan Rogue",
  address: "8953 Golf Course Terrace",
  category: "Economy",
  rating: 5,
  reviewCount: 126,
  originalPrice: 109,
  price: 89,
  seats: 5,
  transmission: "Automatic",
  ac: true,
  fuel: "Electric",
  mileage: 321,
  suitcases: 2,
  images: [
    "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl",
    "https://lh3.googleusercontent.com/aida/AP1WRLsXA57uRtxI6sAO7usCfMw1FkBttVIovdvtd49_VYJHq1oozEFTqLxzsXEG27Xj-A39rt7564mcujNkTSMHf5rZi2RJxa53z8BVc-0h08fRZIugXMl9GQoxIYNsHyzZJX4k1EpMikHnHaiHy4cCnUnDE_bG68oRKdZFKolZ7X6DOzxs0bOO1TD_CDJbl0aNF8R4GvLlYHpdfDnQHvrns0FWlm2Y4UQfLg_vvrq5s_OzHvH9dUIpwZcwFV8",
    "https://lh3.googleusercontent.com/aida/AP1WRLuVokeoWVVYiqP0zjQP7SzdFdxq45V2XM7q6Nq6zeSW7TikYgoRkO2BdLbGLY4tMO4PI0-A8ePstZZhTDap88UXOJ_9btZLO_qH164Z9y0vhmUhAhTp96dxW6hngwSfpxiZvkT4DCmEcGgi6RIx6zFN0uU-x_g9Z9WjtnGn-YqZ-NYnhpKNSqvFr2gn1DQ1qIqmQw7yp1TTOJzKXRjgniZLkOEErffw9PyoR0YeIioI727i_ngGOmhCgfuW",
    "https://lh3.googleusercontent.com/aida/AP1WRLtU7WwqDZ7QoZY00BfQvmDtawSKmGOlSi1r8FBQZt4O2sF5K9p7uWTCBL7ldkGDGC2NXsfD0vcZbFIuTL8YqBvVCUMBLCm7l69PL_gGY2I2lbA3DYLtx5Qxbh4N0wyrw-VbPH7CzlOveaMPOvxGifSN4NukzBPgikFI9umSRNfF58GF0RyQkhYobzr-vILy4QKXPJwRAZHGd_oM5zcvCFc-RgSXzR5iobyYBSscL7fl7wX9Eyu2Wz6JfTY",
  ],
  host: {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 4.9,
    reviewCount: 150,
    listings: 3,
    badge: "Superhost",
    experience: "2+ years",
    joined: "January 2023",
    languages: "English and Thai",
    responseTime: "within an hour",
    bio: "Experienced car owner with a passion for sharing my vehicles with others.",
  },
  includedFeatures: [
    "Free cancellation up to 48 hours",
    "Collision Damage Waiver with $214 deductible",
    "Theft Protection with $19,999 excess",
    "Unlimited mileage",
    "Car interiors and exteriors cleaned with disinfectant before pick-up",
    "Masks are required at the pick-up location",
    "24/7 roadside assistance",
    "Free Wi-Fi in the car",
    "GPS navigation system included",
    "Child safety seat available upon request",
  ],
  pickupLocation: "Haneda Airport store",
  dropoffLocation: "Haneda Airport store",
  pickupTime: "Tue, Mar 24, 12:00pm",
  dropoffTime: "Tue, Mar 31, 12:00pm",
  importantInfo: [
    {
      title: "Policy on driver's age",
      desc: "The minimum age to drive this car is 25. Please ensure the driver meets this requirement before booking.",
      icon: "user",
    },
    {
      title: "ID type",
      desc: "Bring your Valid passport or ID card.",
      icon: "id",
    },
    {
      title: "Driving licence",
      desc: "During pick-up, all drivers must provide any one of the license combinations listed below. If not, the booking will be canceled without a refund.",
      icon: "licence",
    },
    {
      title: "Deposit payment",
      desc: "A deposit of $1,000 is required at pick-up. This will be refunded within 5-10 business days after the car is returned undamaged.",
      icon: "deposit",
    },
    {
      title: "Vouchers",
      desc: "Bring your booking voucher (printed or digital) and a valid photo ID.",
      icon: "voucher",
    },
  ],
  rentalPolicies: [
    { label: "Cancellation policy", value: "You will not be charged anything for the rental since the booking was risk-free." },
    { label: "Age surcharge", value: "Drivers under 25 will be charged an additional $15.00 per day." },
    { label: "Deposit after exchange rate", value: "US$1,000.00 → CA$1,331.93" },
    { label: "Fee", value: "$4.79 USD" },
    { label: "Net", value: "$1,955.00" },
  ],
  extras: [
    { name: "Child seat", price: 21 },
    { name: "GPS", price: 10 },
    { name: "Additional driver", price: 10 },
  ],
  days: 3,
  reviews: [
    { id: 1, author: "S. Walkinshaw", date: "May 16, 2025", rating: 5, avatar: "https://i.pravatar.cc/48?img=10", text: "Lovely hostess, very friendly! I would definitely stay here again." },
    { id: 2, author: "Risako M", date: "May 11, 2021", rating: 3, avatar: "https://i.pravatar.cc/48?img=3", text: "Excellent place. The host is super friendly, the room is clean and quiet." },
    { id: 3, author: "Eden Birch", date: "Aug 22, 2022", rating: 5, avatar: "https://i.pravatar.cc/48?img=7", text: "Very nice and friendly lady. Be pleasant to talk with her. The room looks better than in the pictures." },
  ],
  location: "San Diego, CA, United States of America (SAN-San Diego Intl.)",
};

// ─── Sub-components ───────────────────────────────────────────────────────

function Stars({ count, max = 5, size = "sm" }: { count: number; max?: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : "w-3.5 h-3.5";
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} className={`${sz} ${i < count ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function InfoIcon({ type }: { type: string }) {
  const cls = "w-5 h-5 text-slate-400 shrink-0";
  if (type === "user") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
  if (type === "id") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M8 14h8M8 10h0" />
    </svg>
  );
  if (type === "licence") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
  if (type === "deposit") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

function Counter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors text-lg leading-none"
        aria-label="Decrease"
      >
        <span className="-mt-0.5">−</span>
      </button>
      <span className="w-4 text-center text-sm font-medium text-slate-800">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors text-lg leading-none"
        aria-label="Increase"
      >
        <span className="-mt-0.5">+</span>
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function CarDetailPage() {
  const car = CAR;
  const [isFav, setIsFav] = useState(false);
  const [extraCounts, setExtraCounts] = useState(car.extras.map(() => 0));
  const [reviewText, setReviewText] = useState("");
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const extrasTotal = car.extras.reduce((sum, e, i) => sum + e.price * extraCounts[i] * car.days, 0);
  const baseTotal = car.price * car.days;
  const total = baseTotal + extrasTotal;

  const visibleFeatures = showAllFeatures ? car.includedFeatures : car.includedFeatures.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-slate-900">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-24">

        {/* ── Gallery ── */}
        <div className="flex gap-3 mb-8 h-[420px]">
          {/* Main large image */}
          <div className="relative flex-[2] rounded-2xl overflow-hidden">
            <img
              src={car.images[0]}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <button
              className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-white transition-colors shadow-sm"
              aria-label="Show all photos"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
              </svg>
              Show all photos
            </button>
          </div>

          {/* 3 stacked thumbnails */}
          <div className="flex flex-col gap-3 flex-1">
            {car.images.slice(1, 4).map((img, i) => (
              <div key={i} className="flex-1 rounded-2xl overflow-hidden">
                <img src={img} alt={`${car.name} view ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-0">

            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{car.name}</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{car.address}</span>
                  <span className="text-slate-300">·</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium">{car.category}</span>
                  <span className="text-slate-300">·</span>
                  <Stars count={car.rating} />
                  <span className="font-medium text-slate-700">{car.rating} ({car.reviewCount})</span>
                </div>
              </div>
              {/* Action icons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsFav(!isFav)}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
                  aria-label="Save to favorites"
                >
                  <svg className={`w-4 h-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : "fill-transparent text-slate-500"}`} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
                  aria-label="Share"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Host row */}
            <div className="flex items-center gap-3 py-5 border-b border-slate-200">
              <div className="relative shrink-0">
                <img src={car.host.avatar} alt={car.host.name} className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Hosted by {car.host.name}</p>
                <p className="text-xs text-sky-600">{car.host.badge} · {car.host.experience} hosting</p>
              </div>
            </div>

            {/* Spec icons row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-5 py-6 border-b border-slate-200">
              {[
                { label: `${car.seats} seats`, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                )},
                { label: car.transmission, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" /></svg>
                )},
                { label: "A/C", icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 9l9-6 9 6M3 15l9 6 9-6" /></svg>
                )},
                { label: car.fuel, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ), accent: "text-sky-600" },
                { label: `${car.mileage} mi`, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                )},
                { label: `${car.suitcases} suitcases`, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
                )},
              ].map(({ label, icon, accent }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className={`${accent ?? "text-slate-500"}`}>{icon}</span>
                  <span className={`text-xs font-medium ${accent ?? "text-slate-600"}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* ── Included in the price ── */}
            <div className="py-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">Included in the price</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <svg className="w-4.5 h-4.5 mt-0.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-sky-700 leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              {car.includedFeatures.length > 6 && (
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="mt-4 text-sm font-semibold text-slate-800 underline underline-offset-2 hover:text-slate-600 transition-colors"
                >
                  {showAllFeatures ? "Show less" : `Show all ${car.includedFeatures.length} features`}
                </button>
              )}
            </div>

            {/* ── Pick up and drop off ── */}
            <div className="py-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">Pick up and drop off</h2>
              <div className="relative pl-4">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-4 bottom-4 w-px bg-slate-200" aria-hidden="true" />
                {/* Pickup */}
                <div className="flex flex-col gap-1 mb-6 relative">
                  <div className="absolute -left-4 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white" />
                  <p className="text-sm text-sky-600 font-medium">{car.pickupTime}</p>
                  <p className="text-base font-semibold text-slate-800">{car.pickupLocation}</p>
                </div>
                {/* Dropoff */}
                <div className="flex flex-col gap-1 relative">
                  <div className="absolute -left-4 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white" />
                  <p className="text-sm text-sky-600 font-medium">{car.dropoffTime}</p>
                  <p className="text-base font-semibold text-slate-800">{car.dropoffLocation}</p>
                </div>
              </div>
            </div>

            {/* ── Important info ── */}
            <div className="py-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">Important info</h2>
              <div className="space-y-5">
                {car.importantInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <InfoIcon type={info.icon} />
                    <div>
                      <p className="text-sm font-semibold text-sky-700 mb-0.5">{info.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{info.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Rental policies ── */}
            <div className="py-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">Rental policies</h2>
              <table className="w-full text-sm">
                <tbody>
                  {car.rentalPolicies.map(({ label, value }, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-none">
                      <td className="py-3 pr-6 text-slate-400 font-medium w-52 align-top">{label}</td>
                      <td className="py-3 text-slate-800 leading-relaxed">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Host + Reviews (two-column) ── */}
            <div className="py-8 flex flex-col md:flex-row gap-8">
              {/* Host card */}
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={car.host.avatar} alt={car.host.name} className="w-14 h-14 rounded-full object-cover" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{car.host.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Stars count={Math.round(car.host.rating)} />
                        <span className="text-xs text-slate-500">{car.host.rating} ({car.host.reviewCount})</span>
                      </div>
                      <p className="text-xs text-slate-400">{car.host.listings} listings</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {car.host.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                      {car.host.experience}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">{car.host.bio}</p>

                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      Joined in {car.host.joined}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                      Speaks {car.host.languages}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      Responds {car.host.responseTime}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="flex gap-2">
                    <button className="flex-1 text-sm font-medium border border-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      See host profile
                    </button>
                    <button className="flex items-center gap-1.5 text-sm font-medium border border-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>

                  <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                    Report this host
                  </button>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Reviews ({car.reviewCount} reviews)</h2>
                <Stars count={car.rating} size="lg" />

                {/* Write a review */}
                <div className="flex items-center gap-3 mt-5 mb-6">
                  <input
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts ..."
                    className="flex-1 bg-white border border-slate-200 rounded-full px-5 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    aria-label="Write a review"
                  />
                  <button
                    className="w-11 h-11 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-all shrink-0"
                    aria-label="Submit review"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                {/* Review list */}
                <div className="space-y-6">
                  {car.reviews.map((r) => (
                    <div key={r.id} className="flex gap-3">
                      <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-slate-800">{r.author}</p>
                          <span className="text-slate-300 text-xs">·</span>
                          <p className="text-xs text-slate-400">{r.date}</p>
                        </div>
                        <Stars count={r.rating} />
                        <p className="text-sm text-slate-500 leading-relaxed mt-1.5">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-slate-50 transition-colors">
                  Show all {car.reviewCount} reviews
                </button>
              </div>
            </div>

            {/* ── Location ── */}
            <div className="py-6 border-t border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">Location</h2>
              <p className="text-sm text-slate-500 mb-5">{car.location}</p>
              {/* Map placeholder — replace with real map embed */}
              <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 border border-slate-200 relative">
                <img
                  src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-117.1611,32.7157,11,0/900x400?access_token=pk.placeholder"
                  alt="Map"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback static map look
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100">
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{car.location}</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Sticky Booking Card ── */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-6">

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-2xl text-slate-400 line-through font-medium">${car.originalPrice}</span>
                <span className="text-3xl font-bold text-slate-900">${car.price}</span>
                <span className="text-slate-400 text-sm">/ day</span>
              </div>

              {/* Date range */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-5">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Jul 17 - Jul 20</p>
                  <p className="text-xs text-slate-400">Pick-up / Drop-off</p>
                </div>
              </div>

              {/* Extras */}
              <div className="space-y-4 mb-5">
                {car.extras.map((extra, i) => (
                  <div key={extra.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{extra.name}</p>
                      <p className="text-xs text-slate-400">${extra.price}.00 / day</p>
                    </div>
                    <Counter
                      value={extraCounts[i]}
                      onChange={(v) => {
                        const next = [...extraCounts];
                        next[i] = v;
                        setExtraCounts(next);
                      }}
                    />
                  </div>
                ))}
              </div>

              <hr className="border-slate-100 mb-4" />

              {/* Total */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-slate-700">Total</span>
                <span className="text-base font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>

              {/* Reserve button */}
              <button
                id="detail-reserve-btn"
                className="w-full bg-slate-900 hover:bg-slate-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition-all text-sm"
              >
                Reserve
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">You won&apos;t be charged yet</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
