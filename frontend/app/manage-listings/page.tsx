"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MOCK_LISTINGS = [
  {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    city: "Karachi",
    dailyRate: "4500",
    status: "active",
    plateNumber: "KHI-2201",
    transmission: "automatic",
    fuelType: "gasoline",
    seats: 5,
    primaryImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80",
    bookingsCount: 14,
    totalEarnings: 63000,
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2021,
    city: "Lahore",
    dailyRate: "5500",
    status: "under_review",
    plateNumber: "LHR-4412",
    transmission: "automatic",
    fuelType: "gasoline",
    seats: 5,
    primaryImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    bookingsCount: 0,
    totalEarnings: 0,
  },
  {
    id: "3",
    make: "Suzuki",
    model: "Alto",
    year: 2023,
    city: "Islamabad",
    dailyRate: "2800",
    status: "active",
    plateNumber: "ISB-8801",
    transmission: "manual",
    fuelType: "gasoline",
    seats: 4,
    primaryImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    bookingsCount: 7,
    totalEarnings: 19600,
  },
];

const STATUS_MAP: Record<string, { label: string; classes: string }> = {
  active: { label: "Active", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  under_review: { label: "Under Review", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  suspended: { label: "Suspended", classes: "bg-red-50 text-red-600 border-red-200" },
};

export default function ManageListingsPage() {
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  function handleToggleStatus(id: string) {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "active" ? "suspended" : "active" }
          : l
      )
    );
  }

  const totalEarnings = listings.reduce((s, l) => s + l.totalEarnings, 0);
  const activeCount = listings.filter((l) => l.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-sky-600 font-semibold mb-1 uppercase tracking-widest">Host Dashboard</p>
            <h1
              className="text-4xl font-normal text-slate-900"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              My listings
            </h1>
          </div>
          <Link
            href="/list-car"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm"
            id="manage-add-car-btn"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            List a new car
          </Link>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total listings", value: listings.length.toString() },
            { label: "Active", value: activeCount.toString() },
            { label: "Total bookings", value: listings.reduce((s, l) => s + l.bookingsCount, 0).toString() },
            { label: "Total earned", value: `PKR ${totalEarnings.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Listing cards */}
        <div className="space-y-4">
          {listings.map((l) => {
            const s = STATUS_MAP[l.status] ?? STATUS_MAP.suspended;
            return (
              <div
                key={l.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="md:w-52 h-44 md:h-auto shrink-0 overflow-hidden bg-slate-100">
                  <img
                    src={l.primaryImage ?? `https://picsum.photos/seed/${l.id}/600/400`}
                    alt={`${l.year} ${l.make} ${l.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-slate-900">
                          {l.year} {l.make} {l.model}
                        </h3>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${s.classes}`}
                        >
                          {s.label}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 2a8 8 0 00-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 00-8-8z" />
                        </svg>
                        {l.city}
                        <span className="mx-1 text-slate-200">·</span>
                        {l.plateNumber}
                      </p>
                    </div>
                    <p className="text-sky-700 font-bold text-lg">
                      PKR {parseInt(l.dailyRate).toLocaleString()}
                      <span className="text-slate-400 text-sm font-normal"> / day</span>
                    </p>
                  </div>

                  {/* Specs row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
                    {[
                      `${l.seats} seats`,
                      l.transmission.charAt(0).toUpperCase() + l.transmission.slice(1),
                      l.fuelType.charAt(0).toUpperCase() + l.fuelType.slice(1),
                    ].map((spec) => (
                      <span key={spec} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Earnings row */}
                  <div className="flex items-center gap-6 text-sm border-t border-slate-50 pt-4">
                    <span className="text-slate-400">
                      <span className="font-semibold text-slate-700">{l.bookingsCount}</span> bookings
                    </span>
                    <span className="text-slate-400">
                      Earned:{" "}
                      <span className="font-semibold text-emerald-600">
                        PKR {l.totalEarnings.toLocaleString()}
                      </span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href={`/cars/${l.id}`}
                      className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      View listing
                    </Link>
                    <span className="text-slate-200">|</span>
                    <Link
                      href={`/list-car?edit=${l.id}`}
                      className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-slate-200">|</span>
                    <button
                      onClick={() => handleToggleStatus(l.id)}
                      className={`text-sm font-medium ${
                        l.status === "active"
                          ? "text-amber-600 hover:text-amber-700"
                          : "text-emerald-600 hover:text-emerald-700"
                      } hover:underline`}
                    >
                      {l.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <span className="text-slate-200">|</span>
                    <button
                      onClick={() => setDeleteTarget(l.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-28 text-slate-400">
            <svg className="w-14 h-14 mx-auto mb-4 opacity-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <p className="font-semibold text-slate-600 text-lg mb-2">No listings yet</p>
            <Link href="/list-car" className="text-sky-600 hover:underline text-sm">
              List your first car →
            </Link>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Remove listing?</h2>
            <p className="text-slate-500 text-sm mb-6">
              This will deactivate the listing. Active bookings won't be affected.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setListings((p) => p.filter((l) => l.id !== deleteTarget));
                  setDeleteTarget(null);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl text-sm transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
