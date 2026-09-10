"use client";
// =============================================================================
// components/dash/bookings-screen.tsx
// Bookings management screen — live data via useBookingsScreen hook.
// Search, status filter, pagination, and per-row status mutation all work.
// =============================================================================
import { useBookingsScreen } from "@/hooks/use-bookings-screen";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ClockIcon, CheckCircleIcon, CloseIcon } from "@/assets/svg";

// ── Stat icon helper ──────────────────────────────────────────────────────────

function StatIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === "check")    return <CheckCircleIcon className="w-5 h-5" style={{ color }} />;
  if (icon === "clock")    return <ClockIcon className="w-5 h-5" style={{ color }} />;
  if (icon === "x")        return <CloseIcon className="w-5 h-5" style={{ color }} />;
  return <CalendarIcon className="w-5 h-5" style={{ color }} />;
}

// ── Status cells config ───────────────────────────────────────────────────────

const STAT_CARDS = [
  { key: "confirmed", label: "Upcoming Bookings",  bg: "#eef1fb", color: "#3b53c4", icon: "calendar" },
  { key: "pending",   label: "Pending Bookings",   bg: "#fef2e6", color: "#e08e0b", icon: "clock"    },
  { key: "cancelled", label: "Cancelled Bookings", bg: "#fdecee", color: "#f0343c", icon: "x"        },
  { key: "completed", label: "Completed Bookings", bg: "#e9f8f0", color: "#12a05c", icon: "check"    },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; dot: string }> = {
  pending:   { color: "#e08e0b", bg: "#fef2e6", dot: "#e08e0b" },
  confirmed: { color: "#3b53c4", bg: "#eef1fb", dot: "#3b53c4" },
  ongoing:   { color: "#3b53c4", bg: "#eef1fb", dot: "#3b53c4" },
  completed: { color: "#12a05c", bg: "#e9f8f0", dot: "#12a05c" },
  cancelled: { color: "#e0403f", bg: "#fdecee", dot: "#e0403f" },
};

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "pending",   label: "Pending"   },
  { value: "confirmed", label: "Confirmed" },
  { value: "ongoing",   label: "Ongoing"   },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function BookingsScreen() {
  const {
    rows, stats, loading, error,
    search, setSearch,
    statusFilter, setStatusFilter,
    page, setPage, totalPages,
    changeStatus,
  } = useBookingsScreen();

  const headers = ["ID", "Date", "Client", "Vehicle", "Dates", "Amount", "Status", "Actions"];

  return (
    <div className="p-7 pb-10 flex flex-col gap-5">

      {/* ── Stat cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <Card key={s.key} className="border-[#edeff3] shadow-none">
            <CardContent className="flex items-center gap-3.5 pt-5">
              <span className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: s.bg }}>
                <StatIcon icon={s.icon} color={s.color} />
              </span>
              <div>
                <p className="text-[22px] font-extrabold tabular-nums leading-none mb-0.5">
                  {stats[s.key] ?? 0}
                </p>
                <p className="text-[13px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Bookings table ───────────────────────────────────────────────────── */}
      <Card className="border-[#edeff3] shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-[16px] font-bold">Car Bookings</CardTitle>
            <div className="flex items-center gap-2.5 flex-wrap">

              {/* Status filter tabs */}
              <div className="flex items-center gap-1 border border-[#edeff3] rounded-[10px] p-1 bg-[#f9fafb]">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => { setStatusFilter(f.value); setPage(1); }}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      statusFilter === f.value
                        ? "bg-white text-[#1b2440] shadow-sm"
                        : "text-muted-foreground hover:text-[#1b2440]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <Input
                  placeholder="Search by client name"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="pl-8 h-9 text-[13px] w-[200px] border-[#edeff3] focus-visible:ring-1"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0 pb-0">
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground animate-pulse">Loading bookings…</div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-red-500">{error}</div>
          ) : rows.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No bookings found. {statusFilter && <button onClick={() => setStatusFilter("")} className="text-[#f0343c] underline ml-1">Clear filter</button>}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-[#f1f3f7]">
                  {headers.map((h) => (
                    <TableHead key={h}
                      className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const s = STATUS_STYLE[r.status] ?? STATUS_STYLE.pending;
                  const isLive = "renterName" in r;
                  return (
                    <TableRow key={r.id} className="border-[#f5f6f8] hover:bg-[#fafbfc]">
                      <TableCell className="text-[12px] font-semibold text-[#5b6478] tabular-nums">
                        {isLive ? r.id.slice(0, 8) + "…" : (r as unknown as { id: string }).id}
                      </TableCell>
                      <TableCell className="text-[12px] text-[#5b6478] tabular-nums">
                        {isLive ? new Date(r.createdAt).toLocaleDateString() : (r as unknown as { date: string }).date}
                      </TableCell>
                      <TableCell className="text-[13px] font-semibold text-[#1b2440]">
                        {isLive ? r.renterName : (r as unknown as { client: string }).client}
                      </TableCell>
                      <TableCell className="text-[13px] text-[#5b6478]">
                        {isLive ? `${r.vehicleMake} ${r.vehicleModel} (${r.plateNumber})` : (r as unknown as { car: string }).car}
                      </TableCell>
                      <TableCell className="text-[12px] text-[#5b6478] tabular-nums whitespace-nowrap">
                        {isLive ? `${r.startDate} → ${r.endDate}` : (r as unknown as { pickup: string; dropoff: string }).pickup}
                      </TableCell>
                      <TableCell className="text-[13px] font-bold tabular-nums text-right">
                        {isLive ? `PKR ${Number(r.totalAmount).toLocaleString()}` : (r as unknown as { price: string }).price}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={r.status} color={s.color} bg={s.bg} dot={s.dot} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {r.status === "pending" && (
                            <>
                              <button onClick={() => changeStatus(r.id, "confirmed")}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e9f8f0] text-[#12a05c] hover:opacity-80">
                                ✓ Confirm
                              </button>
                              <button onClick={() => changeStatus(r.id, "cancelled")}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#fdecee] text-[#e0403f] hover:opacity-80">
                                ✕ Cancel
                              </button>
                            </>
                          )}
                          {r.status === "confirmed" && (
                            <button onClick={() => changeStatus(r.id, "ongoing")}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#eef1fb] text-[#3b53c4] hover:opacity-80">
                              Start
                            </button>
                          )}
                          {r.status === "ongoing" && (
                            <button onClick={() => changeStatus(r.id, "completed")}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e9f8f0] text-[#12a05c] hover:opacity-80">
                              Complete
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#f1f3f7]">
            <span className="text-[13px] text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-[13px] text-[#5b6478] px-2 hover:text-[#1b2440] disabled:opacity-40"
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const n = i + 1;
                return (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-[30px] h-[30px] rounded-lg text-[13px] font-medium flex items-center justify-center transition-colors ${
                      n === page ? "bg-[#f0343c] text-white" : "border border-[#edeff3] text-[#5b6478] hover:bg-slate-50"
                    }`}>
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="text-[13px] text-[#5b6478] px-2 hover:text-[#1b2440] disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
