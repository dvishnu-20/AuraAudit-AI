"use client";
import { useState } from "react";
import { mockLedgerEvents, LedgerEvent } from "@/lib/mock-data";
import { RegionBadge } from "./RegionBadge";
import { LedgerEventDrawer } from "./LedgerEventDrawer";
import { formatDateTime, cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export function LedgerEventTable() {
  const [selected, setSelected] = useState<LedgerEvent | null>(null);

  return (
    <>
      <div className="rounded-xl border border-white/8 overflow-hidden bg-[#0d1117]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Sequence</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Timestamp</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Region</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Agent Action</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Risk Δ</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Policy Rule</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockLedgerEvents.map((evt) => (
              <tr
                key={evt.id}
                onClick={() => setSelected(evt)}
                className="hover:bg-white/3 cursor-pointer transition-colors group"
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-500">#{evt.sequence.toLocaleString()}</td>
                <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDateTime(evt.timestamp)}</td>
                <td className="px-4 py-3"><RegionBadge region={evt.region} /></td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-slate-200 text-xs font-medium group-hover:text-white transition-colors">{evt.vendorName}</p>
                    <p className="text-xs text-slate-600">{evt.vendorId}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300 text-xs max-w-[200px] truncate">{evt.agentAction}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-semibold tabular-nums", evt.riskDelta > 0 ? "text-red-400" : "text-emerald-400")}>
                    {evt.riskDelta > 0 ? `+${evt.riskDelta}` : evt.riskDelta}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{evt.policyRule}</td>
                <td className="px-4 py-3">
                  {evt.commitStatus === "committed" ? (
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs text-emerald-400">Committed</span></div>
                  ) : evt.commitStatus === "pending" ? (
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /><span className="text-xs text-amber-400">Pending</span></div>
                  ) : (
                    <div className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-400" /><span className="text-xs text-red-400">Failed</span></div>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{evt.hashPreview}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && <LedgerEventDrawer event={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
