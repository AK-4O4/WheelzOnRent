"use client";
// =============================================================================
// components/dash/calendar-screen.tsx
// Dashboard Calendar screen — uses CalendarsMonthShowcasePage UI from
// components/ui/calendar-activity.tsx, driven by real booking data from the
// GET /api/bookings endpoint (all bookings for the current month).
// =============================================================================
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { fetchBookings, type BookingRow } from "@/lib/api";

// ── Tone palette — maps booking status to a colour token ─────────────────────

type Tone = "indigo" | "teal" | "amber" | "rose" | "violet" | "sky";

const STATUS_TONE: Record<string, Tone> = {
  pending:   "amber",
  confirmed: "sky",
  ongoing:   "indigo",
  completed: "teal",
  cancelled: "rose",
};

const TONE_CLASS: Record<Tone, string> = {
  indigo: "bg-indigo-500/15 text-indigo-700 border-indigo-500/30",
  teal:   "bg-teal-500/15   text-teal-700   border-teal-500/30",
  amber:  "bg-amber-500/15  text-amber-700  border-amber-500/30",
  rose:   "bg-rose-500/15   text-rose-700   border-rose-500/30",
  violet: "bg-violet-500/15 text-violet-700 border-violet-500/30",
  sky:    "bg-sky-500/15    text-sky-700    border-sky-500/30",
};

// ── Month helpers ─────────────────────────────────────────────────────────────

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/** 0 = Mon … 6 = Sun (ISO week) */
function isoWeekday(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1;
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ── Calendar event derived from a booking ────────────────────────────────────

interface CalEvent {
  day: number;
  title: string;
  tone: Tone;
}

function bookingToEvents(b: BookingRow): CalEvent[] {
  const tone = STATUS_TONE[b.status] ?? "sky";
  const label = `${b.vehicleMake ?? ""} ${b.vehicleModel ?? ""} · ${b.renterName ?? ""}`.trim();
  const start = new Date(b.startDate);
  const end   = new Date(b.endDate);
  // Add event on start day; if multi-day, also on end day
  const events: CalEvent[] = [{ day: start.getDate(), title: label, tone }];
  if (start.toDateString() !== end.toDateString()) {
    events.push({ day: end.getDate(), title: `↩ Return · ${b.vehicleMake ?? ""}`, tone: "teal" });
  }
  return events;
}

// ── Main component ────────────────────────────────────────────────────────────

export function CalendarScreen() {
  const today   = new Date();
  const [year,  setYear]  = React.useState(today.getFullYear());
  const [month, setMonth] = React.useState(today.getMonth()); // 0-indexed
  const [events, setEvents] = React.useState<CalEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Load bookings for the visible month
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchBookings({ limit: 100 })
      .then((res) => {
        if (cancelled) return;
        const monthStart = `${year}-${String(month + 1).padStart(2, "0")}-01`;
        const monthEnd   = `${year}-${String(month + 1).padStart(2, "0")}-${String(daysInMonth(year, month)).padStart(2, "0")}`;
        const inMonth = res.data.filter(
          (b) => b.startDate <= monthEnd && b.endDate >= monthStart
        );
        setEvents(inMonth.flatMap(bookingToEvents));
      })
      .catch(() => {
        // If not authenticated / API down — show empty calendar (no crash)
        if (!cancelled) setEvents([]);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [year, month]);

  function prev() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  }
  function next() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  }
  function goToday() { setYear(today.getFullYear()); setMonth(today.getMonth()); }

  const total  = daysInMonth(year, month);
  const offset = isoWeekday(year, month, 1); // blank cells before day 1
  const rows   = Math.ceil((offset + total) / 7);
  const todayDay = today.getFullYear() === year && today.getMonth() === month ? today.getDate() : -1;

  return (
    <div className="px-7 py-6">
      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
            Calendar · Bookings
          </p>
          <h2 className="mt-1 text-xl font-bold">{MONTH_NAMES[month]} {year}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prev}
            className="grid size-8 place-items-center rounded-md border border-[#edeff3] hover:bg-[#f4f5f7] transition-colors"
            aria-label="Previous month">
            <ChevronLeftIcon className="size-3.5" />
          </button>
          <button type="button" onClick={goToday}
            className="rounded-md border border-[#edeff3] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-[#f4f5f7] transition-colors">
            Today
          </button>
          <button type="button" onClick={next}
            className="grid size-8 place-items-center rounded-md border border-[#edeff3] hover:bg-[#f4f5f7] transition-colors"
            aria-label="Next month">
            <ChevronRightIcon className="size-3.5" />
          </button>
          {/* Legend */}
          <div className="ml-4 flex items-center gap-3 text-[11px]">
            {(Object.entries(STATUS_TONE) as [string, Tone][]).slice(0, 4).map(([status, tone]) => (
              <span key={status} className="flex items-center gap-1.5 capitalize text-muted-foreground">
                <span className={`w-2 h-2 rounded-[3px] border ${TONE_CLASS[tone]}`} />
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Calendar grid ── */}
      <div className="overflow-hidden rounded-xl border border-[#edeff3] bg-white">
        {/* Day-of-week header */}
        <div className="grid grid-cols-7 border-b border-[#edeff3]">
          {DAYS.map((d) => (
            <div key={d} className="px-3 py-2 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        {loading ? (
          <div className="py-16 text-center text-sm text-muted-foreground animate-pulse">
            Loading bookings…
          </div>
        ) : (
          <div className="grid grid-cols-7" style={{ gridTemplateRows: `repeat(${rows}, minmax(6.5rem, 1fr))` }}>
            {Array.from({ length: rows * 7 }).map((_, i) => {
              const day = i - offset + 1;
              const out = day < 1 || day > total;
              const isToday = day === todayDay;
              const dayEvents = events.filter((e) => e.day === day).slice(0, 3);
              const overflow  = events.filter((e) => e.day === day).length - 3;

              return (
                <div key={i}
                  className={[
                    "border-r border-b border-[#edeff3] p-1.5",
                    "[&:nth-child(7n)]:border-r-0",
                    out ? "bg-[#f9fafb]" : "",
                  ].join(" ")}
                >
                  {!out && (
                    <>
                      <div className={[
                        "mb-1 flex size-7 items-center justify-center rounded-full font-mono text-[12px] select-none",
                        isToday ? "bg-[#f0343c] text-white font-bold" : "text-[#1b2440]",
                      ].join(" ")}>
                        {day}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {dayEvents.map((e, ei) => (
                          <div key={ei}
                            className={`truncate rounded border px-1.5 py-0.5 text-[10px] leading-tight ${TONE_CLASS[e.tone]}`}>
                            {e.title}
                          </div>
                        ))}
                        {overflow > 0 && (
                          <div className="px-1 font-mono text-[10px] text-muted-foreground">
                            +{overflow} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Empty state hint ── */}
      {!loading && events.length === 0 && (
        <p className="mt-4 text-center text-[13px] text-muted-foreground">
          No bookings found for {MONTH_NAMES[month]} {year}.{" "}
          <span className="text-[#f0343c]">Create a booking to see it here.</span>
        </p>
      )}
    </div>
  );
}
