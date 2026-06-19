"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Building2, FileText, GitBranch,
  Activity, BookOpen, Bot, Globe, BarChart3, Settings,
  ChevronLeft, ChevronRight, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/vendors", label: "Vendor Registry", icon: Building2 },
  { href: "/documents", label: "Document Intake", icon: FileText },
  { href: "/schemas", label: "Compliance Schema", icon: GitBranch },
  { href: "/risk-telemetry", label: "Risk Telemetry", icon: Activity },
  { href: "/ledger", label: "Global Audit Ledger", icon: BookOpen },
  { href: "/agents", label: "Agent Runs", icon: Bot },
  { href: "/region-sync", label: "Region Sync", icon: Globe },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-[#0a0e1a] border-r border-white/5 transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-white/5", collapsed && "justify-center px-2")}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-white tracking-tight">LedgerGuard AI</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group",
                active
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn("w-4 h-4 shrink-0", active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Bottom demo badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-white/5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Demo Mode Active</span>
          </div>
        </div>
      )}
    </aside>
  );
}
