// =============================================================================
// components/dash/messages-screen.tsx
// Dashboard Messages screen — rebuilt with ShadCN + Tailwind.
// =============================================================================
import { conversations, thread } from "./data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ArrowRightIcon, PlusIcon } from "@/assets/svg";

export function MessagesScreen() {
  return (
    <div className="p-6">
      <Card className="flex overflow-hidden h-[640px]">

        {/* ── Conversation list ── */}
        <div className="w-[300px] shrink-0 border-r border-slate-100 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input placeholder="Search message" className="pl-9 h-9 text-sm" />
            </div>
            <Button size="icon" className="w-9 h-9 rounded-lg bg-red-500 hover:bg-red-600 shrink-0">
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
          {/* Conversation rows */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <div
                key={c.name}
                className="flex gap-3 px-4 py-3.5 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors"
                style={{ background: c.rowBg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                    <span className="text-[11px] text-slate-400 shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{c.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Chat thread ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Thread header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/48?img=13" alt="George Clark" className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">George Clark</p>
              <p className="text-[11px] text-emerald-600">● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/60 flex flex-col gap-4">
            {thread.map((m, i) => (
              <div key={i} className="flex" style={{ justifyContent: m.justify }}>
                <div
                  className="max-w-[70%] px-4 py-2.5 text-sm leading-relaxed"
                  style={{
                    background: m.bg,
                    color: m.color,
                    borderRadius: m.radius,
                  }}
                >
                  {m.text}
                  <span className="block text-[10px] mt-1.5 tabular-nums" style={{ color: m.timeColor }}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Compose bar */}
          <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3">
            <Input placeholder="Type a message" className="flex-1 rounded-xl h-11" />
            <Button size="icon" className="w-11 h-11 rounded-xl bg-red-500 hover:bg-red-600 shrink-0">
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
