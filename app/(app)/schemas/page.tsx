"use client";
import { useState } from "react";
import { mockSchemas } from "@/lib/mock-data";
import { ComplianceSchemaCard } from "@/components/app/ComplianceSchemaCard";
import { GitBranch, RefreshCw, CheckCircle, Download, Save } from "lucide-react";

const jsonPreview = `{
  "schema_id": "SCH-001",
  "framework": "SOC2 Type II",
  "vendor_id": "VND-001",
  "generated_at": "2025-01-19T16:30:00Z",
  "controls": [
    {
      "id": "CC6.1",
      "name": "Logical Access Controls",
      "evidence_type": "policy_document",
      "status": "verified",
      "confidence": 0.94,
      "human_approval": false
    },
    {
      "id": "CC6.7",
      "name": "Encryption at Rest",
      "evidence_type": "certificate",
      "status": "missing",
      "confidence": 0.0,
      "human_approval": true
    }
  ],
  "risk_delta": 18,
  "region_policy": "US_EAST_POLICY_V3",
  "ledger_ref": "EVT-001"
}`;

export default function SchemasPage() {
  const [schemas, setSchemas] = useState(mockSchemas);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setSchemas((s) => s.map((sc) => ({ ...sc, confidence: Math.min(sc.confidence + 0.05, 1) })));
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <GitBranch className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Dynamic Compliance Schema</h1>
            <p className="text-sm text-slate-500">AI converts vendor evidence into structured compliance controls.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleGenerate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} />
            {generating ? "Generating…" : "Generate Schema"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <CheckCircle className="w-3.5 h-3.5" />
            Validate Policy
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <Save className="w-3.5 h-3.5" />
            Save Version
          </button>
        </div>
      </div>

      {/* Mapping flow */}
      <div className="p-4 rounded-xl bg-white/2 border border-white/5 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          {["Document Evidence", "AI Extracted Assertion", "Internal Policy Control", "Regional Rule", "Ledger Event"].map((stage, i, arr) => (
            <div key={stage} className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-slate-300 whitespace-nowrap">{stage}</div>
              {i < arr.length - 1 && <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-violet-500" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Schema cards */}
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {schemas.map((s) => <ComplianceSchemaCard key={s.id} schema={s} loading={generating} />)}
        </div>

        {/* JSON Preview */}
        <div className="col-span-1 rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Schema JSON Preview</p>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-44px)]">
            <pre className="text-xs text-slate-400 font-mono whitespace-pre leading-relaxed">{jsonPreview}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
