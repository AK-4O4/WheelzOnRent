// =============================================================================
// components/dash/dashboard-screen.tsx
// Main dashboard overview — ALL data is live from the API.
// No placeholder / mock data anywhere. Empty states shown when DB is empty.
// =============================================================================
"use client";

import * as React from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Label, Pie, PieChart, XAxis, YAxis,
} from "recharts";
import { useDashboard } from "@/hooks/use-dashboard";
import {
  fetchReminders, markReminderDone, createReminder,
  fetchBookings, updateBookingStatus,
  fetchVehicles,
  type ReminderRow, type BookingRow, type VehicleTypeStat,
} from "@/lib/api";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CreditCardIcon, CalendarIcon, CarIcon, UserCircleIcon,
  WrenchIcon, DollarIcon, ChatIcon,
} from "@/assets/svg";

// ── KPI Icon ─────────────────────────────────────────────────────────────────

function KpiIcon({ icon, color }: { icon: string; color: string }) {
  const cls = "w-5 h-5";
  if (icon === "payment")  return <CreditCardIcon className={cls} style={{ color }} />;
  if (icon === "calendar") return <CalendarIcon   className={cls} style={{ color }} />;
  if (icon === "car")      return <CarIcon        className={cls} style={{ color }} />;
  return                          <UserCircleIcon className={cls} style={{ color }} />;
}

// ── KPI Cards ─────────────────────────────────────────────────────────────────

