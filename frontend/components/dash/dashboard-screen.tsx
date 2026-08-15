// =============================================================================
// components/dash/dashboard-screen.tsx
// Main dashboard overview screen — rebuilt with ShadCN Card, Table, Badge.
// Data comes from data/placeholders/dashboard.placeholders.ts
// =============================================================================
import {
  kpis, rentStatus, bars, carTypes, carBookingRows, reminders, activity,
} from "@/data/placeholders/dashboard.placeholders";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CreditCardIcon, CalendarIcon, CarIcon, UserCircleIcon,
  WrenchIcon, DollarIcon, ChatIcon,
} from "@/assets/svg";
import { cn } from "@/lib/utils";

// ── KPI Icon helper ───────────────────────────────────────────────────────────

function KpiIcon({ icon, color }: { icon: string; color: string }) {
  const cls = `w-5 h-5`;
  if (icon === "payment")  return <CreditCardIcon className={cls} style={{ color }} />;
  if (icon === "calendar") return <CalendarIcon className={cls} style={{ color }} />;
  if (icon === "car")      return <CarIcon className={cls} style={{ color }} />;
  return <UserCircleIcon className={cls} style={{ color }} />;
}

function ReminderIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === "wrench") return <WrenchIcon className="w-4.5 h-4.5" style={{ color }} />;
  if (icon === "dollar") return <DollarIcon className="w-4.5 h-4.5" style={{ color }} />;
  return <ChatIcon className="w-4.5 h-4.5" style={{ color }} />;
}

// ── KPI Cards ─────────────────────────────────────────────────────────────────

function KpiCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <Card key={k.label} className="border-[#edeff3] shadow-none">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-4">
              <span
                className="w-10 h-10 rounded-[11px] flex items-center justify-center"
                style={{ background: k.iconBg }}
              >
                <KpiIcon icon={k.icon} color={k.iconColor} />
              </span>
              <span
                className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ color: k.deltaColor, background: k.deltaBg }}
              >
                {k.deltaArrow} {k.delta}
              </span>
            </div>
            <p className="text-2xl font-extrabold tracking-tight tabular-nums mb-0.5">
              {k.value}
            </p>
            <p className="text-[13px] text-muted-foreground">{k.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Booking Summary Chart (SVG) ───────────────────────────────────────────────

function BookingSummaryChart() {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Booking Summary</CardTitle>
          <span className="text-xs font-semibold text-muted-foreground border border-[#edeff3] rounded-lg px-2.5 py-1.5">
            Last 9 Months ▾
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <svg viewBox="0 0 640 240" className="w-full h-48 block overflow-visible">
          <defs>
            <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0343c" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#f0343c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <line x1="0" y1="40"  x2="640" y2="40"  stroke="#f1f3f7" />
          <line x1="0" y1="100" x2="640" y2="100" stroke="#f1f3f7" />
          <line x1="0" y1="160" x2="640" y2="160" stroke="#f1f3f7" />
          <line x1="0" y1="220" x2="640" y2="220" stroke="#f1f3f7" />
          <path
            d="M32,150 C80,120 120,112 176,152 C220,186 214,96 248,94 C300,90 300,140 320,132 C360,122 360,64 392,64 C430,64 430,116 464,112 C500,108 500,80 536,84 C572,88 580,116 608,118 L608,220 L32,220 Z"
            fill="url(#lineFill)"
          />
          <path
            d="M32,150 C80,120 120,112 176,152 C220,186 214,96 248,94 C300,90 300,140 320,132 C360,122 360,64 392,64 C430,64 430,116 464,112 C500,108 500,80 536,84 C572,88 580,116 608,118"
            fill="none" stroke="#f0343c" strokeWidth={3} strokeLinecap="round"
          />
          <line x1="392" y1="64" x2="392" y2="220" stroke="#f0343c" strokeDasharray="4 4" strokeOpacity={0.35} />
          <circle cx={392} cy={64} r={6} fill="#fff" stroke="#f0343c" strokeWidth={3} />
          <g transform="translate(392,64)">
            <rect x="-46" y="-46" width="92" height="34" rx="8" fill="#1b2440" />
            <text x="0" y="-30" textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700} fontFamily="inherit">989 Bookings</text>
            <text x="0" y="-17" textAnchor="middle" fill="#c9cede" fontSize={10} fontFamily="inherit">PKR 1.6M revenue</text>
          </g>
        </svg>
        <div className="flex justify-between text-[11px] text-muted-foreground mt-1 px-3 tabular-nums">
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Rent Status Donut ─────────────────────────────────────────────────────────

function RentStatusDonut() {
  const pcts = [62, 25, 13];
  const colors = ['#f0343c', '#1b2440', '#e2e6ee'];
  let cumulative = 0;
  const segments = pcts.map((p, i) => {
    const start = cumulative / 100;
    cumulative += p;
    const end = cumulative / 100;
    return `${colors[i]} ${(start * 360).toFixed(1)}deg ${(end * 360).toFixed(1)}deg`;
  });
  const gradient = `conic-gradient(${segments.join(', ')})`;

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Rent Status</CardTitle>
          <span className="text-xs font-semibold text-muted-foreground border border-[#edeff3] rounded-lg px-2.5 py-1.5">
            This Week ▾
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center my-2">
          <div
            className="relative w-36 h-36 rounded-full"
            style={{ background: gradient }}
          >
            <div className="absolute inset-[22px] bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold tabular-nums">303</span>
              <span className="text-[11px] text-muted-foreground">Total rents</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 mt-2">
          {rentStatus.map((r) => (
            <div key={r.label} className="flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-[3px]" style={{ background: r.color }} />
                {r.label}
              </span>
              <span className="font-bold tabular-nums">{r.pct}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Bookings Overview Bar Chart ───────────────────────────────────────────────

function BookingsOverviewBars() {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Bookings Overview</CardTitle>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[2px] bg-[#1b2440] inline-block" />
              Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[2px] bg-[#f0343c] inline-block" />
              Peak
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-44">
          {bars.map((b) => (
            <div
              key={b.label}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
            >
              <div
                className="w-full max-w-5 rounded-t-[6px] rounded-b-[3px] transition-all"
                style={{ height: `${b.h}%`, background: b.color }}
              />
              <span className="text-[10px] text-muted-foreground tabular-nums">{b.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Car Types Progress Bars ───────────────────────────────────────────────────

function CarTypesBars() {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Car Types</CardTitle>
          <span className="text-xs font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            View all
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {carTypes.map((c) => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-semibold text-[#1b2440]">{c.name}</span>
              <span className="text-[13px] font-bold text-muted-foreground tabular-nums">
                {c.pct}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-[#f1f3f7] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.pct}%`, background: c.color }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Car Bookings Table ────────────────────────────────────────────────────────

function CarBookingsTable({ onBookings }: { onBookings: () => void }) {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Car Bookings</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookings}
            className="text-[#f0343c] hover:text-[#d02b33] hover:bg-red-50 text-xs font-semibold h-auto py-1.5"
          >
            See all bookings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="border-[#f1f3f7]">
              {['Rent ID', 'Date', 'Client', 'Car Model', 'Days', 'Price', 'Status'].map((h) => (
                <TableHead key={h} className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {carBookingRows.map((r) => (
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
                <TableCell className="text-[13px] font-bold tabular-nums">{r.price}</TableCell>
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
      </CardContent>
    </Card>
  );
}

// ── Car Availability Checker ──────────────────────────────────────────────────

function AvailabilityChecker() {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-[15px] font-bold">Car Availability</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Car type selector */}
        <div className="flex items-center gap-2.5 border border-[#edeff3] rounded-[11px] px-3.5 py-2.5 text-muted-foreground">
          <CarIcon className="w-4 h-4" />
          <span className="text-[13px] flex-1">Car type</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Date */}
        <div className="flex items-center gap-2.5 border border-[#edeff3] rounded-[11px] px-3.5 py-2.5">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-[13px] flex-1 text-[#1b2440] tabular-nums">17 August 2026</span>
        </div>
        {/* Time */}
        <div className="flex items-center gap-2.5 border border-[#edeff3] rounded-[11px] px-3.5 py-2.5">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" />
          </svg>
          <span className="text-[13px] flex-1 text-[#1b2440] tabular-nums">10:30 AM</span>
        </div>
        <Button
          className="w-full rounded-[11px] font-bold mt-0.5 bg-[#f0343c] hover:bg-[#d02b33]"
          id="dash-check-availability-btn"
        >
          Check availability
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Reminders Panel ───────────────────────────────────────────────────────────

function RemindersPanel() {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Reminders</CardTitle>
          <Button
            variant="outline"
            size="icon"
            className="h-[26px] w-[26px] rounded-lg border-[#edeff3] text-muted-foreground"
            aria-label="Add reminder"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        {reminders.map((rm, i) => (
          <div key={i} className="flex gap-3">
            <span
              className="w-[34px] h-[34px] rounded-[10px] shrink-0 flex items-center justify-center"
              style={{ background: rm.bg }}
            >
              <ReminderIcon icon={rm.icon} color={rm.color} />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-[#1b2440] leading-snug">{rm.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{rm.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Activity Feed ─────────────────────────────────────────────────────────────

function ActivityFeed() {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-[15px] font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[11px] font-bold text-muted-foreground uppercase mb-3">Today</p>
        <div className="flex flex-col gap-4">
          {activity.map((a, i) => (
            <div key={i} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-[13px] text-[#5b6478] leading-snug">
                  <strong className="text-[#1b2440]">{a.who}</strong> {a.what}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Dashboard Screen ─────────────────────────────────────────────────────

export function DashboardScreen({ onBookings }: { onBookings: () => void }) {
  return (
    <div className="flex gap-5 p-7 pb-10">
      {/* Left column */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        <KpiCards />
        <div className="grid grid-cols-[1.75fr_1fr] gap-5">
          <BookingSummaryChart />
          <RentStatusDonut />
        </div>
        <div className="grid grid-cols-[1.75fr_1fr] gap-5">
          <BookingsOverviewBars />
          <CarTypesBars />
        </div>
        <CarBookingsTable onBookings={onBookings} />
      </div>

      {/* Right column */}
      <div className="w-[300px] shrink-0 flex flex-col gap-5">
        <AvailabilityChecker />
        <RemindersPanel />
        <ActivityFeed />
      </div>
    </div>
  );
}
