import { Section } from "@/components/cars/CarCard";

const spainPhotos = [
  {
    title: "Sagrada Família",
    location: "Barcelona",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80",
    size: "large",
  },
  {
    title: "Park Güell",
    location: "Barcelona",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    size: "small",
  },
  {
    title: "Alhambra",
    location: "Granada",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
    size: "small",
  },
  {
    title: "Seville Cathedral",
    location: "Seville",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=400&q=80",
    size: "small",
  },
  {
    title: "Costa Brava",
    location: "Girona",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
    size: "small",
  },
];

export default function TravelSpain() {
  return (
    <div className="bg-white">
      <Section
        title="Travel for Spain"
        subtitle="Discover the most beautiful destinations in Spain"
        seeAllHref="#"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Large featured photo */}
          <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden h-60 md:h-72 group cursor-pointer">
            <img
              src={spainPhotos[0].image}
              alt={spainPhotos[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <p className="text-white font-bold text-sm">
                {spainPhotos[0].title}
              </p>
              <p className="text-white/80 text-xs">{spainPhotos[0].location}</p>
            </div>
          </div>

          {/* Smaller photos */}
          {spainPhotos.slice(1).map((photo) => (
            <div
              key={photo.title}
              className="relative rounded-xl overflow-hidden h-28 md:h-34.5 group cursor-pointer"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2">
                <p className="text-white font-semibold text-xs">
                  {photo.title}
                </p>
                <p className="text-white/70 text-[10px]">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
