"use client";
import { useState } from "react";
import Link from "next/link";

const DESTINATIONS = [
  {
    city: "Karachi",
    country: "Pakistan",
    count: "2,400+",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  },
  {
    city: "Lahore",
    country: "Pakistan",
    count: "1,870+",
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=1200&q=80",
  },
  {
    city: "Islamabad",
    country: "Pakistan",
    count: "980+",
    image: "https://images.unsplash.com/photo-1567416661576-659d50397f04?w=1200&q=80",
  },
];

export default function DestinationShowcase() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-40 bg-white" data-purpose="popular-destinations">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2
            className="text-4xl md:text-5xl font-normal text-slate-900 leading-tight max-w-xs"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Cities across Pakistan
          </h2>
          <Link
            href="/cars"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors underline underline-offset-4"
          >
            View all cities
          </Link>
        </div>

        {/* Horizontal Accordion (Section 10 vocabulary) */}
        <div className="flex gap-3 h-105 overflow-hidden rounded-2xl">
          {DESTINATIONS.map((dest, i) => (
            <Link
              key={dest.city}
              href={`/cars?city=${encodeURIComponent(dest.city)}`}
              className="relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-500 ease-out"
              style={{ flex: active === i ? "3.5" : active === null ? "1" : "0.6" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <img
                src={dest.image}
                alt={`${dest.city}, ${dest.country}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="transition-all duration-500"
                  style={{ opacity: active === i ? 1 : 0.7 }}
                >
                  <p className="text-white font-semibold text-lg leading-tight">{dest.city}</p>
                  <p className="text-white/70 text-sm">{dest.country}</p>
                  <p
                    className="text-white/60 text-xs mt-1 transition-all duration-300"
                    style={{ opacity: active === i ? 1 : 0 }}
                  >
                    {dest.count} vehicles available
                  </p>
                </div>
              </div>

              {/* Collapsed label */}
              {active !== i && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p
                    className="text-white font-semibold text-sm whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      opacity: 0.8,
                    }}
                  >
                    {dest.city}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
