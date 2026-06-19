import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: ReactNode;
  accent?: "blue" | "red" | "amber" | "green" | "violet";
  className?: string;
}

const accentMap = {
  blue: "from-blue-500/10 to-transparent border-blue-500/20",
  red: "from-red-500/10 to-transparent border-red-500/20",
  amber: "from-amber-500/10 to-transparent border-amber-500/20",
  green: "from-emerald-500/10 to-transparent border-emerald-500/20",
  violet: "from-violet-500/10 to-transparent border-violet-500/20",
};

export function MetricCard({ label, value, sub, trend, trendValue, icon, accent = "blue", className }: MetricCardProps) {
  return (
    <div className={cn(
      "relative rounded-xl p-5 bg-gradient-to-br border overflow-hidden",
      accentMap[accent],
      "bg-[#0d1117]",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
        {icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
      <div className="flex items-center gap-2 mt-1">
        {sub && <p className="text-xs text-slate-500">{sub}</p>}
        {trend && trendValue && (
          <span className={cn("text-xs font-medium", trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400")}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "—"} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
