const cars = [
  {
    id: 1,
    name: "Peugeot 108",
    address: "8953 Golf Course Terrace",
    rating: "5",
    reviews: 126,
    price: "$124",
    badge: "Guest favourite",
    badgeStyle: "bg-white/90 backdrop-blur text-slate-800",
    specs: ["5 seats", "Automatic", "A/C", "Electric"],
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl",
  },
  {
    id: 2,
    name: "Vauxhall Corsa",
    address: "2606 Straubel Crossing",
    rating: "4.6",
    reviews: 217,
    price: "$382",
    badge: "Guest favourite",
    badgeStyle: "bg-white/90 backdrop-blur text-slate-800",
    specs: ["5 seats", "Electric", "500 mi"],
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsXA57uRtxI6sAO7usCfMw1FkBttVIovdvtd49_VYJHq1oozEFTqLxzsXEG27Xj-A39rt7564mcujNkTSMHf5rZi2RJxa53z8BVc-0h08fRZIugXMl9GQoxIYNsHyzZJX4k1EpMikHnHaiHy4cCnUnDE_bG68oRKdZFKolZ7X6DOzxs0bOO1TD_CDJbl0aNF8R4GvLlYHpdfDnQHvrns0FWlm2Y4UQfLg_vvrq5s_OzHvH9dUIpwZcwFV8",
  },
  {
    id: 3,
    name: "Nissan Micra",
    address: "14 Petterle Trail",
    rating: "4.8",
    reviews: 534,
    price: "$105",
    badge: "Popular",
    badgeStyle: "bg-sky-600 text-white",
    specs: ["Electric", "311 mi", "7 seats"],
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuVokeoWVVYiqP0zjQP7SzdFdxq45V2XM7q6Nq6zeSW7TikYgoRkO2BdLbGLY4tMO4PI0-A8ePstZZhTDap88UXOJ_9btZLO_qH164Z9y0vhmUhAhTp96dxW6hngwSfpxiZvkT4DCmEcGgi6RIx6zFN0uU-x_g9Z9WjtnGn-YqZ-NYnhpKNSqvFr2gn1DQ1qIqmQw7yp1TTOJzKXRjgniZLkOEErffw9PyoR0YeIioI727i_ngGOmhCgfuW",
  },
  {
    id: 4,
    name: "Hyundai i30",
    address: "34591 Dawn Park",
    rating: "4.1",
    reviews: 527,
    price: "$266",
    badge: "Guest favourite",
    badgeStyle: "bg-white/90 backdrop-blur text-slate-800",
    specs: ["9 seats", "Automatic", "Electric"],
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtU7WwqDZ7QoZY00BfQvmDtawSKmGOlSi1r8FBQZt4O2sF5K9p7uWTCBL7ldkGDGC2NXsfD0vcZbFIuTL8YqBvVCUMBLCm7l69PL_gGY2I2lbA3DYLtx5Qxbh4N0wyrw-VbPH7CzlOveaMPOvxGifSN4NukzBPgikFI9umSRNfF58GF0RyQkhYobzr-vILy4QKXPJwRAZHGd_oM5zcvCFc-RgSXzR5iobyYBSscL7fl7wX9Eyu2Wz6JfTY",
  },
];

export default function BaliDeals() {
  return (
    <section className="py-20 bg-slate-50/30" data-purpose="bali-car-deals">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="text-4xl"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              }}
            >
              Great car rental deals{" "}
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                in Bali
              </span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 custom-scroll">
          {cars.map((car) => (
            <div
              key={car.id}
              className="min-w-[300px] bg-white rounded-3xl overflow-hidden border border-slate-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  src={car.image}
                />
                <div
                  className={`absolute top-4 left-4 ${car.badgeStyle} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}
                >
                  {car.badge}
                </div>
                <button className="absolute top-4 right-4 text-white/80 hover:text-red-500">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
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
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className="text-yellow-400">★</span> {car.rating} (
                    {car.reviews})
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">{car.address}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 border-t border-slate-50 pt-4">
                  {car.specs.map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-lg font-bold text-sky-700">
                    {car.price}{" "}
                    <span className="text-slate-400 text-sm font-normal">
                      / day
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
