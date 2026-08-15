'use client'
// =============================================================================
// components/dash/units-screen.tsx
// Fleet management screen — rebuilt with ShadCN Card, Table, Button, Input.
// =============================================================================
import { useState } from 'react'
import { units, carFeatures, specs } from "@/data/placeholders/dashboard.placeholders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ── Unit card (grid view) ─────────────────────────────────────────────────────

function UnitCard({ u, onDetail }: { u: typeof units[0]; onDetail: () => void }) {
  return (
    <Card className="border-[#edeff3] shadow-none hover:shadow-lg hover:shadow-slate-200/60 transition-shadow">
      <CardContent className="p-[18px]">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[11px] text-muted-foreground">{u.brand}</p>
            <p className="text-[17px] font-bold leading-tight">{u.name}</p>
          </div>
          <div className="text-right">
            <p className="text-[17px] font-extrabold text-[#f0343c] tabular-nums">{u.price}</p>
            <p className="text-[11px] text-muted-foreground">/day</p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <Badge
            variant="outline"
            className="text-[10px] font-semibold border-0 rounded-full px-2.5 py-0.5"
            style={{ color: u.statusColor, background: u.statusBg }}
          >
            {u.status}
          </Badge>
          <Badge variant="outline" className="text-[10px] font-semibold bg-[#f4f5f7] text-[#5b6478] border-0 rounded-full px-2.5 py-0.5">
            {u.plate}
          </Badge>
        </div>

        <div className="h-[120px] rounded-xl overflow-hidden bg-[#f4f5f7] mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#5b6478] mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3" strokeLinecap="round" />
            </svg>
            {u.trans}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <circle cx="9" cy="7" r="3" />
              <path d="M3 20a6 6 0 0112 0" strokeLinecap="round" />
            </svg>
            {u.seats} seats
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {u.fuel}
          </span>
        </div>

        <Button
          onClick={onDetail}
          className="w-full bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold rounded-[10px]"
          size="sm"
        >
          Select Car
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Units screen ──────────────────────────────────────────────────────────────

export function UnitsScreen({ onDetail }: { onDetail: () => void }) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="p-7 pb-10">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <Input
              placeholder="Search car name, car ID"
              className="pl-8 h-9 text-[13px] w-[220px] border-[#edeff3]"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 border-[#edeff3] text-[#5b6478] text-[13px]">
            Car Type ▾
          </Button>
          <Button variant="outline" size="sm" className="h-9 border-[#edeff3] text-[#5b6478] text-[13px]">
            Status ▾
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Grid/List toggle */}
          <button
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={cn(
              "w-[38px] h-[38px] rounded-[10px] border flex items-center justify-center transition-colors",
              view === 'grid'
                ? "border-[#f0343c] bg-[#fdecee] text-[#f0343c]"
                : "border-[#edeff3] bg-white text-[#8a93a6] hover:border-slate-300"
            )}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            aria-label="List view"
            className={cn(
              "w-[38px] h-[38px] rounded-[10px] border flex items-center justify-center transition-colors",
              view === 'list'
                ? "border-[#f0343c] bg-[#fdecee] text-[#f0343c]"
                : "border-[#edeff3] bg-white text-[#8a93a6] hover:border-slate-300"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
            </svg>
          </button>
          <Button
            className="bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold rounded-[10px] h-9"
            size="sm"
            id="dash-add-unit-btn"
          >
            Add Unit
          </Button>
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-3 gap-[18px]">
          {units.map((u) => (
            <UnitCard key={u.plate} u={u} onDetail={onDetail} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <Card className="border-[#edeff3] shadow-none">
          <CardContent className="px-5 pt-2 pb-5">
            {units.map((u) => (
              <div
                key={u.plate}
                className="flex items-center gap-4 py-4 border-b border-[#f5f6f8] last:border-0 hover:bg-[#fafbfc] transition-colors"
              >
                <div className="w-24 h-[60px] rounded-[10px] overflow-hidden bg-[#f4f5f7] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-[150px]">
                  <p className="text-[11px] text-muted-foreground leading-none mb-0.5">{u.brand}</p>
                  <p className="text-[15px] font-bold leading-tight mb-1">{u.name}</p>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold border-0 rounded-full px-2 py-0"
                    style={{ color: u.statusColor, background: u.statusBg }}
                  >
                    {u.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-[#5b6478] w-[130px]">
                  <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path d="M12 3v3m0 12v3M3 12h3m12 0h3" strokeLinecap="round" />
                  </svg>
                  <div>
                    <p className="text-[10px] text-muted-foreground leading-none">Transmission</p>
                    {u.trans}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-[#5b6478] w-[110px]">
                  <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <circle cx="9" cy="7" r="3" />
                    <path d="M3 20a6 6 0 0112 0" strokeLinecap="round" />
                  </svg>
                  <div>
                    <p className="text-[10px] text-muted-foreground leading-none">Capacity</p>
                    {u.seats} seats
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-[17px] font-extrabold text-[#f0343c] tabular-nums">
                    {u.price} <span className="text-[11px] text-muted-foreground font-normal">/day</span>
                  </p>
                </div>
                <Button
                  onClick={onDetail}
                  size="sm"
                  className="bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold rounded-[9px] h-8 px-5"
                >
                  Select
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#edeff3] text-[#5b6478] font-semibold rounded-[9px] h-8 px-4"
                >
                  Edit
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Unit detail screen ────────────────────────────────────────────────────────

export function UnitDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-7 pb-10">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#5b6478] mb-4 h-auto py-1.5 px-2 hover:bg-slate-100"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Units
      </Button>

      <div className="grid grid-cols-[1.3fr_1fr] gap-5">
        {/* Left: Images + description */}
        <Card className="border-[#edeff3] shadow-none">
          <CardContent className="p-6">
            <div className="h-[280px] rounded-[14px] overflow-hidden bg-[#f4f5f7] mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80"
                alt="Audi A6"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 mb-6">
              {[
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&q=80',
                'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80',
                'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&q=80',
              ].map((src, i) => (
                <div key={i} className="flex-1 h-[72px] rounded-[10px] overflow-hidden bg-[#f4f5f7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[12px] text-muted-foreground">Sedan</p>
                <h2 className="text-[26px] font-extrabold leading-tight">Audi A6</h2>
              </div>
              <p className="text-[26px] font-extrabold text-[#f0343c] tabular-nums">
                PKR 5,000 <span className="text-[13px] text-muted-foreground font-normal">/day</span>
              </p>
            </div>
            <p className="text-[13px] text-[#5b6478] leading-relaxed">
              The Audi A6 is a luxurious mid-sized sedan, ideal for both daily commutes and extended journeys.
              Renowned for its poise, performance and advanced technology, it delivers a refined driving
              experience with exceptional comfort.
            </p>
          </CardContent>
        </Card>

        {/* Right: Activity + features + specs */}
        <div className="flex flex-col gap-5">
          {/* Activity mini-chart */}
          <Card className="border-[#edeff3] shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[15px] font-bold">Activity</CardTitle>
                <span className="text-[12px] font-semibold text-muted-foreground border border-[#edeff3] rounded-lg px-2.5 py-1">
                  Last Month ▾
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[24px] font-extrabold tabular-nums mb-2">
                489 <span className="text-[13px] text-muted-foreground font-medium">Km</span>
              </p>
              <svg viewBox="0 0 400 120" className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="uFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f0343c" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#f0343c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 C40,60 60,40 100,55 C140,70 160,30 200,42 C240,54 260,70 300,50 C340,32 360,60 400,48 L400,120 L0,120 Z"
                  fill="url(#uFill)"
                />
                <path
                  d="M0,80 C40,60 60,40 100,55 C140,70 160,30 200,42 C240,54 260,70 300,50 C340,32 360,60 400,48"
                  fill="none" stroke="#f0343c" strokeWidth={2.5}
                />
              </svg>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-[#edeff3] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-bold">Car Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {carFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[13px] text-[#5b6478]">
                    <svg className="w-3.5 h-3.5 text-[#12a05c] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.4}>
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specs */}
          <Card className="border-[#edeff3] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-bold">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {specs.map((s) => (
                  <div key={s.label}>
                    <p className="text-[11px] text-muted-foreground mb-0.5">{s.label}</p>
                    <p className="text-[14px] font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
