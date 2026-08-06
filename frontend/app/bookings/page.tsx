"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type BookingStatus = "pending" | "confirmed" | "ongoing" | "completed" | "cancelled";

interface Booking {
  id: string;
  renter: { name: string; avatar: string; phone: string };
  car: string;
  carImage: string;
  city: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-1001",
    renter: { name: "Hamza Raza", avatar: "https://i.pravatar.cc/40?img=3", phone: "+92 300 1234567" },
    car: "2022 Toyota Corolla",
    carImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=300&q=80",
    city: "Karachi",
    startDate: "Aug 10, 2026",
    endDate: "Aug 13, 2026",
    totalAmount: 13500,
    status: "confirmed",
    createdAt: "Aug 2, 2026",
  },
  {
    id: "BK-1002",
    renter: { name: "Ayesha Khan", avatar: "https://i.pravatar.cc/40?img=5", phone: "+92 321 9876543" },
    car: "2023 Suzuki Alto",
    carImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&q=80",
    city: "Islamabad",
    startDate: "Aug 5, 2026",
    endDate: "Aug 7, 2026",
    totalAmount: 5600,
    status: "ongoing",
    createdAt: "Jul 30, 2026",
  },
  {
    id: "BK-1003",
    renter: { name: "Ali Nawaz", avatar: "https://i.pravatar.cc/40?img=8", phone: "+92 333 5554444" },
    car: "2022 Toyota Corolla",
    carImage: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=300&q=80",
    city: "Karachi",
    startDate: "Jul 20, 2026",
    endDate: "Jul 24, 2026",
    totalAmount: 18000,
    status: "completed",
    createdAt: "Jul 15, 2026",
  },
  {
    id: "BK-1004",
    renter: { name: "Sara Ahmed", avatar: "https://i.pravatar.cc/40?img=9", phone: "+92 311 7778888" },
    car: "2021 Honda Civic",
    carImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&q=80",
    city: "Lahore",
    startDate: "Aug 20, 2026",
    endDate: "Aug 22, 2026",
    totalAmount: 11000,
    status: "pending",
    createdAt: "Aug 2, 2026",
  },
  {
    id: "BK-1005",
    renter: { name: "Usman Malik", avatar: "https://i.pravatar.cc/40?img=12", phone: "+92 345 6660000" },
    car: "2023 Suzuki Alto",
    carImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&q=80",
    city: "Islamabad",
    startDate: "Jul 10, 2026",
    endDate: "Jul 11, 2026",
    totalAmount: 2800,
    status: "cancelled",
    createdAt: "Jul 8, 2026",
  },
];

const STATUS_CONFIG: Record<BookingStatus, { label: string; dot: string; badge: string }> = {
  pending:   { label: "Pending",   dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", dot: "bg-sky-400",    badge: "bg-sky-50 text-sky-700 border-sky-200" },
  ongoing:   { label: "Ongoing",   dot: "bg-violet-400", badge: "bg-violet-50 text-violet-700 border-violet-200" },
  completed: { label: "Completed", dot: "bg-emerald-400",badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Cancelled", dot: "bg-red-300",    badge: "bg-red-50 text-red-500 border-red-200" },
};

const FILTERS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function MonitorBookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter((b) => b.status === filter);

  const totalRevenue = MOCK_BOOKINGS.filter(
    (b) => b.status === "completed" || b.status === "ongoing"
  ).reduce((s, b) => s + b.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm text-sky-600 font-semibold mb-1 uppercase tracking-widest">Host Dashboard</p>
          <h1
            className="text-4xl font-normal text-slate-900"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Bookings
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total bookings",  value: MOCK_BOOKINGS.length.toString() },
            { label: "Active right now", value: MOCK_BOOKINGS.filter((b) => b.status === "ongoing").length.toString() },
            { label: "Pending approval", value: MOCK_BOOKINGS.filter((b) => b.status === "pending").length.toString() },
            { label: "Revenue earned",  value: `PKR ${totalRevenue.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                filter === f.value
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-200 text-slate-600 hover:border-slate-400 bg-white"
              }`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {MOCK_BOOKINGS.filter((b) => b.status === f.value).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="font-medium text-slate-600">No bookings found</p>
            </div>
          )}
          {filtered.map((b) => {
            const sc = STATUS_CONFIG[b.status];
            const isOpen = expanded === b.id;
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Summary row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : b.id)}
                  className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 text-left hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  {/* Car thumbnail */}
                  <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={b.carImage} alt={b.car} className="w-full h-full object-cover" />
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-slate-400 font-mono">{b.id}</span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${sc.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-900 truncate">{b.car}</p>
                    <p className="text-slate-400 text-xs">{b.startDate} – {b.endDate} · {b.city}</p>
                  </div>

                  {/* Renter */}
                  <div className="hidden md:flex items-center gap-2 shrink-0">
                    <img src={b.renter.avatar} alt={b.renter.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-white" />
                    <span className="text-sm text-slate-700">{b.renter.name}</span>
                  </div>

                  {/* Amount + chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-sky-700">PKR {b.totalAmount.toLocaleString()}</span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-slate-100 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Renter info */}
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Renter</p>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={b.renter.avatar} alt={b.renter.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900">{b.renter.name}</p>
                          <p className="text-xs text-slate-400">{b.renter.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Trip info */}
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Trip Details</p>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Pick-up</span>
                          <span className="font-medium">{b.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Return</span>
                          <span className="font-medium">{b.endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Location</span>
                          <span className="font-medium">{b.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Booked on</span>
                          <span className="font-medium">{b.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Actions</p>
                      <div className="flex flex-col gap-2">
                        {b.status === "pending" && (
                          <>
                            <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-xl text-sm transition-all">
                              Accept booking
                            </button>
                            <button className="w-full border border-slate-200 text-slate-600 font-semibold py-2 rounded-xl text-sm hover:bg-slate-50 transition-all">
                              Decline
                            </button>
                          </>
                        )}
                        {b.status === "confirmed" && (
                          <button className="w-full border border-slate-200 text-slate-600 font-semibold py-2 rounded-xl text-sm hover:bg-slate-50 transition-all">
                            Cancel booking
                          </button>
                        )}
                        {b.status === "completed" && (
                          <button className="w-full bg-slate-900 hover:bg-black text-white font-semibold py-2 rounded-xl text-sm transition-all">
                            Leave a review
                          </button>
                        )}
                        <button className="w-full border border-slate-200 text-slate-600 font-semibold py-2 rounded-xl text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                          </svg>
                          Message renter
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
