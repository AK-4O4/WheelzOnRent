import { Star, ChevronRight } from "lucide-react";

interface CarCardProps {
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  badges?: string[];
  isCompact?: boolean;
}

export function CarCard({
  name,
  location,
  price,
  rating,
  reviews,
  image,
  badges,
  isCompact,
}: CarCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all overflow-hidden shrink-0 ${isCompact ? "w-52" : "w-64"}`}
    >
      <div
        className={`relative overflow-hidden ${isCompact ? "h-32" : "h-40"}`}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {badges &&
          badges.map((badge) => (
            <span
              key={badge}
              className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{location}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-sm font-bold text-gray-900">{price}</span>
            <span className="text-xs text-gray-400">/day</span>
          </div>
          <button className="text-xs text-blue-600 font-medium hover:underline">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  children: React.ReactNode;
  scrollable?: boolean;
}

export function Section({
  title,
  subtitle,
  seeAllHref,
  children,
  scrollable,
}: SectionProps) {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {seeAllHref && (
            <a
              href={seeAllHref}
              className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
            >
              See all <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>
        {scrollable ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
