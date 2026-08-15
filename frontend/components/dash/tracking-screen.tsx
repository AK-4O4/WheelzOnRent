// =============================================================================
// components/dash/tracking-screen.tsx
// Dashboard Tracking screen — rebuilt with ShadCN + Tailwind.
// =============================================================================
import { trackCars } from "./data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPinSolidIcon } from "@/assets/svg";

const LEGEND_ITEMS = [
  { color: "#12a05c", label: "Start point" },
  { color: "#f0343c", label: "Current location" },
  { color: "#1b2440", label: "Destination" },
];

const TRIP_STATS = [
  { label: "Start", value: "Aug 2, 10:30" },
  { label: "ETA", value: "Aug 3, 14:00" },
  { label: "Distance", value: "120 km", highlight: true },
];

export function TrackingScreen() {
  return (
    <div className="p-6 flex gap-5">

      {/* ── Car list sidebar ── */}
      <Card className="w-80 shrink-0">
        <CardContent className="p-4">
          <div className="relative mb-3.5">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input placeholder="Search a car" className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex flex-col gap-1.5 max-h-[560px] overflow-y-auto">
            {trackCars.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
                style={{ background: t.rowBg }}
              >
                <div className="w-[52px] h-[38px] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{t.client}</p>
                  <p className="text-[11px] text-slate-400 truncate">{t.car}</p>
                </div>
                <span className="text-[11px] font-semibold shrink-0" style={{ color: t.statusColor }}>{t.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Map panel ── */}
      <Card className="flex-1 min-w-0">
        <CardContent className="p-5">
          {/* Active trip header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/56?img=20" alt="Diana White" className="w-11 h-11 rounded-xl object-cover shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">Diana White</p>
                <p className="text-xs text-slate-400">Chevrolet Malibu · On trip</p>
              </div>
            </div>
            <div className="flex gap-5 text-right">
              {TRIP_STATS.map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-slate-400">{item.label}</p>
                  <p className={`text-sm font-semibold tabular-nums ${item.highlight ? "text-red-500" : "text-slate-800"}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stylised map */}
          <div className="relative h-[460px] rounded-2xl overflow-hidden bg-[#eef1f5]">
            <svg viewBox="0 0 800 460" className="w-full h-full block">
              <rect width="800" height="460" fill="#eef1f5" />
              <g stroke="#dbe0e8" strokeWidth={1}>
                <path d="M0 90 H800 M0 200 H800 M0 320 H800 M0 420 H800 M120 0 V460 M300 0 V460 M480 0 V460 M660 0 V460" />
              </g>
              <path
                d="M60 400 L200 360 L280 250 L460 210 L560 120 L720 70"
                fill="none" stroke="#1b2440" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx={60} cy={400} r={7} fill="#12a05c" stroke="#fff" strokeWidth={3} />
              <g transform="translate(560,120)">
                <circle r={14} fill="#f0343c" stroke="#fff" strokeWidth={3} />
                <path d="M-5 0 h10 M0 -5 v10" stroke="#fff" strokeWidth={2} />
              </g>
              <circle cx={720} cy={70} r={7} fill="#1b2440" stroke="#fff" strokeWidth={3} />
            </svg>

            {/* Legend */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex flex-col gap-1.5">
              {LEGEND_ITEMS.map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
