// =============================================================================
// components/dash/expenses-screen.tsx
// Dashboard Expenses screen — rebuilt with ShadCN + Tailwind.
// =============================================================================
import { expenseStats, transactions, expenseBreakdown } from "./data";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WrenchIcon, ShieldIcon, CreditCardIcon } from "@/assets/svg";

const STAT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  wrench:  ({ className }) => <WrenchIcon className={className} size={22} strokeWidth={1.9} />,
  shield:  ({ className }) => <ShieldIcon className={className} size={22} strokeWidth={1.9} />,
  card:    ({ className }) => <CreditCardIcon className={className} size={22} strokeWidth={1.9} />,
};

const COLS = "2fr 1.4fr 0.7fr 0.9fr 1fr 0.9fr";
const HEADERS = ["Expense", "Category", "Qty", "Amount", "Date", "Status"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const BAR_COLORS = ["#f0343c", "#1b2440", "#3b53c4", "#e08e0b"];

export function ExpensesScreen() {
  // Compute donut segments
  const pcts = [42, 26, 18, 14];
  let cumulative = 0;
  const segments = pcts.map((p, i) => {
    const start = cumulative;
    cumulative += p;
    return `${BAR_COLORS[i]} ${start}% ${cumulative}%`;
  });

  return (
    <div className="p-6 flex gap-5">

      {/* ── Left column ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {expenseStats.map((s) => {
            const Icon = STAT_ICONS[s.icon] ?? STAT_ICONS.card;
            return (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3.5">
                    <span
                      className="w-10 h-10 rounded-[11px] flex items-center justify-center"
                      style={{ background: s.bg }}
                    >
                      <span style={{ color: s.color }}>
                        <Icon className="w-[22px] h-[22px]" />
                      </span>
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ color: s.deltaColor, background: s.deltaBg }}
                    >
                      {s.delta}
                    </span>
                  </div>
                  <p className="text-[22px] font-extrabold tabular-nums">{s.value}</p>
                  <p className="text-sm text-slate-400">{s.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cashflow chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Cashflow</CardTitle>
              <div className="flex items-center gap-3.5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-slate-800 inline-block" />
                  Income
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-red-500 inline-block" />
                  Expense
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <svg viewBox="0 0 640 200" className="w-full overflow-visible" style={{ height: 180 }}>
              <line x1="0" y1="50" x2="640" y2="50" stroke="#f1f3f7" />
              <line x1="0" y1="100" x2="640" y2="100" stroke="#f1f3f7" />
              <line x1="0" y1="150" x2="640" y2="150" stroke="#f1f3f7" />
              <path d="M20,120 C80,90 120,70 180,88 C240,106 280,60 340,72 C400,84 440,110 500,80 C560,52 600,86 620,74" fill="none" stroke="#1b2440" strokeWidth={2.5} />
              <path d="M20,150 C80,140 120,128 180,138 C240,148 280,120 340,130 C400,140 440,150 500,132 C560,116 600,140 620,128" fill="none" stroke="#f0343c" strokeWidth={2.5} />
            </svg>
            <div className="flex justify-between text-[11px] text-slate-400 px-3 tabular-nums">
              {MONTHS.map((m) => <span key={m}>{m}</span>)}
            </div>
          </CardContent>
        </Card>

        {/* Transactions table */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="grid gap-3 px-5 pb-3 border-b border-slate-100" style={{ gridTemplateColumns: COLS }}>
              {HEADERS.map((h) => (
                <span key={h} className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {transactions.map((t, i) => (
              <div
                key={i}
                className="grid gap-3 px-5 py-3 items-center border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                style={{ gridTemplateColumns: COLS }}
              >
                <span className="text-sm font-semibold text-slate-800">{t.name}</span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="w-2 h-2 rounded-[3px] shrink-0" style={{ background: t.catColor }} />
                  {t.category}
                </span>
                <span className="text-sm text-slate-500 tabular-nums">{t.qty}</span>
                <span className="text-sm font-bold tabular-nums">{t.amount}</span>
                <span className="text-sm text-slate-500 tabular-nums">{t.date}</span>
                <StatusBadge status={t.status} color={t.statusColor} bg={t.statusBg} dot={t.statusDot} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Right: Donut breakdown ── */}
      <div className="w-72 shrink-0">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Donut chart */}
            <div className="flex justify-center mb-5">
              <div
                className="relative w-36 h-36 rounded-full"
                style={{ background: `conic-gradient(${segments.join(", ")})` }}
              >
                <div className="absolute inset-[22px] bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-[11px] text-slate-400">This month</span>
                  <span className="text-lg font-extrabold tabular-nums">PKR 10K</span>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2.5">
              {expenseBreakdown.map((e) => (
                <div key={e.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: e.color }} />
                    {e.label}
                  </span>
                  <span className="font-bold tabular-nums">{e.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
