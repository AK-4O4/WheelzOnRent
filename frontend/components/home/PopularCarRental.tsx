"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchVehicles, type Vehicle } from "@/lib/api";

// Fallback image when a vehicle has no primaryImage
const fallbackImage = (id: string) =>
  `https://picsum.photos/seed/${id}/600/400`;

// Skeleton card shown while loading
function SkeletonCard() {
  return (
    <div className="min-w-[300px] bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-2/3" />
        <div className="h-4 bg-slate-100 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-3/4 mt-4" />
        <div className="h-6 bg-slate-200 rounded w-1/3 mt-6" />
      </div>
    </div>
  );
}

// Single vehicle card
function VehicleCard({ car }: { car: Vehicle }) {
  const name = `${car.make} ${car.model}`;
  const price = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(car.dailyRate));

  const specs = [
    `${car.seats} seats`,
    car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1),
    car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1),
  ];

  return (
    <Link
      href={`/cars/${car.id}`}
      className="min-w-[300px] bg-white rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={car.primaryImage ?? fallbackImage(car.id)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage(car.id);
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {car.year}
        </div>
        <button
          className="absolute top-4 right-4 text-white/80 hover:text-red-500 transition-colors"
          aria-label="Save to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        </div>
        <p className="text-slate-400 text-sm mb-4 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2a8 8 0 00-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 00-8-8z" />
          </svg>
          {car.city}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 border-t border-slate-50 pt-4">
          {specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-bold text-sky-700">
            {price}{" "}
            <span className="text-slate-400 text-sm font-normal">/ day</span>
          </p>
          <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Book now
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PopularCarRentals() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchVehicles({ limit: 6 })
      .then(({ data }) => setVehicles(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-slate-50/30" data-purpose="popular-car-rentals">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="text-4xl"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Popular cars{" "}
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                in Pakistan
              </span>
            </h2>
          </div>
          <Link
            href="/cars"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors underline underline-offset-4"
          >
            View all cars
          </Link>
        </div>

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium mb-2">Couldn't load vehicles</p>
            <p className="text-sm">Make sure the backend server is running at {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}</p>
          </div>
        )}

        {/* Empty state */}
        {!error && !loading && vehicles.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <p className="text-lg font-medium mb-2">No vehicles listed yet</p>
            <Link href="/account?tab=listings" className="text-sm text-sky-600 hover:underline">
              Be the first to list your car →
            </Link>
          </div>
        )}

        {/* Cards row */}
        {(loading || vehicles.length > 0) && (
          <div className="flex overflow-x-auto gap-6 pb-6 custom-scroll">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : vehicles.map((car) => <VehicleCard key={car.id} car={car} />)}
          </div>
        )}
      </div>
    </section>
  );
}
