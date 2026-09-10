"use client";
// =============================================================================
// components/dash/expenses-screen.tsx
// Expenses screen — live data via useExpensesScreen hook.
// Add-expense form, stats cards, transaction table, breakdown chart,
// and monthly cashflow chart (income vs expenses).
// =============================================================================
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Legend, Pie, PieChart, Cell, Label } from "recharts";
import { useExpensesScreen } from "@/hooks/use-expenses-screen";
import { fetchCashflow, type CashflowPoint } from "@/lib/api";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { WrenchIcon, ShieldIcon, CreditCardIcon } from "@/assets/svg";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CAT_COLORS: Record<string, string> = {
  maintenance: "#f0343c",
  fuel:        "#3b53c4",
  insurance:   "#12a05c",
  office:      "#e08e0b",
  marketing:   "#8b5cf6",
  other:       "#94a3b8",
};

const STATUS_STYLE: Record<string, { color: string; bg: string; dot: string }> = {
  pending:   { color: "#e08e0b", bg: "#fef2e6", dot: "#e08e0b" },
  completed: { color: "#12a05c", bg: "#e9f8f0", dot: "#12a05c" },
};

function fmtPKR(n: number) {
  if (n >= 1_000_000) return `PKR ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `PKR ${(n / 1_000).toFixed(0)}K`;
  return `PKR ${n.toLocaleString()}`;
}

const STAT_DEFS = [
  { key: "totalExpenses", label: "Total Expenses", bg: "#eef1fb", color: "#3b53c4", icon: "payment" },
  { key: "maintenance",   label: "Maintenance",    bg: "#fef2e6", color: "#e08e0b", icon: "wrench"  },
  { key: "insurance",     label: "Insurance",      bg: "#e9f8f0", color: "#12a05c", icon: "shield"  },
];

function StatIcon({ icon, color }: { icon: string; color: string }) {
  const cls = "w-[22px] h-[22px]";
  if (icon === "wrench")  return <WrenchIcon className={cls} style={{ color }} />;
  if (icon === "shield")  return <ShieldIcon className={cls} style={{ color }} />;
  return <CreditCardIcon className={cls} style={{ color }} />;
}

// ── Breakdown Donut config ────────────────────────────────────────────────────

const donutConfig = { value: { label: "Amount" } } satisfies ChartConfig;

// ── Cashflow Chart ────────────────────────────────────────────────────────────

const cashflowConfig = {
  income:  { label: "Income",   color: "#12a05c" },
  expense: { label: "Expenses", color: "#f0343c" },
} satisfies ChartConfig;

function CashflowChart() {
  const [data,    setData]    = React.useState<CashflowPoint[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCashflow()
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="border-[#edeff3] shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[15px] font-bold">Cashflow</CardTitle>
          <span className="text-xs text-muted-foreground font-mono">Last 8 months</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-40 bg-[#f4f5f7] rounded-xl animate-pulse" />
        ) : data.length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-6">No cashflow data yet.</p>
        ) : (
          <>
            <ChartContainer config={cashflowConfig} className="h-40 w-full">
              <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#12a05c" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#12a05c" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f0343c" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f0343c" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f3f7" />
                <XAxis dataKey="month" tickLine={false} axisLine={false}
                  tick={{ fontSize: 10, fill: "#9ca3af" }} tickMargin={6} />
                <ChartTooltip
                  cursor={{ stroke: "#e2e6ee", strokeWidth: 1 }}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area dataKey="income" type="natural"
                  fill="url(#incomeGrad)" stroke="#12a05c" strokeWidth={2} dot={false}
                  activeDot={{ r: 4, fill: "#12a05c", stroke: "#fff", strokeWidth: 2 }}
                />
                <Area dataKey="expense" type="natural"
                  fill="url(#expenseGrad)" stroke="#f0343c" strokeWidth={2} dot={false}
                  activeDot={{ r: 4, fill: "#f0343c", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ChartContainer>
            <div className="flex justify-center gap-6 mt-2">
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="w-2 h-2 rounded-sm bg-[#12a05c]" /> Income
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="w-2 h-2 rounded-sm bg-[#f0343c]" /> Expenses
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ExpensesScreen() {
  const {
    rows, stats, loading, error,
    showAdd, setShowAdd,
    adding, addError,
    newExpense, setNewExpense,
    submitExpense,
  } = useExpensesScreen();

  // Build donut data from stats
  const donutData = React.useMemo(() => {
    if (!stats) return [];
    return stats.byCategory
      .filter((c) => c.total > 0)
      .map((c) => ({ name: c.category, value: c.total, fill: CAT_COLORS[c.category] ?? "#94a3b8" }));
  }, [stats]);

  const totalForDonut = donutData.reduce((s, d) => s + d.value, 0);

  // Stat card values
  const statValues: Record<string, number> = {
    totalExpenses: stats?.totalExpenses ?? 0,
    maintenance:   stats?.byCategory.find((c) => c.category === "maintenance")?.total ?? 0,
    insurance:     stats?.byCategory.find((c) => c.category === "insurance")?.total ?? 0,
  };

  const COLS = "2fr 1.4fr 0.7fr 0.9fr 1fr 0.9fr";
  const HEADERS = ["Expense", "Category", "Qty", "Amount", "Date", "Status"];

  return (
    <div className="p-6 flex gap-5">
      {/* ── Left column ───────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {STAT_DEFS.map((s) => (
            <Card key={s.key} className="border-[#edeff3] shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-10 h-10 rounded-[11px] flex items-center justify-center"
                    style={{ background: s.bg }}>
                    <StatIcon icon={s.icon} color={s.color} />
                  </span>
                </div>
                <p className="text-[22px] font-extrabold tabular-nums">
                  {loading ? "—" : fmtPKR(statValues[s.key] ?? 0)}
                </p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Expense form */}
        {showAdd && (
          <Card className="border-[#edeff3] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-bold">Add Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => { e.preventDefault(); submitExpense(); }}
                className="grid grid-cols-2 gap-3"
              >
                <input required placeholder="Expense name"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  className="col-span-2 border border-[#edeff3] rounded-[10px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#f0343c]/20"
                />
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="border border-[#edeff3] rounded-[10px] px-3 py-2 text-[13px] bg-white focus:outline-none"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="fuel">Fuel</option>
                  <option value="insurance">Insurance</option>
                  <option value="office">Office</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
                <input required type="number" min="1" placeholder="Amount (PKR)"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="border border-[#edeff3] rounded-[10px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#f0343c]/20"
                />
                <input type="number" min="1" placeholder="Qty"
                  value={newExpense.quantity}
                  onChange={(e) => setNewExpense({ ...newExpense, quantity: e.target.value })}
                  className="border border-[#edeff3] rounded-[10px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#f0343c]/20"
                />
                <input required type="date"
                  value={newExpense.expenseDate}
                  onChange={(e) => setNewExpense({ ...newExpense, expenseDate: e.target.value })}
                  className="border border-[#edeff3] rounded-[10px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#f0343c]/20"
                />
                <input placeholder="Notes (optional)"
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                  className="border border-[#edeff3] rounded-[10px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#f0343c]/20"
                />
                {addError && <p className="col-span-2 text-xs text-red-500">{addError}</p>}
                <div className="col-span-2 flex gap-2 justify-end">
                  <Button type="button" variant="ghost" size="sm"
                    onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button type="submit" size="sm" disabled={adding}
                    className="bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold rounded-[10px]">
                    {adding ? "Saving…" : "Add expense"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Transactions table */}
        <Card className="border-[#edeff3] shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <Button size="sm"
                onClick={() => setShowAdd((v) => !v)}
                className="bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold h-9 rounded-[10px]">
                {showAdd ? "Cancel" : "+ Add expense"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {loading ? (
              <div className="py-8 text-center text-sm text-muted-foreground animate-pulse">Loading…</div>
            ) : error ? (
              <div className="py-8 text-center text-sm text-red-500">{error}</div>
            ) : rows.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">No expenses recorded yet.</div>
            ) : (
              <>
                <div className="grid gap-3 px-5 pb-3 border-b border-slate-100"
                  style={{ gridTemplateColumns: COLS }}>
                  {HEADERS.map((h) => (
                    <span key={h} className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
                  ))}
                </div>
                {rows.map((t, i) => {
                  const s = STATUS_STYLE[t.status] ?? STATUS_STYLE.pending;
                  return (
                    <div key={i}
                      className="grid gap-3 px-5 py-3 items-center border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                      style={{ gridTemplateColumns: COLS }}>
                      <span className="text-sm font-semibold text-slate-800">{t.name}</span>
                      <span className="flex items-center gap-1.5 text-sm text-slate-500">
                        <span className="w-2 h-2 rounded-[3px] shrink-0"
                          style={{ background: CAT_COLORS[t.category] ?? "#94a3b8" }} />
                        {t.category}
                      </span>
                      <span className="text-sm text-slate-500 tabular-nums">{t.quantity}</span>
                      <span className="text-sm font-bold tabular-nums">
                        PKR {Number(t.amount).toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500 tabular-nums">{t.expenseDate}</span>
                      <StatusBadge status={t.status} color={s.color} bg={s.bg} dot={s.dot} />
                    </div>
                  );
                })}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Right: Cashflow + Breakdown Donut ───────────────────────────────────── */}
      <div className="w-72 shrink-0 flex flex-col gap-5">
        <CashflowChart />
        <Card className="border-[#edeff3] shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {donutData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No data yet.</p>
            ) : (
              <>
                <ChartContainer config={donutConfig} className="mx-auto aspect-square max-h-[200px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={donutData} dataKey="value" nameKey="name"
                      innerRadius={56} outerRadius={76} strokeWidth={4} stroke="transparent">
                      <Label content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy}
                                className="fill-foreground text-lg font-extrabold">
                                {fmtPKR(totalForDonut)}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 18}
                                className="fill-muted-foreground text-[10px]">Total</tspan>
                            </text>
                          );
                        }
                      }} />
                      {donutData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-col gap-2.5 mt-4">
                  {donutData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: d.fill }} />
                        {d.name}
                      </span>
                      <span className="font-bold tabular-nums">{fmtPKR(d.value)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
