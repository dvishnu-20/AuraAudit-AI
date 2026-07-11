"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell, Search, Globe, ChevronDown, LogOut, User,
  Building2, CreditCard, Key, Zap, X, CheckCircle,
  AlertTriangle, Info
} from "lucide-react";
import { cn, regionColor } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { mockVendors } from "@/lib/mock-data";
import { Region } from "@/lib/mock-data";

const regions: Region[] = ["US East", "EU Central", "APAC Singapore", "Global"];

const NOTIFICATIONS = [
  { id: 1, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", title: "Critical risk detected", body: "MedAxis HIPAA BAA expired 3 days ago", time: "2m ago" },
  { id: 2, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "Agent run completed", body: "CloudNova SOC2 audit — 4 ledger events written", time: "18m ago" },
  { id: 3, icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", title: "New ledger event", body: "EuroComply GDPR DPA signed — hash chained", time: "1h ago" },
];

interface TopbarProps {
  onSearch?: () => void;
  onRunAudit?: () => void;
}

// ── Command Palette ─────────────────────────────────────────────────────────
function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pages = [
    { name: "Dashboard", path: "/dashboard", desc: "Overview & KPIs" },
    { name: "Vendors", path: "/vendors", desc: "Vendor registry" },
    { name: "Documents", path: "/documents", desc: "Upload & extract" },
    { name: "Ledger", path: "/ledger", desc: "Immutable audit log" },
    { name: "Agents", path: "/agents", desc: "AI agent runs" },
    { name: "Risk Telemetry", path: "/risk-telemetry", desc: "Live risk signals" },
    { name: "Reports", path: "/reports", desc: "Compliance exports" },
    { name: "Region Sync", path: "/region-sync", desc: "Multi-region status" },
    { name: "Schemas", path: "/schemas", desc: "Compliance schemas" },
    { name: "Settings", path: "/settings", desc: "Configuration" },
  ];
  const vendors = mockVendors.filter((v) =>
    !query || v.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);
  const filteredPages = pages.filter((p) =>
    !query || p.name.toLowerCase().includes(query.toLowerCase())
  );

  const go = (path: string) => { router.push(path); onClose(); };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vendors, pages…" className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 focus:outline-none" />
          <button onClick={onClose} className="p-1 rounded hover:bg-white/8 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredPages.length > 0 && (
            <div>
              <p className="px-4 py-1.5 text-[10px] text-slate-600 uppercase tracking-wider font-medium">Pages</p>
              {filteredPages.map((p) => (
                <button key={p.path} onClick={() => go(p.path)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left">
                  <span className="text-sm text-slate-200">{p.name}</span>
                  <span className="text-xs text-slate-600">{p.desc}</span>
                </button>
              ))}
            </div>
          )}
          {vendors.length > 0 && (
            <div>
              <p className="px-4 py-1.5 text-[10px] text-slate-600 uppercase tracking-wider font-medium mt-1">Vendors</p>
              {vendors.map((v) => (
                <button key={v.id} onClick={() => go("/vendors")} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left">
                  <span className="text-sm text-slate-200">{v.name}</span>
                  <span className="text-xs text-slate-600">{v.region} · {v.riskLevel}</span>
                </button>
              ))}
            </div>
          )}
          {filteredPages.length === 0 && vendors.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-slate-600">No results for "{query}"</p>
          )}
        </div>
        <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-xs text-slate-600">
          <span>↵ Navigate</span><span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}

export function Topbar({ onSearch, onRunAudit }: TopbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<Region>("Global");
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [readNotifs, setReadNotifs] = useState<number[]>([]);

  const handleLogout = () => { logout(); router.push("/"); };
  const unread = NOTIFICATIONS.filter((n) => !readNotifs.includes(n.id)).length;

  const handleSearchClick = () => {
    if (onSearch) onSearch();
    else setShowSearch(true);
  };

  const profileActions = [
    { label: "Profile", icon: User, action: () => { router.push("/settings"); setShowUserMenu(false); } },
    { label: "Organization Settings", icon: Building2, action: () => { router.push("/settings"); setShowUserMenu(false); } },
    { label: "Billing", icon: CreditCard, action: () => { setShowUserMenu(false); } },
    { label: "API Keys", icon: Key, action: () => { setShowUserMenu(false); } },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-6 h-14 bg-[#0a0e1a] border-b border-white/5 shrink-0">
        {/* Left: Search */}
        <button
          onClick={handleSearchClick}
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
            <button onClick={() => { setShowRegionMenu(!showRegionMenu); setShowUserMenu(false); setShowNotifications(false); }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 transition-all text-sm">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedRegion}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
            {showRegionMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-xl bg-[#111827] border border-white/10 shadow-2xl z-50 py-1 overflow-hidden">
                {regions.map((r) => (
                  <button key={r} onClick={() => { setSelectedRegion(r); setShowRegionMenu(false); }} className={cn("w-full text-left px-4 py-2 text-sm transition-colors", r === selectedRegion ? "text-blue-400 bg-blue-500/10" : "text-slate-300 hover:bg-white/5")}>{r}</button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); setShowRegionMenu(false); setReadNotifs(NOTIFICATIONS.map((n) => n.id)); }}
              className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-[#0a0e1a]" />}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-xl bg-[#111827] border border-white/10 shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <p className="text-sm font-medium text-white">Notifications</p>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-500 hover:text-slate-300"><X className="w-3.5 h-3.5" /></button>
                </div>
                {NOTIFICATIONS.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 border-b border-white/5 last:border-0 cursor-pointer transition-colors">
                      <div className={cn("flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5", n.bg)}><Icon className={cn("w-3.5 h-3.5", n.color)} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                      </div>
                      <span className="text-[10px] text-slate-600 shrink-0">{n.time}</span>
                    </div>
                  );
                })}
                <div className="px-4 py-2.5 border-t border-white/5">
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all notifications →</button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); setShowRegionMenu(false); }} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 transition-all">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white text-xs font-semibold">{user?.avatar || "AS"}</div>
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
                {profileActions.map(({ label, icon: Icon, action }) => (
                  <button key={label} onClick={action} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    <Icon className="w-4 h-4 text-slate-500" />{label}
                  </button>
                ))}
                <div className="border-t border-white/5 mt-1 pt-1">
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors">
                    <LogOut className="w-4 h-4" />Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showSearch && <CommandPalette onClose={() => setShowSearch(false)} />}
    </>
  );
}
