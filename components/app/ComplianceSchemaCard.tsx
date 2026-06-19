"use client";
import { ComplianceSchema } from "@/lib/mock-data";
import { CheckCircle, AlertTriangle, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceSchemaCardProps {
  schema: ComplianceSchema;
  loading?: boolean;
}

const statusConfig = {
  verified: { color: "border-emerald-500/20 bg-emerald-500/5", label: "Verified", icon: CheckCircle, iconColor: "text-emerald-400" },
  partial: { color: "border-amber-500/20 bg-amber-500/5", label: "Partial", icon: Clock, iconColor: "text-amber-400" },
  missing: { color: "border-red-500/20 bg-red-500/5", label: "Missing Evidence", icon: AlertTriangle, iconColor: "text-red-400" },
  pending: { color: "border-slate-500/20 bg-slate-500/5", label: "Pending", icon: Clock, iconColor: "text-slate-400" },
};

export function ComplianceSchemaCard({ schema, loading }: ComplianceSchemaCardProps) {
  const config = statusConfig[schema.verificationStatus];
  const Icon = config.icon;

  return (
    <div className={cn("rounded-xl border p-5 transition-all", config.color, loading && "animate-pulse opacity-60")}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{schema.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{schema.framework}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon className={cn("w-4 h-4", config.iconColor)} />
          <span className={cn("text-xs font-medium", config.iconColor)}>{config.label}</span>
        </div>
      </div>

      {/* Evidence coverage bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">Evidence Coverage</span>
          <span className="text-xs text-slate-400">{schema.extractedEvidence.length}/{schema.requiredEvidence.length}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", schema.verificationStatus === "verified" ? "bg-emerald-500" : schema.verificationStatus === "partial" ? "bg-amber-500" : "bg-red-500")}
            style={{ width: `${(schema.extractedEvidence.length / schema.requiredEvidence.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Required vs extracted */}
      <div className="space-y-1.5">
        {schema.requiredEvidence.map((e) => {
          const extracted = schema.extractedEvidence.includes(e);
          return (
            <div key={e} className="flex items-center gap-2">
              {extracted ? (
                <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <div className="w-3 h-3 rounded-full border border-slate-600 shrink-0" />
              )}
              <span className={cn("text-xs", extracted ? "text-slate-300" : "text-slate-600")}>{e}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-1 w-16 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${schema.confidence * 100}%` }} />
          </div>
          <span className="text-xs text-slate-500">{Math.round(schema.confidence * 100)}% confidence</span>
        </div>
        {schema.humanApprovalRequired && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3 text-amber-400" />
            <span className="text-xs text-amber-400">Human required</span>
          </div>
        )}
      </div>
    </div>
  );
}
