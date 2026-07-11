"use client";
import { useState } from "react";
import { mockAgentRuns, mockVendors } from "@/lib/mock-data";
import { Bot, Play, CheckCircle, Loader2, AlertCircle, Clock, Plus, X, ChevronRight } from "lucide-react";
import { formatDateTime, cn } from "@/lib/utils";

const agentCards = [
  { name: "Document Parser Agent", status: "running", task: "Parsing MedAxis HIPAA BAA", successRate: "98.2%", runtime: "2m 01s", tokens: "4,821" },
  { name: "Control Mapping Agent", status: "running", task: "Mapping ISO27001 controls for EuroComply", successRate: "96.7%", runtime: "1m 14s", tokens: "2,340" },
  { name: "Risk Scoring Agent", status: "idle", task: "Waiting for control map", successRate: "99.1%", runtime: "—", tokens: "—" },
  { name: "Regional Policy Agent", status: "idle", task: "Ready", successRate: "97.8%", runtime: "—", tokens: "—" },
  { name: "Ledger Writer Agent", status: "running", task: "Writing EVT-001 to CockroachDB", successRate: "100%", runtime: "0m 37s", tokens: "892" },
  { name: "Human Escalation Agent", status: "idle", task: "3 pending escalations", successRate: "100%", runtime: "—", tokens: "—" },
];

const statusIcon = (s: string) => {
  if (s === "running") return <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />;
  if (s === "completed") return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
  if (s === "failed") return <AlertCircle className="w-3.5 h-3.5 text-red-400" />;
  return <Clock className="w-3.5 h-3.5 text-slate-500" />;
};

// ── Start New Run Modal ──────────────────────────────────────────────────────
interface StartRunModalProps { onClose: () => void; onStarted: (runId: string) => void; }

function StartRunModal({ onClose, onStarted }: StartRunModalProps) {
  const [vendorId, setVendorId] = useState(mockVendors[0].id);
  const [pipeline, setPipeline] = useState("Full Compliance Audit");
  const [loading, setLoading] = useState(false);

  const PIPELINES = ["Full Compliance Audit", "SOC2 Type II Check", "ISO27001 Gap Analysis", "GDPR DPA Review", "HIPAA BAA Verification"];

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId }),
      });
      const data = await res.json();
      onStarted(data.runId || `RUN-${Math.floor(Math.random() * 9000 + 1000)}`);
    } catch {
      onStarted(`RUN-${Math.floor(Math.random() * 9000 + 1000)}`);
    } finally { setLoading(false); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <h2 className="text-base font-semibold text-white">Start New Agent Run</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Select Vendor</label>
            <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/60 transition-all">
              {mockVendors.map((v) => <option key={v.id} value={v.id} className="bg-slate-900">{v.name} ({v.region})</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Agent Pipeline</label>
            <select value={pipeline} onChange={(e) => setPipeline(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/60 transition-all">
              {PIPELINES.map((p) => <option key={p} className="bg-slate-900">{p}</option>)}
            </select>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <p className="text-xs text-blue-300">The agent will fetch the latest document, run AI analysis via Amazon Bedrock, and write a hash-chained event to the CockroachDB ledger.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 text-sm hover:bg-white/8 transition-all">Cancel</button>
            <button onClick={handleStart} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50">
              {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Starting…</> : <><Play className="w-3.5 h-3.5" />Start Run</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  return (
    <div onClick={onDone} className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111827] border border-white/10 shadow-2xl cursor-pointer">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-sm text-slate-200">{msg}</span>
    </div>
  );
}

export default function AgentsPage() {
  const [runs, setRuns] = useState(mockAgentRuns);
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const run = runs.find((r) => r.id === selectedRun);

  const handleStarted = (runId: string) => {
    const newRun = {
      id: runId,
      vendor: mockVendors[0].name,
      vendorId: mockVendors[0].id,
      trigger: "Manual — User Initiated",
      pipeline: ["Document Parser", "Control Mapping", "Risk Scoring", "Ledger Writer"],
      status: "running" as const,
      startedAt: new Date().toISOString(),
      duration: "—",
      ledgerWrites: 0,
      steps: [
        { step: 1, name: "Fetching vendor profile", status: "completed" as const, duration: "0.2s", output: "Vendor data retrieved from CockroachDB" },
        { step: 2, name: "Document analysis via Bedrock", status: "running" as const, duration: "—", output: "Invoking Claude 3.5 Sonnet…" },
      ],
    };
    setRuns((prev) => [newRun as typeof prev[0], ...prev]);
    setToast(`Agent run ${runId} started successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Agentic Compliance Runs</h1>
            <p className="text-sm text-slate-500">Monitor AI agent pipelines processing vendor compliance documents.</p>
          </div>
        </div>
        <button onClick={() => setShowStartModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-500/20">
          <Plus className="w-3.5 h-3.5" />
          Start New Agent Run
        </button>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-3 gap-4">
        {agentCards.map((a) => (
          <div key={a.name} className="p-4 rounded-xl border border-white/8 bg-[#0d1117]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">{statusIcon(a.status)}<span className="text-sm font-medium text-white">{a.name}</span></div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", a.status === "running" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-slate-500 bg-slate-500/10 border-slate-500/20")}>{a.status}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3 truncate">{a.task}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><p className="text-slate-600">Success Rate</p><p className="text-slate-300 font-medium">{a.successRate}</p></div>
              <div><p className="text-slate-600">Runtime</p><p className="text-slate-300 font-medium">{a.runtime}</p></div>
              <div><p className="text-slate-600">Tokens</p><p className="text-slate-300 font-medium">{a.tokens}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Runs table */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Agent Run History</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              {["Run ID", "Vendor", "Trigger", "Agent Pipeline", "Status", "Started At", "Duration", "Ledger Writes", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {runs.map((r) => (
              <tr key={r.id} onClick={() => setSelectedRun(r.id === selectedRun ? null : r.id)} className={cn("hover:bg-white/3 cursor-pointer transition-colors", r.id === selectedRun && "bg-blue-500/5")}>
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{r.id}</td>
                <td className="px-4 py-3 text-slate-200 text-xs font-medium">{r.vendor}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{r.trigger}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {r.pipeline.slice(0, 3).map((p) => <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{p.split(" ")[0]}</span>)}
                    {r.pipeline.length > 3 && <span className="text-xs text-slate-600">+{r.pipeline.length - 3}</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">{statusIcon(r.status)}<span className={cn("text-xs", r.status === "completed" ? "text-emerald-400" : r.status === "running" ? "text-blue-400" : "text-red-400")}>{r.status}</span></div>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDateTime(r.startedAt)}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{r.duration}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{r.ledgerWrites}</td>
                <td className="px-4 py-3"><ChevronRight className={cn("w-3.5 h-3.5 text-slate-600 transition-transform", r.id === selectedRun && "rotate-90 text-blue-400")} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step trace */}
      {run && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-medium text-blue-300">Run Trace — {run.id} · {run.vendor}</h3>
            </div>
            <button onClick={() => setSelectedRun(null)} className="p-1 rounded hover:bg-white/8 text-slate-500"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-2">
            {run.steps.map((step) => (
              <div key={step.step} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold shrink-0 mt-0.5">{step.step}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">{statusIcon(step.status)}<p className="text-sm text-slate-200 font-medium">{step.name}</p><span className="ml-auto text-xs text-slate-600">{step.duration}</span></div>
                  <p className="text-xs text-slate-500 mt-0.5">{step.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showStartModal && <StartRunModal onClose={() => setShowStartModal(false)} onStarted={handleStarted} />}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
