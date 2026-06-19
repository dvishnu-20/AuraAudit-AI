"use client";
import { useState } from "react";
import { UploadZone } from "@/components/app/UploadZone";
import { AIExtractionPanel } from "@/components/app/AIExtractionPanel";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  const [uploadedFile, setUploadedFile] = useState<string | undefined>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <FileText className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Document Intake & AI Extraction</h1>
          <p className="text-sm text-slate-500">Upload vendor evidence. AI parses, maps controls, and writes to the audit ledger.</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6 h-[calc(100vh-220px)]">
        {/* Upload + Queue */}
        <div className="col-span-2 space-y-4">
          <UploadZone onFileReady={setUploadedFile} />
          {/* Accepted types */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/5">
            <p className="text-xs text-slate-500 mb-2">Accepted document types</p>
            <div className="flex flex-wrap gap-1.5">
              {["SOC2 Report", "ISO27001 Cert", "Security Questionnaire", "Vendor Contract", "DPA", "Payment Terms", "HIPAA BAA", "Subprocessor List"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400 border border-white/5">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Document Preview placeholder */}
        <div className="col-span-2 rounded-xl border border-white/8 bg-[#0d1117] flex items-center justify-center">
          {uploadedFile ? (
            <div className="text-center p-6">
              <FileText className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-300">{uploadedFile}</p>
              <p className="text-xs text-slate-500 mt-1">Document preview (requires PDF renderer)</p>
              <div className="mt-4 h-64 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center">
                <p className="text-xs text-slate-600">PDF preview placeholder</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-6">
              <FileText className="w-12 h-12 text-slate-800 mx-auto mb-3" />
              <p className="text-sm text-slate-600">Select a document to preview</p>
            </div>
          )}
        </div>

        {/* AI Extraction panel */}
        <div className="col-span-1 rounded-xl border border-white/8 bg-[#0d1117] overflow-y-auto">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI Extraction</p>
          </div>
          <AIExtractionPanel fileName={uploadedFile} />
        </div>
      </div>
    </div>
  );
}
