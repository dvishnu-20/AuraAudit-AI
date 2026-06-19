"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Organization Setup", "Select Regions", "Compliance Frameworks", "Demo Data Setup"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [regions, setRegions] = useState<string[]>(["US"]);
  const [frameworks, setFrameworks] = useState<string[]>(["SOC2", "GDPR"]);
  const [dataOption, setDataOption] = useState("sample");
  const router = useRouter();

  const toggle = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={cn("flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-all", i < step ? "bg-emerald-500 text-white" : i === step ? "bg-blue-500 text-white" : "bg-white/10 text-slate-600")}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={cn("flex-1 h-px mx-2", i < step ? "bg-emerald-500" : "bg-white/10")} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mb-8">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Set up your organization</h2>
            <p className="text-sm text-slate-500">Tell us about your organization to configure the compliance environment.</p>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Organization Name</label>
              <input type="text" defaultValue="ACME Corporation" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 focus:outline-none focus:border-blue-500/50 text-sm" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Headquarters Region</label>
              <select className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 focus:outline-none text-sm">
                {["US East", "EU Central", "APAC Singapore"].map(o => <option key={o} className="bg-slate-900">{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Primary Compliance Frameworks</label>
              <select className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 focus:outline-none text-sm">
                {["SOC2 + GDPR", "HIPAA + SOC2", "ISO27001 + GDPR", "All Frameworks"].map(o => <option key={o} className="bg-slate-900">{o}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Select your regions</h2>
            <p className="text-sm text-slate-500">Choose the regions where your vendors operate.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "United States", value: "US", color: "blue" },
                { label: "European Union", value: "EU", color: "violet" },
                { label: "APAC / Singapore", value: "APAC", color: "cyan" },
                { label: "Global", value: "Global", color: "slate" },
              ].map(({ label, value, color }) => (
                <button
                  key={value}
                  onClick={() => toggle(regions, setRegions, value)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                    regions.includes(value) ? `border-${color}-500/40 bg-${color}-500/10` : "border-white/8 bg-white/3 hover:bg-white/5"
                  )}
                >
                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0", regions.includes(value) ? "bg-blue-500 border-blue-500" : "border-white/20")}>
                    {regions.includes(value) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-slate-300">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Configure compliance frameworks</h2>
            <p className="text-sm text-slate-500">Select the frameworks your vendors must comply with.</p>
            <div className="grid grid-cols-2 gap-2">
              {["SOC2", "ISO27001", "GDPR", "HIPAA", "DPA", "Financial Terms", "Subprocessor Governance"].map((f) => (
                <button
                  key={f}
                  onClick={() => toggle(frameworks, setFrameworks, f)}
                  className={cn("flex items-center gap-2 p-3 rounded-lg border text-left transition-all text-sm", frameworks.includes(f) ? "border-blue-500/40 bg-blue-500/10 text-blue-300" : "border-white/8 bg-white/3 text-slate-400 hover:bg-white/5")}
                >
                  <div className={cn("w-4 h-4 rounded border flex items-center justify-center shrink-0", frameworks.includes(f) ? "bg-blue-500 border-blue-500" : "border-white/20")}>
                    {frameworks.includes(f) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Set up demo data</h2>
            <p className="text-sm text-slate-500">Choose how you want to get started with your vendor registry.</p>
            <div className="space-y-3">
              {[
                { value: "sample", label: "Start with sample vendors", desc: "8 pre-loaded vendors with realistic compliance data across all regions." },
                { value: "csv", label: "Upload vendor CSV", desc: "Import your existing vendor list. We'll extract and map compliance data automatically." },
                { value: "later", label: "Connect later", desc: "Start with an empty workspace. You can import vendors at any time." },
              ].map((o) => (
                <button
                  key={o.value}
                  onClick={() => setDataOption(o.value)}
                  className={cn("w-full text-left p-4 rounded-xl border transition-all", dataOption === o.value ? "border-blue-500/40 bg-blue-500/10" : "border-white/8 bg-white/3 hover:bg-white/5")}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0", dataOption === o.value ? "bg-blue-500 border-blue-500" : "border-white/30")}>
                      {dataOption === o.value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{o.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{o.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all">
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={() => router.push("/dashboard")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all">
            Enter Compliance Command Center
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
