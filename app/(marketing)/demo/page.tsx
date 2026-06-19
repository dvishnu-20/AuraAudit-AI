"use client";
import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle, Loader2, Upload, Bot, AlertTriangle, BookOpen, Globe } from "lucide-react";

const demoSteps = [
  {
    id: 1, label: "Upload SOC2 Report", icon: Upload, color: "blue",
    content: {
      title: "Simulated document upload",
      body: "CloudNova_SOC2_2023.pdf has been uploaded. File size: 4.2 MB · 152 pages · SOC2 Type II report.",
    },
  },
  {
    id: 2, label: "Agent Extracts Controls", icon: Bot, color: "violet",
    content: {
      title: "AI control extraction complete",
      body: "94 compliance control assertions extracted. Mapped to 31 internal policy controls. Frameworks: SOC2 CC6.1, CC6.7, CC7.2, A1.1. Confidence: 91%.",
    },
  },
  {
    id: 3, label: "Missing Encryption Evidence", icon: AlertTriangle, color: "red",
    content: {
      title: "Gap detected — CC6.7 Encryption at Rest",
      body: "SOC2 control CC6.7 (Encryption at Rest) has no supporting evidence artifact in the submitted report. Policy requires either a certificate or a configuration statement.",
    },
  },
  {
    id: 4, label: "Risk Score Raised", icon: AlertTriangle, color: "amber",
    content: {
      title: "Vendor risk score increased",
      body: "CloudNova Systems risk score: 60 → 78 (+18). Reason: SOC2 evidence 14 months old + missing CC6.7 encryption artifact. Human review flagged.",
    },
  },
  {
    id: 5, label: "Ledger Event Created", icon: BookOpen, color: "emerald",
    content: {
      title: "Immutable ledger event committed",
      body: "Event EVT-001 written to Aurora DSQL. Hash: a3f9d2...c8e1b4. Committed to US East, EU Central, APAC Singapore simultaneously. Strong consistency verified.",
    },
  },
  {
    id: 6, label: "Region Sync Verified", icon: Globe, color: "cyan",
    content: {
      title: "Multi-region consistency verified",
      body: "Ledger sequence #9,481,204 confirmed across all 3 active regions. Commit latencies: US 18ms · EU 24ms · APAC 31ms. Zero replication lag.",
    },
  },
  {
    id: 7, label: "Compliance Report", icon: CheckCircle, color: "green",
    content: {
      title: "SOC2 Vendor Gap Report generated",
      body: "Report includes: control gaps, risk delta timeline, ledger event trail, human approval status, and AI reasoning summary. Export formats: PDF, CSV, JSON.",
    },
  },
];

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const advance = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setActiveStep((s) => Math.min(s + 1, demoSteps.length - 1)); }, 800);
  };

  const current = demoSteps[activeStep];
  const Icon = current.icon;

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

      <div className="py-16 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Interactive Demo</h1>
          <p className="text-slate-500">Walk through the full AI compliance workflow in 2.5 minutes.</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Step list */}
          <div className="space-y-1.5">
            {demoSteps.map((step, i) => {
              const StepIcon = step.icon;
              const done = i < activeStep;
              const active = i === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${active ? "bg-blue-500/10 border border-blue-500/20" : done ? "bg-white/3 border border-white/5" : "border border-transparent hover:bg-white/3"}`}
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${done ? "bg-emerald-500/20" : active ? "bg-blue-500/20" : "bg-white/5"}`}>
                    {done ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <StepIcon className={`w-4 h-4 text-${step.color}-400`} />}
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${active ? "text-blue-300" : done ? "text-emerald-400" : "text-slate-400"}`}>Step {step.id}</p>
                    <p className={`text-sm ${active ? "text-white" : done ? "text-slate-300" : "text-slate-500"}`}>{step.label}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <div className="col-span-2">
            <div className="rounded-2xl border border-white/8 bg-[#0d1117] overflow-hidden h-full flex flex-col">
              <div className={`p-6 border-b border-white/5 bg-${current.color}-500/5`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-${current.color}-500/15 border border-${current.color}-500/25`}>
                    {loading ? <Loader2 className="w-5 h-5 text-blue-400 animate-spin" /> : <Icon className={`w-5 h-5 text-${current.color}-400`} />}
                  </div>
                  <div>
                    <p className={`text-xs text-${current.color}-400 uppercase tracking-wider font-medium`}>Step {current.id} of {demoSteps.length}</p>
                    <p className="text-lg font-semibold text-white">{current.label}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6">
                <h3 className="text-base font-semibold text-white mb-3">{current.content.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{current.content.body}</p>

                {activeStep === 4 && (
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Aurora DSQL — Commit Confirmed</span>
                    </div>
                    <div className="space-y-1">
                      {["US East · 18ms", "EU Central · 24ms", "APAC Singapore · 31ms"].map((r) => (
                        <div key={r} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {r} — Committed
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 flex gap-3">
                {activeStep < demoSteps.length - 1 ? (
                  <button onClick={advance} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all disabled:opacity-60">
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? "Processing…" : `Next: ${demoSteps[activeStep + 1].label}`}
                  </button>
                ) : (
                  <Link href="/dashboard" className="flex-1">
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all">
                      Enter Compliance Command Center →
                    </button>
                  </Link>
                )}
                <button onClick={() => setActiveStep(0)} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white text-sm transition-all">
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