function KpiCards({ kpis, loading }: {
  kpis: { label: string; value: string; delta: string; deltaArrow: string;
          deltaColor: string; deltaBg: string; iconBg: string; iconColor: string; icon: string }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[0,1,2,3].map((i) => (
          <Card key={i} className="border-[#edeff3] shadow-none animate-pulse">
            <CardContent className="pt-5">
              <div className="w-10 h-10 rounded-[11px] bg-[#f1f3f7] mb-4" />
              <div className="h-7 w-24 bg-[#f1f3f7] rounded mb-1" />
              <div className="h-3 w-32 bg-[#f1f3f7] rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <Card key={k.label} className="border-[#edeff3] shadow-none">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-[11px] flex items-center justify-center"
                style={{ background: k.iconBg }}>
                <KpiIcon icon={k.icon} color={k.iconColor} />
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ color: k.deltaColor, background: k.deltaBg }}>
                {k.deltaArrow} {k.delta}
              </span>
            </div>
            <p className="text-2xl font-extrabold tracking-tight tabular-nums mb-0.5">{k.value}</p>
            <p className="text-[13px] text-muted-foreground">{k.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Booking Summary — Area Chart ──────────────────────────────────────────────

const bookingSummaryConfig = {
  bookings: { label: "Bookings", color: "#f0343c" },
} satisfies ChartConfig;

function BookingSummaryChart({ data }: { data: { month: string; bookings: number }[] }) {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Booking Summary</CardTitle>
          <span className="text-xs font-semibold text-muted-foreground border border-[#edeff3] rounded-lg px-2.5 py-1.5">
            Last 12 Months
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-48 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No booking data yet.</p>
          </div>
        ) : (
          <ChartContainer config={bookingSummaryConfig} className="h-48 w-full">
            <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="bookingFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f0343c" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#f0343c" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f3f7" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickFormatter={(v: string) => v.slice(0, 3)} />
              <YAxis hide />
              <ChartTooltip
                cursor={{ stroke: "#f0343c", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area dataKey="bookings" type="natural" fill="url(#bookingFill)"
                stroke="#f0343c" strokeWidth={2.5} dot={false}
                activeDot={{ r: 5, fill: "#f0343c", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

// ── Rent Status — Donut Chart ─────────────────────────────────────────────────

const rentStatusConfig = {
  value:      { label: "Rents" },
  "On hire":   { label: "On hire",  color: "#f0343c" },
  Pending:     { label: "Pending",  color: "#1b2440" },
  Cancelled:   { label: "Cancelled",color: "#e2e6ee" },
} satisfies ChartConfig;

function RentStatusDonut({ rentStats }: { rentStats: Record<string, number> }) {
  const ongoing   = rentStats.ongoing   ?? 0;
  const pending   = rentStats.pending   ?? 0;
  const cancelled = rentStats.cancelled ?? 0;
  const total = ongoing + pending + cancelled;

  const donutData = total === 0 ? [] : [
    { name: "On hire",  value: Math.round((ongoing   / total) * 100), fill: "#f0343c" },
    { name: "Pending",  value: Math.round((pending   / total) * 100), fill: "#1b2440" },
    { name: "Cancelled",value: Math.round((cancelled / total) * 100), fill: "#e2e6ee" },
  ];

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Rent Status</CardTitle>
          <span className="text-xs font-semibold text-muted-foreground border border-[#edeff3] rounded-lg px-2.5 py-1.5">
            All time
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <div className="h-[180px] flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-full border-4 border-[#f1f3f7] flex items-center justify-center">
              <span className="text-[11px] text-muted-foreground font-mono">0</span>
            </div>
            <p className="text-xs text-muted-foreground">No bookings yet</p>
          </div>
        ) : (
          <>
            <ChartContainer config={rentStatusConfig} className="mx-auto aspect-square max-h-[180px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={donutData} dataKey="value" nameKey="name"
                  innerRadius={52} outerRadius={72} strokeWidth={4} stroke="transparent">
                  <Label content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy}
                            className="fill-foreground text-2xl font-extrabold">{total}</tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20}
                            className="fill-muted-foreground text-[11px]">Total rents</tspan>
                        </text>
                      );
                    }
                  }} />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2.5 mt-2">
              {donutData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 rounded-[3px]" style={{ background: d.fill }} />
                    {d.name}
                  </span>
                  <span className="font-bold tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Bookings Overview — Bar Chart ─────────────────────────────────────────────

const barsChartConfig = { bookings: { label: "Bookings", color: "#1b2440" } } satisfies ChartConfig;

function BookingsOverviewBars({ monthly }: { monthly: { month: string; bookings: number }[] }) {
  if (monthly.length === 0) {
    return (
      <Card className="border-[#edeff3] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-[15px] font-bold">Bookings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-44 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No booking data yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxVal = Math.max(...monthly.map((d) => d.bookings), 1);
  const dataWithColor = monthly.map((d, i) => ({
    ...d,
    color: i === monthly.length - 1 || d.bookings === maxVal ? "#f0343c" : "#1b2440",
  }));

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Bookings Overview</CardTitle>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[2px] bg-[#1b2440] inline-block" /> Regular
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[2px] bg-[#f0343c] inline-block" /> Peak
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barsChartConfig} className="h-44 w-full">
          <BarChart data={dataWithColor} barSize={14}>
            <CartesianGrid vertical={false} stroke="#f1f3f7" />
            <XAxis dataKey="month" tickLine={false} axisLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af" }} tickMargin={6} />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="bookings" radius={[5, 5, 2, 2]}>
              {dataWithColor.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ── Vehicle Types — live progress bars ───────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  sedan:       "#f0343c",
  suv:         "#1b2440",
  hatchback:   "#3b53c4",
  truck:       "#12a05c",
  van:         "#e08e0b",
  convertible: "#8b5cf6",
  electric:    "#06b6d4",
  other:       "#94a3b8",
};

function VehicleTypeBars({ vehicleTypes }: { vehicleTypes: VehicleTypeStat[] }) {
  const fmt = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-[15px] font-bold">Vehicle Types</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {vehicleTypes.length === 0 ? (
          <p className="text-[13px] text-muted-foreground py-4 text-center">
            No vehicles listed yet.
          </p>
        ) : (
          vehicleTypes.map((v) => (
            <div key={v.type}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-semibold text-[#1b2440]">{fmt(v.type)}</span>
                <span className="text-[13px] font-bold text-muted-foreground tabular-nums">{v.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#f1f3f7] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${v.pct}%`, background: TYPE_COLORS[v.type] ?? "#94a3b8" }} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

// ── Recent Bookings Table — live, NO placeholder fallback ─────────────────────

const STATUS_STYLE: Record<string, { color: string; bg: string; dot: string }> = {
  pending:   { color: "#e08e0b", bg: "#fef2e6", dot: "#e08e0b" },
  confirmed: { color: "#3b53c4", bg: "#eef1fb", dot: "#3b53c4" },
  ongoing:   { color: "#3b53c4", bg: "#eef1fb", dot: "#3b53c4" },
  completed: { color: "#12a05c", bg: "#e9f8f0", dot: "#12a05c" },
  cancelled: { color: "#e0403f", bg: "#fdecee", dot: "#e0403f" },
};

function LiveBookingsTable({ onBookings }: { onBookings: () => void }) {
  const [rows,     setRows]     = React.useState<BookingRow[]>([]);
  const [loading,  setLoading]  = React.useState(true);
  const [updating, setUpdating] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchBookings({ limit: 5 })
      .then((r) => setRows(r.data))
      .catch(() => setRows([]))   // on error → empty, NOT fake data
      .finally(() => setLoading(false));
  }, []);

  async function handleStatus(id: string, status: string) {
    setUpdating(id);
    try {
      await updateBookingStatus(id, status);
      setRows((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    } finally {
      setUpdating(null);
    }
  }

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Recent Bookings</CardTitle>
          <Button variant="ghost" size="sm" onClick={onBookings}
            className="text-[#f0343c] hover:text-[#d02b33] hover:bg-red-50 text-xs font-semibold h-auto py-1.5">
            See all bookings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground animate-pulse">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Bookings created by renters will appear here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-[#f1f3f7]">
                {["ID", "Client", "Vehicle", "Dates", "Amount", "Status", "Action"].map((h) => (
                  <TableHead key={h} className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const s = STATUS_STYLE[r.status] ?? STATUS_STYLE.pending;
                return (
                  <TableRow key={r.id} className="border-[#f5f6f8] hover:bg-[#fafbfc]">
                    <TableCell className="text-[12px] font-semibold text-[#5b6478] tabular-nums">
                      {r.id.slice(0, 8)}…
                    </TableCell>
                    <TableCell className="text-[13px] font-semibold text-[#1b2440]">
                      {r.renterName}
                    </TableCell>
                    <TableCell className="text-[13px] text-[#5b6478]">
                      {r.vehicleMake} {r.vehicleModel}
                    </TableCell>
                    <TableCell className="text-[12px] text-[#5b6478] tabular-nums">
                      {r.startDate} → {r.endDate}
                    </TableCell>
                    <TableCell className="text-[13px] font-bold tabular-nums">
                      PKR {Number(r.totalAmount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} color={s.color} bg={s.bg} dot={s.dot} />
                    </TableCell>
                    <TableCell>
                      {r.status === "pending" && (
                        <div className="flex gap-1">
                          <button onClick={() => handleStatus(r.id, "confirmed")}
                            disabled={updating === r.id}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e9f8f0] text-[#12a05c] hover:opacity-80 disabled:opacity-40">
                            ✓
                          </button>
                          <button onClick={() => handleStatus(r.id, "cancelled")}
                            disabled={updating === r.id}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#fdecee] text-[#e0403f] hover:opacity-80 disabled:opacity-40">
                            ✕
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

// ── Availability Checker ──────────────────────────────────────────────────────

function AvailabilityChecker() {
  const [city,   setCity]   = React.useState("");
  const [date,   setDate]   = React.useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = React.useState<string | null>(null);
  const [loading,setLoading]= React.useState(false);

  async function check() {
    if (!city.trim()) { setResult("⚠️ Please enter a city."); return; }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetchVehicles({ city });
      setResult(res.count > 0
        ? `✅ ${res.count} vehicle${res.count !== 1 ? "s" : ""} available in ${city}`
        : `❌ No vehicles available in ${city} right now.`);
    } catch {
      setResult("⚠️ Could not check availability.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-[15px] font-bold">Car Availability</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <input type="text" placeholder="City (e.g. Karachi)" value={city}
          onChange={(e) => { setCity(e.target.value); setResult(null); }}
          className="w-full border border-[#edeff3] rounded-[11px] px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#f0343c]/20"
          id="avail-city" />
        <div className="flex items-center gap-2.5 border border-[#edeff3] rounded-[11px] px-3.5 py-2.5">
          <CalendarIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          <input type="date" value={date}
            onChange={(e) => { setDate(e.target.value); setResult(null); }}
            className="text-[13px] flex-1 bg-transparent border-none outline-none"
            id="avail-date" />
        </div>
        <Button onClick={check} disabled={loading}
          className="w-full rounded-[11px] font-bold bg-[#f0343c] hover:bg-[#d02b33]"
          id="dash-check-availability-btn">
          {loading ? "Checking…" : "Check availability"}
        </Button>
        {result && (
          <p className="text-[12px] text-center font-medium text-[#1b2440] bg-[#f4f5f7] rounded-lg px-3 py-2">
            {result}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ── Reminders Panel — live CRUD ───────────────────────────────────────────────

const ICON_BG: Record<string, { bg: string; color: string }> = {
  wrench:  { bg: "#fdecee", color: "#f0343c" },
  dollar:  { bg: "#eef1fb", color: "#3b53c4" },
  message: { bg: "#e9f8f0", color: "#12a05c" },
};

function ReminderIconEl({ icon }: { icon: string }) {
  const s = ICON_BG[icon] ?? ICON_BG.wrench;
  if (icon === "wrench")  return <WrenchIcon className="w-4 h-4" style={{ color: s.color }} />;
  if (icon === "dollar")  return <DollarIcon className="w-4 h-4" style={{ color: s.color }} />;
  return <ChatIcon className="w-4 h-4" style={{ color: s.color }} />;
}

function RemindersPanel() {
  const [items,    setItems]   = React.useState<ReminderRow[]>([]);
  const [loading,  setLoading] = React.useState(true);
  const [showForm, setShowForm]= React.useState(false);
  const [adding,   setAdding]  = React.useState(false);
  const [title,    setTitle]   = React.useState("");
  const [when,     setWhen]    = React.useState("");
  const [icon,     setIcon]    = React.useState("wrench");

  function load() {
    fetchReminders()
      .then((r) => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  React.useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !when) return;
    setAdding(true);
    try {
      await createReminder({ title, scheduledAt: when, icon });
      setTitle(""); setWhen(""); setIcon("wrench"); setShowForm(false);
      load();
    } finally { setAdding(false); }
  }

  async function done(id: string) {
    await markReminderDone(id);
    setItems((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Reminders</CardTitle>
          <button onClick={() => setShowForm((v) => !v)}
            className="w-6 h-6 rounded-lg border border-[#edeff3] flex items-center justify-center text-muted-foreground hover:bg-[#f4f5f7]"
            aria-label="Add reminder">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        {showForm && (
          <form onSubmit={submit} className="flex flex-col gap-2 p-3 bg-[#f9fafb] rounded-xl border border-[#edeff3]">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="text-[13px] border border-[#edeff3] rounded-lg px-3 py-2 focus:outline-none" />
            <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} required
              className="text-[13px] border border-[#edeff3] rounded-lg px-3 py-2 focus:outline-none" />
            <select value={icon} onChange={(e) => setIcon(e.target.value)}
              className="text-[13px] border border-[#edeff3] rounded-lg px-3 py-2 bg-white">
              <option value="wrench">🔧 Maintenance</option>
              <option value="dollar">💰 Finance</option>
              <option value="message">💬 Message</option>
            </select>
            <Button type="submit" disabled={adding} size="sm"
              className="bg-[#f0343c] hover:bg-[#d02b33] text-white rounded-lg font-bold">
              {adding ? "Saving…" : "Add reminder"}
            </Button>
          </form>
        )}
        {loading ? (
          <p className="text-[13px] text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-2">No pending reminders.</p>
        ) : (
          items.map((rm) => {
            const s = ICON_BG[rm.icon] ?? ICON_BG.wrench;
            return (
              <div key={rm.id} className="flex gap-3 group">
                <span className="w-[34px] h-[34px] rounded-[10px] shrink-0 flex items-center justify-center"
                  style={{ background: s.bg }}>
                  <ReminderIconEl icon={rm.icon} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1b2440] leading-snug line-clamp-2">{rm.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {new Date(rm.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
                <button onClick={() => done(rm.id)}
                  className="opacity-0 group-hover:opacity-100 text-[11px] text-[#12a05c] font-semibold transition-opacity shrink-0">
                  Done
                </button>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

// ── Activity Feed — live, NO placeholder fallback ─────────────────────────────

function ActivityFeed({ activity }: { activity: { who: string; avatar: string; what: string; time: string }[] }) {
  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-[15px] font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-4">
            No activity yet. Bookings will appear here once renters start using the platform.
          </p>
        ) : (
          <>
            <p className="text-[11px] font-bold text-muted-foreground uppercase mb-3">Latest</p>
            <div className="flex flex-col gap-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#5b6478] leading-snug">
                      <strong className="text-[#1b2440]">{a.who}</strong> {a.what}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main Dashboard Screen ─────────────────────────────────────────────────────

export function DashboardScreen({ onBookings }: { onBookings: () => void }) {
  const { kpis, monthly, activity, rentStats, vehicleTypes, loading } = useDashboard();

  return (
    <div className="flex gap-5 p-7 pb-10">
      {/* Left column */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        <KpiCards kpis={kpis} loading={loading} />

        <div className="grid grid-cols-[1.75fr_1fr] gap-5">
          <BookingSummaryChart data={monthly} />
          <RentStatusDonut rentStats={rentStats} />
        </div>

        <div className="grid grid-cols-[1.75fr_1fr] gap-5">
          <BookingsOverviewBars monthly={monthly} />
          <VehicleTypeBars vehicleTypes={vehicleTypes} />
        </div>

        <LiveBookingsTable onBookings={onBookings} />
      </div>

      {/* Right column */}
      <div className="w-[300px] shrink-0 flex flex-col gap-5">
        <AvailabilityChecker />
        <RemindersPanel />
        <ActivityFeed activity={activity} />
      </div>
    </div>
  );
}
