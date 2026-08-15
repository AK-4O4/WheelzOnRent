// =============================================================================
// components/dash/drivers-screen.tsx
// Dashboard Drivers screen — rebuilt with ShadCN + Tailwind.
// =============================================================================
import { drivers, driverSchedule } from "./data";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon } from "@/assets/svg";

export function DriversScreen() {
  return (
    <div className="p-6 flex gap-5">

      {/* ── Drivers table ── */}
      <Card className="flex-1 min-w-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-56">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input placeholder="Search a driver" className="pl-9 h-9 text-sm" />
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white gap-1.5">
              <PlusIcon className="w-3.5 h-3.5" />
              Add Driver
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {/* Column headers */}
          <div className="grid grid-cols-[1.8fr_1.8fr_1fr_0.9fr] gap-3 px-5 pb-3 border-b border-slate-100">
            {["Name", "Email", "Phone", "Status"].map((h) => (
              <span key={h} className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
            ))}
          </div>
          {/* Rows */}
          {drivers.map((d) => (
            <div
              key={d.email}
              className="grid grid-cols-[1.8fr_1.8fr_1fr_0.9fr] gap-3 px-5 py-3 items-center border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                <span className="text-sm font-semibold text-slate-800 truncate">{d.name}</span>
              </div>
              <span className="text-sm text-slate-500 truncate">{d.email}</span>
              <span className="text-sm text-slate-500 tabular-nums">{d.phone}</span>
              <StatusBadge status={d.status} color={d.statusColor} bg={d.statusBg} dot={d.statusDot} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Driver detail panel ── */}
      <Card className="w-72 shrink-0">
        <CardContent className="p-5">
          {/* Driver header */}
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/72?img=33" alt="Daniel Jackson" className="w-12 h-12 rounded-xl object-cover shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-900">Daniel Jackson</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                On trip
              </span>
            </div>
          </div>

          {/* Assigned unit */}
          <div className="bg-slate-50 rounded-xl px-3.5 py-3 mb-5">
            <p className="text-[11px] text-slate-400 mb-0.5">Assigned unit</p>
            <p className="text-sm font-semibold text-slate-800">Mercedes S-Class · KHI-909</p>
          </div>

          {/* Schedule */}
          <CardTitle className="text-sm mb-3">Schedule</CardTitle>
          <div className="flex flex-col gap-3">
            {driverSchedule.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-0.5 rounded-full shrink-0" style={{ background: s.color }} />
                <div>
                  <p className="text-[11px] text-slate-400 tabular-nums">{s.time}</p>
                  <p className="text-sm font-semibold text-slate-800">{s.client}</p>
                  <p className="text-xs text-slate-500">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
