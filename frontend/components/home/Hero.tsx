"use client";
import { Separator } from "@base-ui/react";
import { Calendar } from "@/components/ui/calendar";
import { useHeroSearch } from "@/hooks/use-hero-search";

export default function Hero() {
  const {
    dropMode, setDropMode,
    pickupCity, setPickupCity,
    dropoffCity, setDropoffCity,
    dateRange, setDateRange,
    calendarOpen, setCalendarOpen,
    calendarRef,
    dateLabel,
    handleSearch,
  } = useHeroSearch();

  return (
    <section
      className="relative overflow-hidden min-h-[91dvh] flex flex-col content-center-safe justify-center m-2.5 rounded-4xl"
      data-purpose="hero-banner"
    >
      {/* Background: hero.jpg with dark overlay */}
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ objectPosition: "60% center" }}
        src="hero.jpg"
      />
      {/* Dark gradient wash - darker on left, lighter on right (Artistic Asymmetry) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(2,30,60,0.92) 0%, rgba(2,50,90,0.80) 40%, rgba(14,100,160,0.50) 70%, rgba(14,165,233,0.15) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 w-full">
        {/* Category tabs */}
        {/* <div className="flex items-center gap-8 mb-10 text-sm font-medium text-white/60">
          <a href="#" className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Homes
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Experiences
          </a>
          
          <a href="/cars" className="flex items-center gap-1.5 text-white relative">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            Cars
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full" />
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white/90 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Flights
          </a>
        </div> */}

        {/* Search Card - preserved signature interaction */}
        <div className="max-w-3xl bg-white rounded-2xl shadow-2xl p-5 text-gray-800">
          {/* Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setDropMode("different")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${dropMode === "different"
                ? "bg-slate-900 text-white"
                : "text-slate-500 border border-slate-200 hover:border-slate-400"
                }`}
            >
              Different drop off
            </button>
            <button
              onClick={() => setDropMode("same")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${dropMode === "same"
                ? "bg-slate-900 text-white"
                : "text-slate-500 border border-slate-200 hover:border-slate-400"
                }`}
            >
              Same drop off
            </button>
          </div>

          <Separator />

          {/* Fields */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {/* Pick up */}
            <div className="flex-1 min-w-[160px] flex items-center gap-3 pr-4 border-r border-slate-200">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2a8 8 0 00-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 00-8-8z" />
              </svg>
              <div>
                <input
                  className="block w-full text-base font-semibold text-slate-800 placeholder-slate-700 outline-none bg-transparent leading-snug"
                  placeholder="Karachi, Lahore, Islamabad…"
                  type="text"
                  aria-label="Pick up location"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <span className="text-xs text-slate-400">Pick up location</span>
              </div>
            </div>

            {/* Drop off */}
            {dropMode === "different" && (
              <div className="flex-1 min-w-[160px] flex items-center gap-3 pr-4 border-r border-slate-200">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2a8 8 0 00-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 00-8-8z" />
                </svg>
                <div>
                  <input
                    className="block w-full text-base font-semibold text-slate-800 placeholder-slate-700 outline-none bg-transparent leading-snug"
                    placeholder="City or Airport"
                    type="text"
                    aria-label="Drop off location"
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}
                  />
                  <span className="text-xs text-slate-400">Drop off location</span>
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => setCalendarOpen((o) => !o)}
                className="flex items-center gap-3 pr-4 cursor-pointer text-left hover:opacity-80 transition-opacity"
                aria-label="Select date range"
                aria-expanded={calendarOpen}
              >
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <p className="text-base font-semibold text-slate-800 leading-snug">{dateLabel}</p>
                  <span className="text-xs text-slate-400">Pick up – Drop off</span>
                </div>
              </button>

              {/* Calendar popover */}
              {calendarOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3  bg-white rounded-2xl p-4">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      if (range?.from && range?.to) setCalendarOpen(false);
                    }}
                    numberOfMonths={2}
                  />
                </div>
              )}
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="ml-auto bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-sky-700 active:scale-[0.96] transition-all"
              aria-label="Search cars"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Headline - max 2 lines, Artistic Asymmetry: left-aligned */}
        <div className="max-w-175 mb-10">
          <h1
            className="text-white font-normal leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
            }}
          >
            Rent a car for <em className="italic font-normal">any</em> trip.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-[52ch] text-wrap-balance">
            Hundreds of verified vehicles across Pakistan, at prices that make sense.
          </p>
        </div>
      </div>
    </section>
  );
}
