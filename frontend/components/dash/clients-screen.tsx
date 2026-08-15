// =============================================================================
// components/dash/clients-screen.tsx
// Clients management screen — rebuilt with ShadCN Card, Table, Input, Button.
// =============================================================================
import { clients } from "@/data/placeholders/dashboard.placeholders";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ClientsScreen() {
  const headers = ["Client", "Phone", "Address", "Payment Card", "Trips", "Action"];

  return (
    <div className="p-7 pb-10">
      <Card className="border-[#edeff3] shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <Input
                placeholder="Search a client"
                className="pl-8 h-9 text-[13px] w-[240px] border-[#edeff3] focus-visible:ring-1"
              />
            </div>
            <Button
              size="sm"
              className="bg-[#f0343c] hover:bg-[#d02b33] text-white font-bold h-9 rounded-[10px]"
              id="dash-add-client-btn"
            >
              Add Client
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#f1f3f7]">
                {headers.map((h) => (
                  <TableHead key={h} className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((c) => (
                <TableRow key={c.email} className="border-[#f5f6f8] hover:bg-[#fafbfc]">
                  <TableCell>
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.avatar}
                        alt=""
                        className="w-[34px] h-[34px] rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#1b2440] leading-none mb-0.5">
                          {c.name}
                        </p>
                        <p className="text-[12px] text-muted-foreground truncate">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] text-[#5b6478] tabular-nums">
                    {c.phone}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#5b6478]">{c.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <svg className="w-[26px] h-[18px]" viewBox="0 0 40 26" fill="none">
                        <rect width="40" height="26" rx="3" fill="#eef1fb" />
                        <rect x="6" y="8" width="9" height="6" rx="1" fill="#3b53c4" />
                      </svg>
                      <span className="text-[13px] text-[#5b6478]">•••• {c.card}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] font-semibold text-[#5b6478] tabular-nums">
                    {c.trips}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#f0343c] hover:text-[#d02b33] hover:bg-red-50 h-auto py-1 px-2 text-[13px] font-semibold"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
