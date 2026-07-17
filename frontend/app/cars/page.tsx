"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const ALL_CARS = [
  { id: 1, name: "Nissan Rogue", location: "Los Angeles, CA", price: 89, rating: 5.0, reviews: 124, badge: "Guest favourite", category: "SUV", seats: 5, transmission: "Automatic", fuel: "Gasoline", image: "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl" },
  { id: 2, name: "Vauxhall Corsa", location: "San Francisco, CA", price: 62, rating: 4.6, reviews: 217, badge: "Popular", category: "Sedan", seats: 5, transmission: "Manual", fuel: "Electric", image: "https://lh3.googleusercontent.com/aida/AP1WRLsXA57uRtxI6sAO7usCfMw1FkBttVIovdvtd49_VYJHq1oozEFTqLxzsXEG27Xj-A39rt7564mcujNkTSMHf5rZi2RJxa53z8BVc-0h08fRZIugXMl9GQoxIYNsHyzZJX4k1EpMikHnHaiHy4cCnUnDE_bG68oRKdZFKolZ7X6DOzxs0bOO1TD_CDJbl0aNF8R4GvLlYHpdfDnQHvrns0FWlm2Y4UQfLg_vvrq5s_OzHvH9dUIpwZcwFV8" },
  { id: 3, name: "Nissan Micra", location: "Miami, FL", price: 55, rating: 4.8, reviews: 534, badge: "New", category: "Hatchback", seats: 5, transmission: "Automatic", fuel: "Electric", image: "https://lh3.googleusercontent.com/aida/AP1WRLuVokeoWVVYiqP0zjQP7SzdFdxq45V2XM7q6Nq6zeSW7TikYgoRkO2BdLbGLY4tMO4PI0-A8ePstZZhTDap88UXOJ_9btZLO_qH164Z9y0vhmUhAhTp96dxW6hngwSfpxiZvkT4DCmEcGgi6RIx6zFN0uU-x_g9Z9WjtnGn-YqZ-NYnhpKNSqvFr2gn1DQ1qIqmQw7yp1TTOJzKXRjgniZLkOEErffw9PyoR0YeIioI727i_ngGOmhCgfuW" },
  { id: 4, name: "Hyundai i30", location: "New York, NY", price: 74, rating: 4.1, reviews: 527, badge: "Guest favourite", category: "Sedan", seats: 5, transmission: "Automatic", fuel: "Hybrid", image: "https://lh3.googleusercontent.com/aida/AP1WRLtU7WwqDZ7QoZY00BfQvmDtawSKmGOlSi1r8FBQZt4O2sF5K9p7uWTCBL7ldkGDGC2NXsfD0vcZbFIuTL8YqBvVCUMBLCm7l69PL_gGY2I2lbA3DYLtx5Qxbh4N0wyrw-VbPH7CzlOveaMPOvxGifSN4NukzBPgikFI9umSRNfF58GF0RyQkhYobzr-vILy4QKXPJwRAZHGd_oM5zcvCFc-RgSXzR5iobyYBSscL7fl7wX9Eyu2Wz6JfTY" },
  { id: 5, name: "Toyota Camry", location: "Chicago, IL", price: 78, rating: 4.9, reviews: 312, badge: "Top Rated", category: "Sedan", seats: 5, transmission: "Automatic", fuel: "Hybrid", image: "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl" },
  { id: 6, name: "BMW X5", location: "Austin, TX", price: 145, rating: 4.7, reviews: 89, badge: "Luxury", category: "SUV", seats: 7, transmission: "Automatic", fuel: "Gasoline", image: "https://lh3.googleusercontent.com/aida/AP1WRLsXA57uRtxI6sAO7usCfMw1FkBttVIovdvtd49_VYJHq1oozEFTqLxzsXEG27Xj-A39rt7564mcujNkTSMHf5rZi2RJxa53z8BVc-0h08fRZIugXMl9GQoxIYNsHyzZJX4k1EpMikHnHaiHy4cCnUnDE_bG68oRKdZFKolZ7X6DOzxs0bOO1TD_CDJbl0aNF8R4GvLlYHpdfDnQHvrns0FWlm2Y4UQfLg_vvrq5s_OzHvH9dUIpwZcwFV8" },
  { id: 7, name: "Tesla Model 3", location: "Seattle, WA", price: 112, rating: 4.9, reviews: 445, badge: "EV", category: "Sedan", seats: 5, transmission: "Automatic", fuel: "Electric", image: "https://lh3.googleusercontent.com/aida/AP1WRLuVokeoWVVYiqP0zjQP7SzdFdxq45V2XM7q6Nq6zeSW7TikYgoRkO2BdLbGLY4tMO4PI0-A8ePstZZhTDap88UXOJ_9btZLO_qH164Z9y0vhmUhAhTp96dxW6hngwSfpxiZvkT4DCmEcGgi6RIx6zFN0uU-x_g9Z9WjtnGn-YqZ-NYnhpKNSqvFr2gn1DQ1qIqmQw7yp1TTOJzKXRjgniZLkOEErffw9PyoR0YeIioI727i_ngGOmhCgfuW" },
  { id: 8, name: "Ford Explorer", location: "Denver, CO", price: 95, rating: 4.4, reviews: 178, badge: "Family", category: "SUV", seats: 7, transmission: "Automatic", fuel: "Gasoline", image: "https://lh3.googleusercontent.com/aida/AP1WRLtU7WwqDZ7QoZY00BfQvmDtawSKmGOlSi1r8FBQZt4O2sF5K9p7uWTCBL7ldkGDGC2NXsfD0vcZbFIuTL8YqBvVCUMBLCm7l69PL_gGY2I2lbA3DYLtx5Qxbh4N0wyrw-VbPH7CzlOveaMPOvxGifSN4NukzBPgikFI9umSRNfF58GF0RyQkhYobzr-vILy4QKXPJwRAZHGd_oM5zcvCFc-RgSXzR5iobyYBSscL7fl7wX9Eyu2Wz6JfTY" },
  { id: 9, name: "Honda Civic", location: "Phoenix, AZ", price: 48, rating: 4.5, reviews: 289, badge: null, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Gasoline", image: "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl" },
];

