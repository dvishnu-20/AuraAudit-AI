"use client";
import { useState } from "react";
import { Bot, CheckCircle, Loader2, AlertTriangle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIExtractionPanelProps {
  fileName?: string;
}

const steps = ["Uploaded", "Parsed", "Controls Extracted", "Risk Scored", "Ledger Written"];
const agentSteps = [
  "Parsing document structure…",
  "Mapping compliance controls…",
  "Checking regional policy…",
  "Computing risk score…",
  "Preparing ledger entry…",
];

const mockExtraction = {
  documentType: "SOC2 Type II Report",
  vendor: "CloudNova Systems",
  jurisdiction: "United States",
  frameworks: ["SOC2 CC6.1", "SOC2 CC7.2", "SOC2 A1.1"],
  renewalDate: "2025-11-01",
  controls: [
    { name: "CC6.1 Logical Access Controls", status: "verified" },
    { name: "CC6.7 Encryption at Rest", status: "missing" },
    { name: "CC7.2 Monitoring Operations", status: "verified" },
    { name: "A1.1 Availability SLA", status: "partial" },
  ],
  dataResidency: "US East (AWS us-east-1)",
  subprocessorClause: "Listed — requires annual review",
  paymentTerms: "N/A",
  riskIndicators: ["SOC2 evidence 14 months old", "Encryption evidence missing"],
  confidence: 0.91,
};

export function AIExtractionPanel({ fileName }: AIExtractionPanelProps) {
  const [currentStep, setCurrentStep] = useState(fileName ? 4 : -1);
  const [agentStep, setAgentStep] = useState(fileName ? 5 : 0);
  const [approved, setApproved] = useState(false);

  const statusIcon = (s: string) => {
    if (s === "verified") return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
    if (s === "missing") return <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;
    return <Loader2 className="w-3.5 h-3.5 text-amber-400" />;
  };

  if (!fileName) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
        <FileText className="w-12 h-12 text-slate-700" />
        <p className="text-sm text-slate-500">Upload a compliance document to begin AI extraction</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Progress stepper */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={cn("flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0", i <= currentStep ? "bg-blue-500 text-white" : "bg-white/10 text-slate-600")}>
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && <div className={cn("flex-1 h-px", i < currentStep ? "bg-blue-500" : "bg-white/10")} />}
          </div>
        ))}
      </div>

      {/* Agent thinking */}
      {agentStep < 5 && (
        <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
            <span className="text-xs text-blue-400 font-medium">Agent Processing</span>
          </div>
          <p className="text-xs text-slate-400">{agentSteps[Math.min(agentStep, 4)]}</p>
        </div>
      )}

      {/* Extracted data */}
      <div className="space-y-3">
        {[
          { label: "Document Type", value: mockExtraction.documentType },
          { label: "Vendor", value: mockExtraction.vendor },
          { label: "Jurisdiction", value: mockExtraction.jurisdiction },
          { label: "Renewal Date", value: mockExtraction.renewalDate },
          { label: "Data Residency", value: mockExtraction.dataResidency },
          { label: "Subprocessor Clause", value: mockExtraction.subprocessorClause },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-xs text-slate-500">{label}</span>
            <span className="text-xs text-slate-300 text-right max-w-[55%]">{value}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Extracted Controls</p>
        <div className="space-y-1.5">
          {mockExtraction.controls.map((c) => (
            <div key={c.name} className="flex items-center gap-2 p-2 rounded-lg bg-white/3 border border-white/5">
              {statusIcon(c.status)}
              <span className="text-xs text-slate-300">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk indicators */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Risk Indicators</p>
        <div className="space-y-1.5">
          {mockExtraction.riskIndicators.map((r) => (
            <div key={r} className="flex items-center gap-2 p-2 rounded-lg bg-red-500/5 border border-red-500/15">
              <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
              <span className="text-xs text-slate-400">{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Extraction Confidence</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${mockExtraction.confidence * 100}%` }} />
          </div>
          <span className="text-xs text-emerald-400 font-semibold">{Math.round(mockExtraction.confidence * 100)}%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => setApproved(true)}
          className={cn("w-full py-2.5 rounded-lg text-sm font-medium transition-all", approved ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-emerald-600 hover:bg-emerald-500 text-white")}
        >
          {approved ? "✓ Extraction Approved" : "Approve Extraction"}
        </button>
        <button className="w-full py-2.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/20 text-sm font-medium transition-all">
          Send to Human Review
        </button>
        <button className="w-full py-2.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 border border-violet-500/20 text-sm font-medium transition-all">
          Write to Audit Ledger
        </button>
      </div>
    </div>
  );
}
