import { Section } from "./CarCard";
import { Star } from "lucide-react";

interface DealCardProps {
  name: string;
  location: string;
  originalPrice: string;
  salePrice: string;
  rating: number;
  reviews: number;
  image: string;
  discount?: string;
}

function DealCard({
  name,
  location,
  originalPrice,
  salePrice,
  rating,
  reviews,
  image,
  discount,
}: DealCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden shrink-0 w-60">
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* <Image
          src={image}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          // If your external image domains aren't configured in next.config.js,
          // you can add unoptimized to bypass Next.js optimization. Remove if not needed.
          // unoptimized
        /> */}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{location}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400 line-through">
            {originalPrice}
          </span>
          <span className="text-sm font-bold text-gray-900">{salePrice}</span>
          <span className="text-xs text-gray-400">/day</span>
        </div>
      </div>
    </div>
  );
}

const amazingDeals = [
  {
    name: "Ford Mustang GT",
    location: "Miami, Florida",
    originalPrice: "$120",
    salePrice: "$85",
    rating: 4.9,
    reviews: 432,
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=400&q=80",
    discount: "29",
  },
  {
    name: "Yellow Porsche 911",
    location: "Los Angeles, CA",
    originalPrice: "$200",
    salePrice: "$140",
    rating: 5.0,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    discount: "30",
  },
  {
    name: "Ferrari 488",
    location: "Monaco",
    originalPrice: "$350",
    salePrice: "$250",
    rating: 5.0,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&q=80",
    discount: "28",
  },
  {
    name: "Tesla Model S",
    location: "San Francisco, CA",
    originalPrice: "$150",
    salePrice: "$110",
    rating: 4.8,
    reviews: 298,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80",
    discount: "26",
  },
  {
    name: "Audi A4 Sport",
    location: "Munich, Germany",
    originalPrice: "$80",
    salePrice: "$58",
    rating: 4.7,
    reviews: 214,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80",
    discount: "27",
  },
];

export default function AmazingDeals() {
  return (
    <div className="bg-white">
      <Section
        title="Amazing car rental deals in full"
        subtitle="Limited-time offers on premium vehicles"
        seeAllHref="#"
        scrollable
      >
        {amazingDeals.map((deal) => (
          <DealCard key={deal.name} {...deal} />
        ))}
      </Section>
    </div>
  );
}
