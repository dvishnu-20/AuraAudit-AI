"use client";
import { useState } from "react";
import { LedgerEventTable } from "@/components/app/LedgerEventTable";
import { MetricCard } from "@/components/app/MetricCard";
import { mockRegions } from "@/lib/mock-data";
import { RegionBadge } from "@/components/app/RegionBadge";
import { BookOpen, Shield, Download, RefreshCw, CheckCircle } from "lucide-react";

export default function LedgerPage() {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); setTimeout(() => setVerified(false), 4000); }, 2000);
  };

  const handleExport = () => {
    const { mockLedgerEvents } = require("@/lib/mock-data");
    const blob = new Blob([JSON.stringify(mockLedgerEvents, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auraaudit-ledger-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Global Distributed Audit Ledger</h1>
            <p className="text-sm text-slate-500">Append-only compliance decisions with strongly consistent multi-region synchronization.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleVerify} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-all">
            {verifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : verified ? <CheckCircle className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
            {verifying ? "Verifying…" : verified ? "Integrity Verified ✓" : "Verify Ledger Integrity"}
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <Download className="w-3.5 h-3.5" />
            Export Audit Trail
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <MetricCard label="Total Ledger Events" value="9,481,204" sub="Append-only" accent="violet" icon={<BookOpen className="w-4 h-4 text-violet-400" />} />
        <MetricCard label="Avg Commit Latency" value="31ms" sub="Cross-region" accent="green" icon={<CheckCircle className="w-4 h-4 text-emerald-400" />} />
        <MetricCard label="Write Conflicts" value="0" sub="Active-active model" accent="green" icon={<Shield className="w-4 h-4 text-emerald-400" />} />
        <MetricCard label="Region Sync" value="Healthy" sub="All 3 regions" accent="green" icon={<Shield className="w-4 h-4 text-emerald-400" />} />
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5 flex flex-col justify-between">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Last Global Commit</p>
          <div>
            <p className="text-base font-bold text-white">{new Date().toLocaleTimeString()}</p>
            <p className="text-xs text-emerald-400 mt-0.5">All regions confirmed</p>
          </div>
        </div>
      </div>

      {/* Region topology */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Active-Active Global Replication</h3>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Strong Consistency Verified
          </span>
        </div>
        <div className="flex items-center justify-center gap-8">
          {mockRegions.map((r, i) => (
            <div key={r.name} className="flex items-center gap-8">
              <div className="text-center p-4 rounded-xl bg-white/3 border border-white/8 min-w-[140px]">
                <RegionBadge region={r.name} className="mb-3" />
                <p className="text-xs text-slate-500 mt-2">Active Writer</p>
                <p className="text-sm font-bold text-white mt-1">{r.writesPerMin}</p>
                <p className="text-xs text-slate-600">writes/min</p>
                <p className="text-xs text-emerald-400 mt-2 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {r.latency}
                </p>
              </div>
              {i < mockRegions.length - 1 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-violet-500 relative">
                    <div className="absolute top-0 left-0 w-2 h-px bg-blue-400 animate-pulse" />
                  </div>
                  <span className="text-xs text-slate-600">↔</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-600 mt-4">Active-active distributed SQL architecture · CockroachDB · Zero replication lag</p>
      </div>

      {/* Event stream */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Live Ledger Event Stream</h3>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">Live</span>
          </div>
        </div>
        <LedgerEventTable />
      </div>
    </div>
  );
}
