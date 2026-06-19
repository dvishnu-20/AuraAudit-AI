"use client";
import { Vendor } from "@/lib/mock-data";
import { X, Bot, BookOpen, Play, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { RiskBadge } from "./RiskBadge";
import { RegionBadge } from "./RegionBadge";
import { formatDate, statusBg, cn } from "@/lib/utils";

interface VendorDetailDrawerProps {
  vendor: Vendor;
  onClose: () => void;
}

export function VendorDetailDrawer({ vendor, onClose }: VendorDetailDrawerProps) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[480px] h-full bg-[#0d1117] border-l border-white/10 overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0d1117] border-b border-white/5">
          <div>
            <h2 className="text-base font-semibold text-white">{vendor.name}</h2>
            <p className="text-xs text-slate-500">{vendor.globalVendorId} · {vendor.operatingEntity}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Risk + Status row */}
          <div className="flex items-center gap-3">
            <RiskBadge level={vendor.riskLevel} />
            <RegionBadge region={vendor.region} />
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", statusBg(vendor.status))}>
              {vendor.status === "needs_review" ? "Needs Review" : vendor.status === "non_compliant" ? "Non-Compliant" : "Compliant"}
            </span>
            <span className="ml-auto text-2xl font-bold text-white">{vendor.riskScore}<span className="text-xs text-slate-500 font-normal ml-1">/100</span></span>
          </div>

          {/* AI Risk Summary */}
          <div className="rounded-xl p-4 bg-blue-500/5 border border-blue-500/15">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">AI Risk Summary</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{vendor.aiRiskSummary}</p>
          </div>

          {/* Open Gaps */}
          {vendor.openGaps.length > 0 && (
            <div>
              <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Open Control Gaps</h3>
              <div className="space-y-2">
                {vendor.openGaps.map((gap) => (
                  <div key={gap} className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/5 border border-red-500/15">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="text-sm text-slate-300">{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frameworks */}
          <div>
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Required Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {vendor.requiredFrameworks.map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-slate-300">{f}</span>
              ))}
            </div>
          </div>

          {/* Legal entities */}
          <div>
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Legal Entities</h3>
            <div className="space-y-1">
              {vendor.legalEntities.map((e) => (
                <p key={e} className="text-sm text-slate-400">{e}</p>
              ))}
            </div>
          </div>

          {/* Documents */}
          {vendor.documents.length > 0 && (
            <div>
              <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Uploaded Documents</h3>
              <div className="space-y-2">
                {vendor.documents.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate">{d.name}</p>
                      <p className="text-xs text-slate-500">{d.type} · {formatDate(d.uploadedAt)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {d.status === "processed" ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span className="text-xs text-slate-500">{Math.round(d.confidence * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ledger */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/5 border border-violet-500/15">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <div>
              <p className="text-sm text-slate-300 font-medium">{vendor.recentLedgerEvents} recent ledger events</p>
              <p className="text-xs text-slate-500">Last audit: {formatDate(vendor.lastAudit)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-500 hover:to-violet-500 transition-all">
              <Play className="w-3.5 h-3.5" />
              Run Vendor Audit
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
              <BookOpen className="w-3.5 h-3.5" />
              Ledger Trail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
