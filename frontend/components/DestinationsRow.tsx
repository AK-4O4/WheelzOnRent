"use client";
import { useState } from "react";
import Link from "next/link";

const DESTINATIONS = [
  {
    city: "London",
    country: "United Kingdom",
    count: "5,120+",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLsnTIXeoXQhFqUDPD_Ag1cArzU3oqF_paXggSmsDduziJPb3r51Ycj8Nd55ymMaRM8kv7lVb0KcV79HO3I669eO95MfPu7BNe1uljRLBSU4tkAX5vUHnFD8mMFkc3Jh2pSWGPb6ZJmWNprotvhnrZJUgQJXIvjF2D48AOw8q8pg9noAb1jEqbMd86Dc861hRZIo1StMq3XUJ4eMvKR2uCviKYu1Z5sXcqjpfwWuVPVCHxZsD1tyy4CFfiI",
  },
  {
    city: "Tokyo",
    country: "Japan",
    count: "5,880+",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLsAj9xybKYFkzSSbl6G4Td8d0fh9SfxKGoLDHAuMngvG6q0qsKeSx2jA2Wnoyn_QYa8ZjvI9dtEorb_mspc3uKeYfpFZyqhbsczFbCNzNrjUktvgnsg9fK8tAEHbGUqulKm-V_jElmHjvzZw8EUwvovffM2PBKplOVf2QacYOr-Nuqb0EIcR7zn0i_oyDzC9HRrlLDWXiBwFUbDKDfd2R-iLXJFclBUl7PqD5too8reD4T19THiqfrNtirT",
  },
  {
    city: "Rome",
    country: "Italy",
    count: "3,340+",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLtoHGDZ4w48CkRHAO9iBOfM9xNqMSsJTilCfdP2T5vP45yWHj0htA1_ctCvEGmkV_wn7xWeGFtfa4ZeDoPXS-vIkiFrOnw6AHbUeEnJnnRGLnNDomwEDaPUvIZUEuee1dKNfqCw1ESZXWj08YqOTquY5d8GMmEElTT_k6GmfldNNxWHTNX0yV2o0QiUhQ39XA2eoavgnUyQTIZ7GiIaEMxcT-F5hZJOcf1JC27MvhjxLK2DT4fOLJwduBs",
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
            Top destinations
          </h2>
          <Link
            href="/cars"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors underline underline-offset-4"
          >
            View all cities
          </Link>
        </div>

        {/* Horizontal Accordion (Section 10 vocabulary) */}
        <div className="flex gap-3 h-[420px] overflow-hidden rounded-2xl">
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.city}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
