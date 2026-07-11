"use client";
import { mockRegions, mockRegionSyncChecks } from "@/lib/mock-data";
import { RegionBadge } from "@/components/app/RegionBadge";
import { Globe, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegionSyncPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Globe className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Multi-Region Consistency Monitor</h1>
          <p className="text-sm text-slate-500">Active-active CockroachDB write topology with globally consistent compliance state.</p>
        </div>
      </div>

      {/* Region cards */}
      <div className="grid grid-cols-3 gap-5">
        {mockRegions.map((r) => (
          <div key={r.name} className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
            <div className="flex items-center justify-between mb-4">
              <RegionBadge region={r.name} />
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400">Active Writer</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Commit Latency", value: r.latency },
                { label: "Writes/min", value: r.writesPerMin },
                { label: "Current Load", value: r.workload },
                { label: "Schema Version", value: r.schemaVersion },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs text-emerald-400 font-medium">✓ Healthy · Zero lag</span>
            </div>
          </div>
        ))}
      </div>

      {/* Why CockroachDB */}
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 shrink-0">
            <Globe className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-sm font-semibold text-white">Why CockroachDB Matters</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">Active-active distributed SQL</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Vendor compliance events are written from multiple global regions while maintaining a single consistent ledger view. This enables cross-border compliance teams to operate without stale regional replicas or manual reconciliation. CockroachDB provides strongly consistent, distributed SQL with zero write conflicts across US East, EU Central, and APAC Singapore simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* Zero lag badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-emerald-400">Zero Replication Lag — Demo Mode</span>
        </div>
      </div>

      {/* Consistency checks */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Global Consistency Checks</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              {["Check ID", "Entity", "US East Value", "EU Central Value", "APAC Value", "Result"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockRegionSyncChecks.map((c) => (
              <tr key={c.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{c.id}</td>
                <td className="px-4 py-3 text-slate-200 text-xs font-medium">{c.entity}</td>
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{c.usValue}</td>
                <td className="px-4 py-3 font-mono text-xs text-violet-400">{c.euValue}</td>
                <td className="px-4 py-3 font-mono text-xs text-cyan-400">{c.apacValue}</td>
                <td className="px-4 py-3">
                  {c.result === "consistent" ? (
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs text-emerald-400">Consistent</span></div>
                  ) : (
                    <div className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-red-400" /><span className="text-xs text-red-400">Inconsistent</span></div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
