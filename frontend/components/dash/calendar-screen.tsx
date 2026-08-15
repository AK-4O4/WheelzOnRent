// =============================================================================
// components/dash/calendar-screen.tsx
// Dashboard Calendar screen — rebuilt with ShadCN + Tailwind.
// =============================================================================
import { calHeaders, calRows } from "./data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const LEGEND = [
  { label: "Pickup", color: "#f0343c" },
  { label: "Return", color: "#3b53c4" },
  { label: "Service", color: "#12a05c" },
];

export function CalendarScreen() {
  return (
    <div className="p-6">
      <Card>
        {/* Header */}
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold">August 2026</span>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg" aria-label="Previous month">
                  <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg" aria-label="Next month">
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {LEGEND.map(({ label, color }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[3px] inline-block" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Calendar grid */}
          <div
            className="grid border border-slate-100 rounded-xl overflow-hidden"
            style={{ gridTemplateColumns: "70px repeat(5, 1fr)" }}
          >
            {/* Corner */}
            <div className="bg-slate-50 border-b border-slate-100" />

            {/* Day headers */}
            {calHeaders.map((h) => (
              <div
                key={h.day}
                className="p-3 text-center bg-slate-50 border-b border-l border-slate-100"
              >
                <p className="text-lg font-bold tabular-nums" style={{ color: h.color }}>{h.day}</p>
                <p className="text-[11px] text-slate-400">{h.name}</p>
              </div>
            ))}

            {/* Time rows */}
            {calRows.map((row) => (
              <>
                <div
                  key={row.time + "-label"}
                  className="p-2.5 text-[11px] text-slate-400 text-right tabular-nums border-b border-slate-50"
                >
                  {row.time}
                </div>
                {row.cells.map((cell, ci) => (
                  <div
                    key={ci}
                    className="min-h-16 border-b border-l border-slate-50 p-1"
                  >
                    {cell.has && (
                      <div
                        className="rounded-md px-2 py-1.5"
                        style={{ background: cell.bg, borderLeft: `3px solid ${cell.color}` }}
                      >
                        <p className="text-[11px] font-semibold" style={{ color: cell.color }}>{cell.title}</p>
                        <p className="text-[10px] text-slate-500">{cell.sub}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
