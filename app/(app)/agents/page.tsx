"use client";
import { useState } from "react";
import { mockAgentRuns } from "@/lib/mock-data";
import { Bot, Play, CheckCircle, Loader2, AlertCircle, Clock, Plus } from "lucide-react";
import { formatDateTime, cn } from "@/lib/utils";

const agentCards = [
  { name: "Document Parser Agent", status: "running", task: "Parsing MedAxis HIPAA BAA", successRate: "98.2%", runtime: "2m 01s", tokens: "4,821" },
  { name: "Control Mapping Agent", status: "running", task: "Mapping ISO27001 controls for EuroComply", successRate: "96.7%", runtime: "1m 14s", tokens: "2,340" },
  { name: "Risk Scoring Agent", status: "idle", task: "Waiting for control map", successRate: "99.1%", runtime: "—", tokens: "—" },
  { name: "Regional Policy Agent", status: "idle", task: "Ready", successRate: "97.8%", runtime: "—", tokens: "—" },
  { name: "Ledger Writer Agent", status: "running", task: "Writing EVT-001 to Aurora DSQL", successRate: "100%", runtime: "0m 37s", tokens: "892" },
  { name: "Human Escalation Agent", status: "idle", task: "3 pending escalations", successRate: "100%", runtime: "—", tokens: "—" },
];

const statusIcon = (s: string) => {
  if (s === "running") return <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />;
  if (s === "completed") return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
  if (s === "failed") return <AlertCircle className="w-3.5 h-3.5 text-red-400" />;
  return <Clock className="w-3.5 h-3.5 text-slate-500" />;
};

export default function AgentsPage() {
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const run = mockAgentRuns.find((r) => r.id === selectedRun);

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
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">
          <Plus className="w-3.5 h-3.5" />
          Start New Agent Run
        </button>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-3 gap-4">
        {agentCards.map((a) => (
          <div key={a.name} className="p-4 rounded-xl border border-white/8 bg-[#0d1117]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {statusIcon(a.status)}
                <span className="text-sm font-medium text-white">{a.name}</span>
              </div>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", a.status === "running" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-slate-500 bg-slate-500/10 border-slate-500/20")}>
                {a.status}
              </span>
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
              {["Run ID", "Vendor", "Trigger", "Agent Pipeline", "Status", "Started At", "Duration", "Ledger Writes"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockAgentRuns.map((run) => (
              <tr key={run.id} onClick={() => setSelectedRun(run.id === selectedRun ? null : run.id)} className="hover:bg-white/3 cursor-pointer transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{run.id}</td>
                <td className="px-4 py-3 text-slate-200 text-xs font-medium">{run.vendor}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{run.trigger}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {run.pipeline.slice(0, 3).map((p, i) => (
                      <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-500">{p.split(" ")[0]}</span>
                    ))}
                    {run.pipeline.length > 3 && <span className="text-xs text-slate-600">+{run.pipeline.length - 3}</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {statusIcon(run.status)}
                    <span className={cn("text-xs", run.status === "completed" ? "text-emerald-400" : run.status === "running" ? "text-blue-400" : "text-red-400")}>
                      {run.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDateTime(run.startedAt)}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{run.duration}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{run.ledgerWrites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step trace drawer */}
      {run && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-medium text-blue-300">Run Trace — {run.id} · {run.vendor}</h3>
          </div>
          <div className="space-y-2">
            {run.steps.map((step) => (
              <div key={step.step} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold shrink-0 mt-0.5">{step.step}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {statusIcon(step.status)}
                    <p className="text-sm text-slate-200 font-medium">{step.name}</p>
                    <span className="ml-auto text-xs text-slate-600">{step.duration}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{step.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
