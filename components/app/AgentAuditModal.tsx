"use client";
import { useEffect, useState } from "react";
import { CheckCircle, X, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Selecting vendor for audit", detail: "CloudNova Systems — Tier 1, US East" },
  { label: "Parsing latest documents", detail: "SOC2 Type II (2023), ISO27001 certificate" },
  { label: "Mapping controls to policy", detail: "31 controls identified. 3 gaps detected." },
  { label: "Checking regional policies", detail: "US East policy engine v3.2.0 validated." },
  { label: "Computing risk delta", detail: "Risk increased from 60 → 78 (+18 points)." },
  { label: "Preparing ledger entry", detail: "Event hash: a3f9d2...c8e1b4" },
  { label: "Writing to Aurora DSQL", detail: "Committed to all 3 regions. Strongly consistent." },
];

interface AgentAuditModalProps {
  onClose: () => void;
}

export function AgentAuditModal({ onClose }: AgentAuditModalProps) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (current < steps.length) {
      const t = setTimeout(() => setCurrent((c) => c + 1), 700);
      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [current]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Agentic Audit Running</h2>
            <p className="text-xs text-slate-500">AI compliance pipeline — CloudNova Systems</p>
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => {
            const isActive = i === current;
            const isComplete = i < current;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-all duration-300",
                  isComplete ? "bg-emerald-500/5 border-emerald-500/20" : isActive ? "bg-blue-500/5 border-blue-500/20" : "bg-white/2 border-white/5 opacity-40"
                )}
              >
                <div className="mt-0.5 shrink-0">
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20" />
                  )}
                </div>
                <div>
                  <p className={cn("text-sm font-medium", isComplete ? "text-emerald-300" : isActive ? "text-blue-300" : "text-slate-500")}>
                    {step.label}
                  </p>
                  {(isComplete || isActive) && (
                    <p className="text-xs text-slate-500 mt-0.5">{step.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {done && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
            <p className="text-sm text-emerald-400 font-semibold">✓ Audit Complete — Ledger event committed to all 3 regions</p>
          </div>
        )}

        {done && (
          <button
            onClick={onClose}
            className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-500 hover:to-violet-500 transition-all"
          >
            View Ledger Event
          </button>
        )}
      </div>
    </div>
  );
}
