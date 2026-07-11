"use client";
import { LedgerEvent } from "@/lib/mock-data";
import { X, CheckCircle, Clock, Bot } from "lucide-react";
import { RegionBadge } from "./RegionBadge";
import { formatDateTime, cn } from "@/lib/utils";

interface LedgerEventDrawerProps {
  event: LedgerEvent;
  onClose: () => void;
}

export function LedgerEventDrawer({ event, onClose }: LedgerEventDrawerProps) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[520px] h-full bg-[#0d1117] border-l border-white/10 overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0d1117] border-b border-white/5">
          <div>
            <h2 className="text-base font-semibold text-white">Ledger Event #{event.sequence.toLocaleString()}</h2>
            <p className="text-xs text-slate-500">{event.vendorName} · {formatDateTime(event.timestamp)}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status + region */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Committed</span>
            </div>
            <RegionBadge region={event.region} />
            <span className={cn("text-sm font-bold tabular-nums", event.riskDelta > 0 ? "text-red-400" : "text-emerald-400")}>
              Risk {event.riskDelta > 0 ? `+${event.riskDelta}` : event.riskDelta}
            </span>
          </div>

          {/* Agent action */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/8">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Agent Action</p>
            <p className="text-sm text-white font-medium">{event.agentAction}</p>
          </div>

          {/* AI Reasoning */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">AI Reasoning</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{event.aiReasoning}</p>
          </div>

          {/* Extracted controls */}
          <div>
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Extracted Controls</h3>
            <div className="flex flex-wrap gap-2">
              {event.extractedControls.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-slate-300">{c}</span>
              ))}
            </div>
          </div>

          {/* Human approval */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
            {event.humanApprovalStatus === "approved" ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : event.humanApprovalStatus === "pending" ? (
              <Clock className="w-4 h-4 text-amber-400" />
            ) : (
              <CheckCircle className="w-4 h-4 text-slate-500" />
            )}
            <div>
              <p className="text-sm text-slate-200 font-medium">Human Approval: {event.humanApprovalStatus === "not_required" ? "Not Required" : event.humanApprovalStatus.charAt(0).toUpperCase() + event.humanApprovalStatus.slice(1)}</p>
            </div>
          </div>

          {/* Cryptographic details */}
          <div>
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Cryptographic Integrity</h3>
            <div className="space-y-2">
              {[
                { label: "Event Hash", value: event.fullHash },
                { label: "Document Hash", value: event.documentHash },
                { label: "Previous Ledger Ref", value: event.prevLedgerRef },
                { label: "CockroachDB Transaction", value: event.auroraTransactionId },
                { label: "Policy Rule Triggered", value: event.policyRule },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-lg bg-white/3 border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="font-mono text-xs text-slate-300 break-all">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
