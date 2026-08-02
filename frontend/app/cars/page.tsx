"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
  fuelType: string;
  seats: number;
  city: string;
  dailyRate: string;
  primaryImage: string | null;
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const FUEL_LABELS: Record<string, string> = {
  gasoline: "Gasoline",
  diesel:   "Diesel",
  electric: "Electric",
  hybrid:   "Hybrid",
};

const TRANS_LABELS: Record<string, string> = {
  manual:    "Manual",
  automatic: "Automatic",
};

const CATEGORIES = ["All", "Gasoline", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["All", "Automatic", "Manual"];

function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
      }`}
    >
      {children}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-1/4" />
      </div>
    </div>
  );
}

function CarCard({ car }: { car: Vehicle }) {
  const name = `${car.year} ${car.make} ${car.model}`;
  const fuelLabel  = FUEL_LABELS[car.fuelType]  ?? car.fuelType;
  const transLabel = TRANS_LABELS[car.transmission] ?? car.transmission;
  const price = parseFloat(car.dailyRate);
  const placeholder = `https://api.dicebear.com/9.x/shapes/svg?seed=${car.id}&backgroundColor=e2e8f0`;

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={car.primaryImage ?? placeholder}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-slate-700 border border-slate-200 backdrop-blur-sm">
          {fuelLabel}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors">
            {name}
          </h3>
        </div>

        <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {car.city}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">{transLabel}</span>
          <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">{car.seats} seats</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sky-600 font-bold text-lg">PKR {price.toLocaleString()}</span>
            <span className="text-slate-400 text-xs ml-1">/day</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CarsPage() {
  const [vehicles, setVehicles]       = useState<Vehicle[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const [fuel,         setFuel]         = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [maxPrice,     setMaxPrice]     = useState(100_000);
  const [sortBy,       setSortBy]       = useState("newest");

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/vehicles`);
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        setVehicles(json.data ?? []);
      } catch (e) {
        console.error(e);
        setError("Could not load vehicles. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const filtered = vehicles
    .filter((c) => {
      const fuelLabel = FUEL_LABELS[c.fuelType] ?? c.fuelType;
      const transLabel = TRANS_LABELS[c.transmission] ?? c.transmission;
      return (
        (fuel === "All" || fuelLabel === fuel) &&
        (transmission === "All" || transLabel === transmission) &&
        parseFloat(c.dailyRate) <= maxPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "price_asc")  return parseFloat(a.dailyRate) - parseFloat(b.dailyRate);
      if (sortBy === "price_desc") return parseFloat(b.dailyRate) - parseFloat(a.dailyRate);
      return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    });

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Editorial header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://picsum.photos/seed/car-fleet-aerial-city/1920/600"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.05) saturate(0.85)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(2,30,60,0.88) 0%, rgba(2,50,90,0.65) 60%, rgba(14,165,233,0.20) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Cars</span>
          </nav>
          <h1
            className="text-white font-normal leading-tight"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Browse available cars
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            {loading ? "Loading..." : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} available`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filter panel */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <p className="font-semibold text-slate-900">Filters</p>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Fuel type</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((f) => (
                    <PillBtn key={f} active={fuel === f} onClick={() => setFuel(f)}>{f}</PillBtn>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Transmission</p>
                <div className="flex flex-wrap gap-2">
                  {TRANSMISSIONS.map((t) => (
                    <PillBtn key={t} active={transmission === t} onClick={() => setTransmission(t)}>{t}</PillBtn>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Max price / day</p>
                  <span className="text-sm font-bold text-slate-900">PKR {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100_000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-sky-600"
                  aria-label="Maximum price per day"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>PKR 1,000</span>
                  <span>PKR 100,000</span>
                </div>
              </div>

              <button
                onClick={() => { setFuel("All"); setTransmission("All"); setMaxPrice(100_000); }}
                className="w-full text-sm text-sky-600 font-medium hover:text-sky-700 transition-colors text-left"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-slate-500 text-sm hidden sm:block">
                {loading ? "Loading vehicles…" : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} found`}
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <label htmlFor="cars-sort" className="text-sm text-slate-500 whitespace-nowrap">Sort by</label>
                <select
                  id="cars-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: low to high</option>
                  <option value="price_desc">Price: high to low</option>
                </select>
              </div>
            </div>

            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm mb-6">
                {error}
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
                <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base font-medium">
                  {vehicles.length === 0 ? "No vehicles listed yet." : "No vehicles match these filters."}
                </p>
                {vehicles.length > 0 && (
                  <button
                    onClick={() => { setFuel("All"); setTransmission("All"); setMaxPrice(100_000); }}
                    className="text-sky-600 text-sm font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