const CATEGORIES = ["All", "SUV", "Sedan", "Hatchback"];
const FUELS = ["All", "Gasoline", "Electric", "Hybrid"];
const TRANSMISSIONS = ["All", "Automatic", "Manual"];

const badgeColors: Record<string, string> = {
  "Guest favourite": "bg-white/95 text-slate-800 border border-slate-200",
  Popular: "bg-sky-600 text-white",
  New: "bg-emerald-500 text-white",
  "Top Rated": "bg-amber-500 text-white",
  Luxury: "bg-violet-600 text-white",
  EV: "bg-teal-500 text-white",
  Family: "bg-orange-500 text-white",
};

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

export default function CarsPage() {
  const [category, setCategory] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFav = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const filtered = ALL_CARS.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      (fuel === "All" || c.fuel === fuel) &&
      (transmission === "All" || c.transmission === transmission) &&
      c.price <= maxPrice
  ).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
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
          <p className="text-white/60 mt-2 text-sm">{filtered.length} vehicles matching your filters</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filter panel */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <p className="font-semibold text-slate-900">Filters</p>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <PillBtn key={c} active={category === c} onClick={() => setCategory(c)}>{c}</PillBtn>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Fuel type</p>
                <div className="flex flex-wrap gap-2">
                  {FUELS.map((f) => (
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
                  <span className="text-sm font-bold text-slate-900">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={200}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-sky-600"
                  aria-label="Maximum price per day"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>$30</span>
                  <span>$200</span>
                </div>
              </div>

              <button
                onClick={() => { setCategory("All"); setFuel("All"); setTransmission("All"); setMaxPrice(200); }}
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
                {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"} found
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <label htmlFor="cars-sort" className="text-sm text-slate-500 whitespace-nowrap">Sort by</label>
                <select
                  id="cars-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  <option value="rating">Top rated</option>
                  <option value="price_asc">Price: low to high</option>
                  <option value="price_desc">Price: high to low</option>
                  <option value="reviews">Most reviewed</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
                <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base font-medium">No vehicles match these filters.</p>
                <button
                  onClick={() => { setCategory("All"); setFuel("All"); setTransmission("All"); setMaxPrice(200); }}
                  className="text-sky-600 text-sm font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => (
                  <Link
                    key={car.id}
                    href={`/cars/${car.id}`}
                    className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Badge */}
                      {car.badge && (
                        <span
                          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${badgeColors[car.badge] ?? "bg-slate-800 text-white"}`}
                        >
                          {car.badge}
                        </span>
                      )}
                      {/* Fav button */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleFav(car.id); }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm transition-all ${
                          favorites.includes(car.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-slate-500 hover:bg-white"
                        }`}
                        aria-label={favorites.includes(car.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <svg className="w-4 h-4" fill={favorites.includes(car.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors">{car.name}</h3>
                        <div className="flex items-center gap-1 shrink-0">
                          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-semibold text-slate-700">{car.rating}</span>
                          <span className="text-xs text-slate-400">({car.reviews})</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {car.location}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sky-600 font-bold text-lg">${car.price}</span>
                          <span className="text-slate-400 text-xs ml-1">/day</span>
                        </div>
                        <span className="text-xs bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{car.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
