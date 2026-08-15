// =============================================================================
// components/dash/status-badge.tsx
// Shared status badge — now uses ShadCN Badge under the hood.
// =============================================================================
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  color: string;
  bg: string;
  dot: string;
}

export function StatusBadge({ status, color, bg, dot }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap rounded-full border-0"
      style={{ color, backgroundColor: bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: dot }}
      />
      {status}
    </Badge>
  );
}
