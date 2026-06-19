import type { ReactNode } from "react";
import { Shield, Globe, BookOpen, Activity } from "lucide-react";

function AuthRightPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-10 bg-gradient-to-br from-[#060b18] via-[#0a1628] to-[#060b18]">
      {/* Product brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-white">LedgerGuard AI</span>
      </div>

      {/* Main visual */}
      <div className="space-y-4">
        {/* Ledger stream */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/8 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs text-slate-400 font-medium">Live Audit Ledger Stream</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto" />
          </div>
          {[
            { vendor: "CloudNova Systems", action: "SOC2 evidence expired", delta: "+18", region: "US East" },
            { vendor: "PacificPay Global", action: "Payment terms violation", delta: "+24", region: "APAC" },
            { vendor: "MedAxis DataWorks", action: "HIPAA controls verified", delta: "-15", region: "US East" },
          ].map((e, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <div>
                <p className="text-xs text-slate-300">{e.vendor}</p>
                <p className="text-xs text-slate-600 truncate">{e.action}</p>
              </div>
              <span className={`text-xs font-bold ${parseInt(e.delta) > 0 ? "text-red-400" : "text-emerald-400"}`}>{e.delta}</span>
            </div>
          ))}
        </div>

        {/* Region sync */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs text-slate-400 font-medium">Region Sync Status</span>
          </div>
          <div className="space-y-2">
            {[
              { name: "US East", latency: "18ms", color: "text-blue-400" },
              { name: "EU Central", latency: "24ms", color: "text-violet-400" },
              { name: "APAC Singapore", latency: "31ms", color: "text-cyan-400" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className={`text-xs ${r.color}`}>{r.name}</span>
                </div>
                <span className="text-xs text-slate-500">{r.latency} · Healthy</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI audit progress */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-slate-400 font-medium">AI Audit in Progress</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">CloudNova Systems — SOC2 Review</p>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
          </div>
          <p className="text-xs text-slate-600 mt-1.5">Mapping controls… 74%</p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {["SOC2", "ISO27001", "GDPR", "HIPAA", "Aurora DSQL"].map((b) => (
            <span key={b} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-slate-400">{b}</span>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-600 text-center">Protected enterprise workspace access · AI-assisted, not AI-autonomous</p>
    </div>
  );
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070b14] flex">
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
      <div className="w-[480px] shrink-0 border-l border-white/5">
        <AuthRightPanel />
      </div>
    </div>
  );
}
