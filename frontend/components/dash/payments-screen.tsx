// =============================================================================
// components/dash/payments-screen.tsx
// Dashboard Payments screen — rebuilt with ShadCN + Tailwind.
// =============================================================================
import { paymentStats, payments } from "./data";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon, ClockIcon, WrenchIcon } from "@/assets/svg";

const STAT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  check: ({ className }) => <CheckCircleIcon className={className} size={22} strokeWidth={1.9} />,
  clock: ({ className }) => <ClockIcon className={className} size={22} strokeWidth={1.9} />,
  wrench: ({ className }) => <WrenchIcon className={className} size={22} strokeWidth={1.9} />,
};

const COLS = "1fr 1.4fr 1.3fr 0.7fr 0.8fr 1fr 0.9fr";
const HEADERS = ["Invoice", "Client", "Car", "Days", "Amount", "Date", "Status"];

export function PaymentsScreen() {
  return (
    <div className="p-6 flex flex-col gap-5">

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {paymentStats.map((s) => {
          const Icon = STAT_ICONS[s.icon] ?? STAT_ICONS.wrench;
          return (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3.5">
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: s.bg }}
                >
                  <span style={{ color: s.color }}>
                    <Icon className="w-[22px] h-[22px]" />
                  </span>
                </span>
                <div>
                  <p className="text-sm text-slate-500">{s.label}</p>
                  <p className="text-2xl font-extrabold tabular-nums">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Payments table ── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Payments</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid gap-3 px-5 pb-3 border-b border-slate-100" style={{ gridTemplateColumns: COLS }}>
            {HEADERS.map((h) => (
              <span key={h} className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
            ))}
          </div>
          {payments.map((p) => (
            <div
              key={p.invoice}
              className="grid gap-3 px-5 py-3 items-center border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
              style={{ gridTemplateColumns: COLS }}
            >
              <span className="text-sm font-semibold text-slate-500 tabular-nums">{p.invoice}</span>
              <span className="text-sm font-semibold text-slate-800">{p.client}</span>
              <span className="text-sm text-slate-500">{p.car}</span>
              <span className="text-sm text-slate-500 tabular-nums">{p.days}</span>
              <span className="text-sm font-bold tabular-nums">{p.amount}</span>
              <span className="text-sm text-slate-500 tabular-nums">{p.date}</span>
              <StatusBadge status={p.status} color={p.statusColor} bg={p.statusBg} dot={p.statusDot} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
