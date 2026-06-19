"use client";
import { useState } from "react";
import { mockReports } from "@/lib/mock-data";
import { BarChart3, Download, RefreshCw, FileText, CheckCircle, Loader2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const formatBadge = (f: string) => {
  const colors = { PDF: "bg-red-500/10 text-red-400 border-red-500/20", CSV: "bg-green-500/10 text-green-400 border-green-500/20", JSON: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
  return colors[f as keyof typeof colors] || "bg-slate-500/10 text-slate-400";
};

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Set<string>>(new Set());

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => { setGenerating(null); setGenerated((g) => new Set(g).add(id)); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20">
          <BarChart3 className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Compliance Reports</h1>
          <p className="text-sm text-slate-500">Generate evidence-backed compliance exports for all frameworks and regions.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Report cards */}
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {mockReports.map((r) => (
            <div key={r.id} className="p-5 rounded-xl border border-white/8 bg-[#0d1117] flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-5 h-5 text-slate-400" />
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${formatBadge(r.format)}`}>{r.format}</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{r.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">{r.description}</p>
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-xs text-slate-600 mb-3">Last generated: {formatDateTime(r.lastGenerated)} · {r.size}</p>
                <button
                  onClick={() => handleGenerate(r.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/8 border border-white/8 text-slate-300 text-xs font-medium transition-all"
                >
                  {generating === r.id ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" />Generating…</>
                  ) : generated.has(r.id) ? (
                    <><CheckCircle className="w-3.5 h-3.5 text-emerald-400 " /><span className="text-emerald-400">Generated</span></>
                  ) : (
                    <><RefreshCw className="w-3.5 h-3.5" />Generate Report</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Report builder */}
        <div className="col-span-1 rounded-xl border border-white/8 bg-[#0d1117] p-5">
          <h3 className="text-sm font-medium text-white mb-4">Report Builder</h3>
          <div className="space-y-4">
            {[
              { label: "Region", options: ["All Regions", "US East", "EU Central", "APAC Singapore"] },
              { label: "Vendor Tier", options: ["All Tiers", "Tier 1", "Tier 2", "Tier 3"] },
              { label: "Framework", options: ["All Frameworks", "SOC2", "ISO27001", "GDPR", "HIPAA"] },
            ].map(({ label, options }) => (
              <div key={label}>
                <label className="text-xs text-slate-500 block mb-1">{label}</label>
                <select className="w-full px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all">
                  {options.map((o) => <option key={o} className="bg-slate-900">{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="text-xs text-slate-500 block mb-2">Date Range</label>
              <div className="flex gap-2">
                <input type="date" className="flex-1 px-2 py-1.5 text-xs bg-white/5 border border-white/8 rounded-lg text-slate-400 focus:outline-none focus:border-blue-500/50" defaultValue="2025-01-01" />
                <input type="date" className="flex-1 px-2 py-1.5 text-xs bg-white/5 border border-white/8 rounded-lg text-slate-400 focus:outline-none focus:border-blue-500/50" defaultValue="2025-01-19" />
              </div>
            </div>
            {[
              { label: "Include Ledger Events", id: "ledger" },
              { label: "Include AI Reasoning", id: "ai" },
              { label: "Include Human Approvals", id: "human" },
            ].map(({ label, id }) => (
              <div key={id} className="flex items-center justify-between">
                <label className="text-xs text-slate-400">{label}</label>
                <div className="w-8 h-4 rounded-full bg-blue-500 relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
                </div>
              </div>
            ))}
            <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-500 hover:to-violet-500 transition-all mt-2">
              <Download className="w-3.5 h-3.5 inline mr-2" />
              Generate Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
