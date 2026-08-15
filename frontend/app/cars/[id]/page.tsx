"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect, use } from "react";
import type { VehicleDetail as Vehicle } from "@/types";
import { API_BASE as API } from "@/data/constants/app.constants";
import { FUEL_LABELS, TRANS_LABELS } from "@/data/constants/vehicles.constants";
import {
  STATIC_REVIEWS, STATIC_EXTRAS, INCLUDED_FEATURES,
} from "@/data/placeholders/cars.placeholders";
import {
  MapPinIcon, HeartIcon, ShareIcon, CheckCircleIcon,
  GridPhotosIcon, StarIcon, LicensePlateIcon, TransmissionIcon,
  LightningIcon, MapPinSolidIcon, CalendarIcon, UserCircleIcon,
} from "@/assets/svg";

// ── Sub-components ────────────────────────────────────────────────────────────

function Stars({ count, max = 5, size = "sm" }: { count: number; max?: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : "w-3.5 h-3.5";
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} className={`${sz} ${i < count ? "text-amber-400" : "text-slate-200"}`} fill={i < count ? "currentColor" : "none"} stroke="none" />
      ))}
    </span>
  );
}

function Counter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => onChange(Math.max(0, value - 1))} className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors text-lg leading-none" aria-label="Decrease">
        <span className="-mt-0.5">−</span>
      </button>
      <span className="w-4 text-center text-sm font-medium text-slate-800">{value}</span>
      <button onClick={() => onChange(value + 1)} className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors text-lg leading-none" aria-label="Increase">
        <span className="-mt-0.5">+</span>
      </button>
    </div>
  );
}

