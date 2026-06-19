import { cn, riskBg } from "@/lib/utils";

interface RiskBadgeProps {
  level: string;
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const label = level === "compliant" ? "Compliant" : level.charAt(0).toUpperCase() + level.slice(1);
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border", riskBg(level), className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", {
        "bg-red-400": level === "critical",
        "bg-orange-400": level === "high",
        "bg-amber-400": level === "medium",
        "bg-blue-400": level === "low",
        "bg-emerald-400": level === "compliant",
      })} />
      {label}
    </span>
  );
}
