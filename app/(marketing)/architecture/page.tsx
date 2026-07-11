"use client";
import { useState } from "react";
import Link from "next/link";
import { Shield, Cpu, Database, Globe, BarChart3, Bot, FileText, ChevronRight } from "lucide-react";

const layers = [
  { id: "frontend", label: "Frontend Layer", color: "blue", items: ["Next.js App Router", "React + TypeScript", "Tailwind CSS + shadcn/ui", "Recharts + Framer Motion", "Deployed on Vercel"] },
  { id: "ai", label: "AI Agent Layer", color: "violet", items: ["Document Parser Agent", "Control Mapping Agent", "Risk Scoring Agent", "Regional Policy Validator", "Ledger Writer Agent", "Human Escalation Agent"] },
  { id: "data", label: "Data Layer", color: "cyan", items: ["CockroachDB", "Active-active multi-region", "Strongly consistent SQL", "Vendor registry", "Compliance schemas"] },
  { id: "audit", label: "Audit Layer", color: "emerald", items: ["Append-only ledger events", "Cryptographic hashing", "Event sequence numbers", "Region commit tracking", "Integrity verification"] },
  { id: "reporting", label: "Reporting Layer", color: "amber", items: ["Compliance report builder", "SOC2 gap reports", "GDPR cross-border reports", "Audit trail exports", "Executive summaries"] },
  { id: "regions", label: "Region Layer", color: "red", items: ["US East (Primary)", "EU Central (Active)", "APAC Singapore (Active)", "Global policy engine", "Cross-region consistency"] },
];

const pipeline = ["User Upload", "Document Parser", "Control Mapper", "Risk Engine", "Policy Validator", "Ledger Writer", "CockroachDB", "Report Generator"];

const scales = [100, 1000, 10000, 1000000];
const scaleLabels = ["100 vendors", "1K vendors", "10K vendors", "1M vendors"];

function computeMetrics(scaleIdx: number, regions: string[], humanApproval: boolean, ledgerVerify: boolean, continuousMonitoring: boolean) {
  const base = scales[scaleIdx];
  const regionMult = regions.length || 1;
  return {
    ledgerWrites: Math.round(base * 12 * regionMult * (ledgerVerify ? 1.2 : 1)).toLocaleString(),
    riskChecks: Math.round(base * 3 * regionMult * (continuousMonitoring ? 24 : 1)).toLocaleString(),
    agentRuns: Math.round(base * 0.1 * regionMult).toLocaleString(),
    multiRegionCommits: Math.round(base * 4 * regionMult).toLocaleString(),
    auditExport: `${Math.round(base * 0.05 * regionMult * (ledgerVerify ? 1.5 : 1))} MB`,
    humanQueue: Math.round(base * (humanApproval ? 0.05 : 0.01) * regionMult).toLocaleString(),
  };
}