function SkeletonDetail() {
  return (
    <div className="max-w-300 mx-auto px-6 pt-6 pb-24 animate-pulse">
      <div className="flex gap-3 mb-8 h-105">
        <div className="flex-2 bg-slate-200 rounded-2xl" />
        <div className="flex flex-col gap-3 flex-1">
          {[0, 1, 2].map(i => <div key={i} className="flex-1 bg-slate-200 rounded-2xl" />)}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-100 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [car, setCar] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [extraCounts, setExtraCounts] = useState(STATIC_EXTRAS.map(() => 0));
  const [reviewText, setReviewText] = useState("");
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`${API}/api/vehicles/${id}`);
        if (res.status === 404) { setNotFound(true); return; }
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        setCar(json.data);
      } catch (e) {
        console.error(e);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  const days = 3;
  const dailyRate = car ? parseFloat(car.dailyRate) : 0;
  const extrasTotal = STATIC_EXTRAS.reduce((sum, e, i) => sum + e.price * extraCounts[i] * days, 0);
  const total = dailyRate * days + extrasTotal;

  const visibleFeatures = showAllFeatures ? INCLUDED_FEATURES : INCLUDED_FEATURES.slice(0, 6);

  const images = car?.images ?? [];
  const mainImage = images.find(i => i.isPrimary)?.imageUrl ?? images[0]?.imageUrl ?? `https://api.dicebear.com/9.x/shapes/svg?seed=${id}&backgroundColor=e2e8f0`;
  const thumbImages = images.filter(i => !i.isPrimary).slice(0, 3).map(i => i.imageUrl);

  const ownerName = car?.owner?.fullName ?? "Vehicle Owner";
  const ownerAvatar = car?.owner?.profilePictureUrl ?? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(ownerName.slice(0, 2))}&backgroundColor=0ea5e9`;
  const ownerJoined = car?.owner?.createdAt
    ? new Date(car.owner.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  const fuelLabel = car ? (FUEL_LABELS[car.fuelType] ?? car.fuelType) : "";
  const transLabel = car ? (TRANS_LABELS[car.transmission] ?? car.transmission) : "";
  const carTitle = car ? `${car.year} ${car.make} ${car.model}` : "";

  // ── Loading / error states ────────────────────────────────────────────────
  if (loading) return <div className="min-h-screen bg-[#f2f4f7]"><Navbar /><SkeletonDetail /></div>;

  if (notFound || !car) return (
    <div className="min-h-screen bg-[#f2f4f7] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
        <MapPinSolidIcon className="w-16 h-16 opacity-25" />
        <p className="text-xl font-semibold text-slate-700">Vehicle not found</p>
        <Link href="/cars" className="text-sky-600 text-sm font-medium hover:underline">← Back to listings</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-slate-900">
      <Navbar />

      <div className="max-w-300 mx-auto px-6 pt-6 pb-24">

        {/* ── Gallery ── */}
        <div className="flex gap-3 mb-8 h-105">
          <div className="relative flex-2 rounded-2xl overflow-hidden">
            <img src={mainImage} alt={carTitle} className="w-full h-full object-cover" />
            <button className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-white transition-colors shadow-sm" aria-label="Show all photos">
              <GridPhotosIcon className="w-4 h-4" />
              Show all photos
            </button>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {(thumbImages.length > 0 ? thumbImages : [mainImage, mainImage, mainImage]).slice(0, 3).map((img, i) => (
              <div key={i} className="flex-1 rounded-2xl overflow-hidden bg-slate-200">
                <img src={img} alt={`${carTitle} view ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-0">

            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{carTitle}</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                  <MapPinIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{car.city}</span>
                  <span className="text-slate-300">·</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium">{fuelLabel}</span>
                  <span className="text-slate-300">·</span>
                  <Stars count={5} />
                  <span className="font-medium text-slate-700">New listing</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setIsFav(!isFav)} className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm" aria-label="Save to favorites">
                  <HeartIcon className={`w-4 h-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : "fill-transparent text-slate-500"}`} />
                </button>
                <button className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm" aria-label="Share">
                  <ShareIcon className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Host row */}
            <div className="flex items-center gap-3 py-5 border-b border-slate-200">
              <div className="relative shrink-0">
                <img src={ownerAvatar} alt={ownerName} className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Listed by {ownerName}</p>
                <p className="text-xs text-sky-600">Member since {ownerJoined}</p>
              </div>
            </div>

            {/* Spec icons row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-5 py-6 border-b border-slate-200">
              {[
                { label: `${car.seats} seats`,  icon: <UserCircleIcon className="w-5 h-5" /> },
                { label: transLabel,              icon: <TransmissionIcon className="w-5 h-5" /> },
                { label: fuelLabel,               icon: <LightningIcon className="w-5 h-5" />, accent: "text-sky-600" },
                { label: "A/C",                   icon: <MapPinIcon className="w-5 h-5" /> },
                { label: car.plateNumber,          icon: <LicensePlateIcon className="w-5 h-5" /> },
              ].map(({ label, icon, accent }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className={accent ?? "text-slate-500"}>{icon}</span>
                  <span className={`text-xs font-medium ${accent ?? "text-slate-600"}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* Included in the price */}
            <div className="py-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">Included in the price</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircleIcon className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" />
                    <span className="text-sm text-sky-700 leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              {INCLUDED_FEATURES.length > 6 && (
                <button onClick={() => setShowAllFeatures(!showAllFeatures)} className="mt-4 text-sm font-semibold text-slate-800 underline underline-offset-2 hover:text-slate-600 transition-colors">
                  {showAllFeatures ? "Show less" : `Show all ${INCLUDED_FEATURES.length} features`}
                </button>
              )}
            </div>

            {/* Pick up and drop off */}
            <div className="py-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-5">Pick up and drop off</h2>
              <div className="relative pl-4">
                <div className="absolute left-1.75 top-4 bottom-4 w-px bg-slate-200" aria-hidden="true" />
                <div className="flex flex-col gap-1 mb-6 relative">
                  <div className="absolute -left-4 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white" />
                  <p className="text-sm text-sky-600 font-medium">Select pickup date</p>
                  <p className="text-base font-semibold text-slate-800">{car.city}</p>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <div className="absolute -left-4 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white" />
                  <p className="text-sm text-sky-600 font-medium">Select dropoff date</p>
                  <p className="text-base font-semibold text-slate-800">{car.city}</p>
                </div>
              </div>
            </div>

            {/* Host + Reviews */}
            <div className="py-8 flex flex-col md:flex-row gap-8">
              {/* Host card */}
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={ownerAvatar} alt={ownerName} className="w-14 h-14 rounded-full object-cover" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{ownerName}</p>
                      <p className="text-xs text-slate-400">Joined {ownerJoined}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-sm font-medium border border-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                      Contact host
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Reviews</h2>
                <Stars count={5} size="lg" />
                <div className="flex items-center gap-3 mt-5 mb-6">
                  <input
                    type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts ..."
                    className="flex-1 bg-white border border-slate-200 rounded-full px-5 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    aria-label="Write a review"
                  />
                  <button className="w-11 h-11 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-all shrink-0" aria-label="Submit review">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  {STATIC_REVIEWS.map((r) => (
                    <div key={r.id} className="flex gap-3">
                      <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-slate-800">{r.author}</p>
                          <span className="text-slate-300 text-xs">·</span>
                          <p className="text-xs text-slate-400">{r.date}</p>
                        </div>
                        <Stars count={r.rating} />
                        <p className="text-sm text-slate-500 leading-relaxed mt-1.5">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="py-6 border-t border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">Location</h2>
              <p className="text-sm text-slate-500 mb-5">{car.city}</p>
              <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 border border-slate-200 relative flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                  <MapPinSolidIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-slate-500 font-medium">{car.city}</p>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Sticky Booking Card ── */}
          <div className="w-full lg:w-85 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-bold text-slate-900">PKR {dailyRate.toLocaleString()}</span>
                <span className="text-slate-400 text-sm">/ day</span>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-5">
                <CalendarIcon className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Select your dates</p>
                  <p className="text-xs text-slate-400">Pick-up / Drop-off</p>
                </div>
              </div>

              <div className="space-y-4 mb-5">
                {STATIC_EXTRAS.map((extra, i) => (
                  <div key={extra.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{extra.name}</p>
                      <p className="text-xs text-slate-400">PKR {extra.price} / day</p>
                    </div>
                    <Counter value={extraCounts[i]} onChange={(v) => { const next = [...extraCounts]; next[i] = v; setExtraCounts(next); }} />
                  </div>
                ))}
              </div>

              <hr className="border-slate-100 mb-4" />

              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-slate-700">Total ({days} days)</span>
                <span className="text-base font-bold text-slate-900">PKR {total.toLocaleString()}</span>
              </div>

              <button id="detail-reserve-btn" className="w-full bg-slate-900 hover:bg-slate-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition-all text-sm">
                Reserve
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">You won&apos;t be charged yet</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
