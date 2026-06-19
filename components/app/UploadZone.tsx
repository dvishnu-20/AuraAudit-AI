"use client";
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "done" | "error";
}

interface UploadZoneProps {
  onFileReady?: (fileName: string) => void;
}

export function UploadZone({ onFileReady }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (name: string, size: string) => {
    const newFile: UploadedFile = { name, size, progress: 0, status: "uploading" };
    setFiles((prev) => [...prev, newFile]);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20 + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setFiles((prev) => prev.map((f) => f.name === name ? { ...f, progress: 100, status: "done" } : f));
        onFileReady?.(name);
      } else {
        setFiles((prev) => prev.map((f) => f.name === name ? { ...f, progress: Math.min(p, 99) } : f));
      }
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file.name, `${(file.size / 1024).toFixed(0)} KB`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file.name, `${(file.size / 1024).toFixed(0)} KB`);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-4 p-10 rounded-xl border-2 border-dashed cursor-pointer transition-all",
          dragging ? "border-blue-500/60 bg-blue-500/5" : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4"
        )}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30">
          <Upload className="w-6 h-6 text-blue-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-300">Drop compliance documents here</p>
          <p className="text-xs text-slate-500 mt-1">PDF · DOCX · XLSX · CSV · SOC2 · ISO27001 · DPA · Contract</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">
          Browse Files
        </button>
        <input ref={inputRef} type="file" className="hidden" onChange={handleInput} accept=".pdf,.docx,.xlsx,.csv" />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-slate-300 truncate">{f.name}</p>
                  <span className="text-xs text-slate-500 ml-2">{f.size}</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-300", f.status === "done" ? "bg-emerald-500" : "bg-blue-500")}
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
              </div>
              {f.status === "done" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
