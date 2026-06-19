import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const now = Date.now();
  const diff = now - d.getTime();
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return formatDate(iso);
}

export function riskColor(level: string): string {
  switch (level) {
    case "critical": return "text-red-400";
    case "high": return "text-orange-400";
    case "medium": return "text-amber-400";
    case "low": return "text-blue-400";
    case "compliant": return "text-emerald-400";
    default: return "text-slate-400";
  }
}

export function riskBg(level: string): string {
  switch (level) {
    case "critical": return "bg-red-400/10 text-red-400 border-red-400/20";
    case "high": return "bg-orange-400/10 text-orange-400 border-orange-400/20";
    case "medium": return "bg-amber-400/10 text-amber-400 border-amber-400/20";
    case "low": return "bg-blue-400/10 text-blue-400 border-blue-400/20";
    case "compliant": return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
    default: return "bg-slate-400/10 text-slate-400 border-slate-400/20";
  }
}

export function statusBg(status: string): string {
  switch (status) {
    case "compliant": return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
    case "needs_review": return "bg-amber-400/10 text-amber-400 border-amber-400/20";
    case "non_compliant": return "bg-red-400/10 text-red-400 border-red-400/20";
    case "pending": return "bg-slate-400/10 text-slate-400 border-slate-400/20";
    default: return "bg-slate-400/10 text-slate-400 border-slate-400/20";
  }
}

export function regionColor(region: string): string {
  switch (region) {
    case "US East": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "EU Central": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "APAC Singapore": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    case "Global": return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}
