import { Section } from "./CarCard";
import { Star, MapPin } from "lucide-react";

interface HomeCarCardProps {
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  seats: number;
  transmission: string;
}

function HomeCarCard({
  name,
  location,
  price,
  rating,
  reviews,
  image,
  seats,
  transmission,
}: HomeCarCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">{name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">{price}</div>
            <div className="text-xs text-gray-400">per day</div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">{rating}</span>
            <span className="text-xs text-gray-400">({reviews})</span>
          </div>
          <span className="text-gray-200">|</span>
          <span className="text-xs text-gray-500">{seats} seats</span>
          <span className="text-gray-200">|</span>
          <span className="text-xs text-gray-500">{transmission}</span>
        </div>
      </div>
    </div>
  );
}

const homeCars = [
  {
    name: "Mercedes C-Class",
    location: "Madrid, Spain",
    price: "$72",
    rating: 4.8,
    reviews: 201,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
    seats: 5,
    transmission: "Auto",
  },
  {
    name: "Kia Sportage",
    location: "Seville, Spain",
    price: "$40",
    rating: 4.6,
    reviews: 157,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
    seats: 5,
    transmission: "Auto",
  },
  {
    name: "Audi Q5 SUV",
    location: "Barcelona, Spain",
    price: "$95",
    rating: 4.9,
    reviews: 132,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
    seats: 7,
    transmission: "Auto",
  },
  {
    name: "Nissan Qashqai",
    location: "Valencia, Spain",
    price: "$44",
    rating: 4.5,
    reviews: 186,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80",
    seats: 5,
    transmission: "Manual",
  },
  {
    name: "Peugeot 508",
    location: "Bilbao, Spain",
    price: "$38",
    rating: 4.7,
    reviews: 123,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
    seats: 5,
    transmission: "Auto",
  },
  {
    name: "SEAT Ibiza",
    location: "Málaga, Spain",
    price: "$25",
    rating: 4.4,
    reviews: 241,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80",
    seats: 5,
    transmission: "Manual",
  },
];

export default function HomeDeals() {
  return (
    <div className="bg-gray-50">
      <Section
        title="Great car rental deals at home"
        subtitle="Top-rated vehicles near you"
        seeAllHref="#"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeCars.map((car) => (
            <HomeCarCard key={car.name} {...car} />
          ))}
        </div>
      </Section>
    </div>
  );
}
