// =============================================================================
// components/dash/bookings-screen.tsx
// Bookings management screen — rebuilt with ShadCN Card, Table, Input, Button.
// =============================================================================
import { bookingStats, bookingRows } from "@/data/placeholders/dashboard.placeholders";
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

// ── Component ─────────────────────────────────────────────────────────────────

export function BookingsScreen() {
  const headers = ["Rent ID", "Date", "Client", "Car", "Days", "Pickup", "Dropoff", "Price", "Status"];

  return (
    <div className="p-7 pb-10 flex flex-col gap-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {bookingStats.map((s) => (
          <Card key={s.label} className="border-[#edeff3] shadow-none">
            <CardContent className="flex items-center gap-3.5 pt-5">
              <span
                className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: s.bg }}
              >
                <StatIcon icon={s.icon} color={s.color} />
              </span>
              <div>
                <p className="text-[22px] font-extrabold tabular-nums leading-none mb-0.5">
                  {s.value}
                </p>
                <p className="text-[13px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bookings table */}
      <Card className="border-[#edeff3] shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-[16px] font-bold">Car Bookings</CardTitle>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <Input
                  placeholder="Search bookings"
                  className="pl-8 h-9 text-[13px] w-[180px] border-[#edeff3] focus-visible:ring-1"
                />
              </div>
              <Button
                size="sm"
                className="bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold h-9 rounded-[10px]"
                id="dash-add-booking-btn"
              >
                Add Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#f1f3f7]">
                {headers.map((h) => (
                  <TableHead
                    key={h}
                    className={`text-[11px] font-bold text-muted-foreground uppercase tracking-wide ${h === "Price" ? "text-right" : ""}`}
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingRows.map((r) => (
                <TableRow key={r.id} className="border-[#f5f6f8] hover:bg-[#fafbfc]">
                  <TableCell className="text-[13px] font-semibold text-[#5b6478] tabular-nums">
                    {r.id}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#5b6478] tabular-nums">
                    {r.date}
                  </TableCell>
                  <TableCell className="text-[13px] font-semibold text-[#1b2440]">
                    {r.client}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#5b6478]">{r.car}</TableCell>
                  <TableCell className="text-[13px] text-[#5b6478] tabular-nums">
                    {r.days}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#5b6478] tabular-nums">
                    {r.pickup}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#5b6478] tabular-nums">
                    {r.dropoff}
                  </TableCell>
                  <TableCell className="text-[13px] font-bold tabular-nums text-right">
                    {r.price}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={r.status}
                      color={r.statusColor}
                      bg={r.statusBg}
                      dot={r.statusDot}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#f1f3f7]">
            <span className="text-[13px] text-muted-foreground">Results per page: 10</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-[30px] h-[30px] rounded-lg text-[13px] font-medium flex items-center justify-center transition-colors ${
                    n === 1
                      ? "bg-[#f0343c] text-white"
                      : "border border-[#edeff3] text-[#5b6478] hover:bg-slate-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="text-[13px] text-[#5b6478] px-2 hover:text-[#1b2440] transition-colors">
                Next →
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
