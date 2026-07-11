"use client";
import { useState } from "react";
import { mockSchemas } from "@/lib/mock-data";
import { ComplianceSchemaCard } from "@/components/app/ComplianceSchemaCard";
import { GitBranch, RefreshCw, CheckCircle, Download, Save, Loader2, X } from "lucide-react";

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

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  return (
    <div onClick={onDone} className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111827] border border-white/10 shadow-2xl cursor-pointer">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-sm text-slate-200">{msg}</span>
      <X className="w-3.5 h-3.5 text-slate-600 ml-1" />
    </div>
  );
}

export default function SchemasPage() {
  const [schemas, setSchemas] = useState(mockSchemas);
  const [generating, setGenerating] = useState(false);
  const [validating, setValidating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [schemaVersion, setSchemaVersion] = useState(1);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setSchemas((s) => s.map((sc) => ({ ...sc, confidence: Math.min(sc.confidence + 0.05, 1) })));
      setGenerating(false);
    }, 2000);
  };

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setToast("✓ All 12 policy controls validated — 0 violations found");
    }, 2200);
  };

  const handleSaveVersion = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const v = schemaVersion + 1;
      setSchemaVersion(v);
      setToast(`Schema version v${v}.0 saved to CockroachDB ledger`);
    }, 1200);
  };

  const handleExport = () => {
    const blob = new Blob([jsonPreview], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compliance-schema-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
          <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-60">
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} />
            {generating ? "Generating…" : "Generate Schema"}
          </button>
          <button onClick={handleValidate} disabled={validating} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all disabled:opacity-60">
            {validating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
            {validating ? "Validating…" : "Validate Policy"}
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <Download className="w-3.5 h-3.5" />Export
          </button>
          <button onClick={handleSaveVersion} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all disabled:opacity-60">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : `Save v${schemaVersion + 1}.0`}
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
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {schemas.map((s) => <ComplianceSchemaCard key={s.id} schema={s} loading={generating} />)}
        </div>
        <div className="col-span-1 rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Schema JSON Preview</p>
            <span className="text-[10px] text-slate-600">v{schemaVersion}.0</span>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-44px)]">
            <pre className="text-xs text-slate-400 font-mono whitespace-pre leading-relaxed">{jsonPreview}</pre>
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