export default function ArchitecturePage() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [scaleIdx, setScaleIdx] = useState(1);
  const [regions, setRegions] = useState(["US", "EU", "APAC"]);
  const [humanApproval, setHumanApproval] = useState(true);
  const [ledgerVerify, setLedgerVerify] = useState(true);
  const [continuousMonitoring, setContinuousMonitoring] = useState(true);

  const metrics = computeMetrics(scaleIdx, regions, humanApproval, ledgerVerify, continuousMonitoring);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-16 border-b border-white/5 bg-[#070b14]/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">LedgerGuard AI</span>
        </Link>
        <Link href="/dashboard" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium">Launch Dashboard</Link>
      </nav>

      <div className="py-16 px-8 max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Technical Architecture</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">A full-stack AI compliance platform built on globally distributed infrastructure with CockroachDB at its core.</p>
        </div>

        {/* Architecture layers */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">System Architecture Layers</h2>
          <div className="grid grid-cols-3 gap-4">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                className={`p-5 rounded-xl border text-left transition-all ${selectedLayer === layer.id ? `border-${layer.color}-500/40 bg-${layer.color}-500/5` : "border-white/8 bg-[#0d1117] hover:border-white/15"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold text-${layer.color === "blue" ? "blue" : layer.color === "violet" ? "violet" : layer.color === "cyan" ? "cyan" : layer.color === "emerald" ? "emerald" : layer.color === "amber" ? "amber" : "red"}-400`}>{layer.label}</h3>
                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${selectedLayer === layer.id ? "rotate-90" : ""}`} />
                </div>
                {selectedLayer === layer.id ? (
                  <ul className="space-y-1">
                    {layer.items.map((item) => <li key={item} className="text-xs text-slate-400 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-white/30" />{item}</li>)}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-600">{layer.items.length} components · click to expand</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline diagram */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Data Pipeline</h2>
          <div className="p-6 rounded-xl border border-white/8 bg-[#0d1117] overflow-x-auto">
            <div className="flex items-center gap-0 min-w-max mx-auto">
              {pipeline.map((stage, i) => (
                <div key={stage} className="flex items-center">
                  <div className={`px-4 py-3 rounded-xl border text-xs font-medium text-center min-w-[110px] ${i === 6 ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/8 bg-white/3 text-slate-300"}`}>
                    {stage}
                  </div>
                  {i < pipeline.length - 1 && (
                    <div className="flex items-center mx-1.5">
                      <div className="w-6 h-px bg-gradient-to-r from-blue-500/50 to-violet-500/50" />
                      <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[4px] border-transparent border-l-violet-500/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture Planner */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Interactive Architecture Planner</h2>
          <p className="text-sm text-slate-500 mb-6">Simulate how the system scales with your vendor count and configuration.</p>

          <div className="grid grid-cols-3 gap-6">
            {/* Controls */}
            <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5 space-y-5">
              <div>
                <label className="text-xs text-slate-500 block mb-3">Workload Scale</label>
                <input type="range" min={0} max={3} value={scaleIdx} onChange={(e) => setScaleIdx(Number(e.target.value))} className="w-full accent-blue-500" />
                <p className="text-sm font-semibold text-blue-400 mt-2">{scaleLabels[scaleIdx]}</p>
              </div>

              <div>
                <label className="text-xs text-slate-500 block mb-2">Active Regions</label>
                <div className="space-y-2">
                  {["US", "EU", "APAC", "Global"].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={regions.includes(r)}
                        onChange={() => setRegions(regions.includes(r) ? regions.filter(x => x !== r) : [...regions, r])}
                        className="w-3.5 h-3.5 accent-blue-500"
                      />
                      <span className="text-sm text-slate-300">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 block mb-2">Feature Toggles</label>
                <div className="space-y-2">
                  {[
                    { label: "Human approval required", value: humanApproval, set: setHumanApproval },
                    { label: "Ledger verification", value: ledgerVerify, set: setLedgerVerify },
                    { label: "Continuous monitoring", value: continuousMonitoring, set: setContinuousMonitoring },
                  ].map(({ label, value, set }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{label}</span>
                      <button onClick={() => set(!value)} className={`w-9 h-5 rounded-full relative transition-colors ${value ? "bg-blue-500" : "bg-slate-700"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? "right-0.5" : "left-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="col-span-2 rounded-xl border border-white/8 bg-[#0d1117] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Estimated Scale Metrics</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Daily Ledger Writes", value: metrics.ledgerWrites },
                  { label: "Risk Checks/Hour", value: metrics.riskChecks },
                  { label: "Agent Runs/Day", value: metrics.agentRuns },
                  { label: "Multi-Region Commits", value: metrics.multiRegionCommits },
                  { label: "Audit Export Size", value: metrics.auditExport },
                  { label: "Human Review Queue", value: metrics.humanQueue },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-white/3 border border-white/5">
                    <p className="text-xs text-slate-500 mb-1">{label}</p>
                    <p className="text-base font-bold text-white tabular-nums">{value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  `At this scale, LedgerGuard AI uses CockroachDB to coordinate globally consistent writes across ${regions.length || 1} active region${regions.length !== 1 ? "s" : ""}.`,
                  "The immutable audit ledger prevents regional drift in compliance decisions.",
                  humanApproval ? "Human approval is enabled — critical risk decisions require sign-off before ledger write." : "Human approval is disabled — all AI decisions are written directly to ledger.",
                  continuousMonitoring ? "Continuous monitoring is active — all vendors are checked in real time." : "Monitoring is periodic — risk signals are batched.",
                ].map((msg, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
