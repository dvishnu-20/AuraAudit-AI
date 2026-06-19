"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell, Search, Globe, ChevronDown, LogOut, User,
  Building2, CreditCard, Key, Bot, Zap
} from "lucide-react";
import { cn, regionColor } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Region } from "@/lib/mock-data";

const regions: Region[] = ["US East", "EU Central", "APAC Singapore", "Global"];

interface TopbarProps {
  onSearch?: () => void;
  onRunAudit?: () => void;
}

export function Topbar({ onSearch, onRunAudit }: TopbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<Region>("Global");
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between px-6 h-14 bg-[#0a0e1a] border-b border-white/5 shrink-0">
      {/* Left: Search */}
      <button
        onClick={onSearch}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-all text-sm w-64"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search vendors, events…</span>
        <kbd className="ml-auto text-xs text-slate-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
      </button>

      <div className="flex items-center gap-3">
        {/* Run Audit CTA */}
        <button
          onClick={onRunAudit}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20"
        >
          <Zap className="w-3.5 h-3.5" />
          Run Agentic Audit
        </button>

        {/* Region Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 transition-all text-sm"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedRegion}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
          {showRegionMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl bg-[#111827] border border-white/10 shadow-2xl z-50 py-1 overflow-hidden">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => { setSelectedRegion(r); setShowRegionMenu(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors",
                    r === selectedRegion ? "text-blue-400 bg-blue-500/10" : "text-slate-300 hover:bg-white/5"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-[#0a0e1a]" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 transition-all"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white text-xs font-semibold">
              {user?.avatar || "AS"}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-200 font-medium leading-none">{user?.name || "Demo User"}</span>
              <span className="text-[10px] text-slate-500 leading-none mt-0.5">{user?.organization || "ACME Corp"}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-[#111827] border border-white/10 shadow-2xl z-50 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm text-slate-200 font-medium">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              {[
                { label: "Profile", icon: User },
                { label: "Organization Settings", icon: Building2 },
                { label: "Billing", icon: CreditCard },
                { label: "API Keys", icon: Key },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <Icon className="w-4 h-4 text-slate-500" />
                  {label}
                </button>
              ))}
              <div className="border-t border-white/5 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
