"use client";
import { Settings, Building2, Shield, Globe, Sliders, Bot, Database, Key, Archive, Users } from "lucide-react";

type SettingsField = { label: string; value: string; type: string; options?: string[] };

type SettingsSection = {
  id: string;
  icon: React.ElementType;
  label: string;
  fields?: SettingsField[];
  toggles?: string[];
  enabled?: string[];
  sliders?: { label: string; value: number; min: number; max: number }[];
  roles?: string[];
  permissions?: string[];
  note?: string;
};

const sections: SettingsSection[] = [
  {
    id: "org", icon: Building2, label: "Organization Profile",
    fields: [
      { label: "Organization Name", value: "ACME Corporation", type: "text" },
      { label: "Headquarters Region", value: "US East", type: "select", options: ["US East", "EU Central", "APAC Singapore"] },
      { label: "Primary Contact Email", value: "compliance@acme-corp.com", type: "email" },
    ],
  },
  {
    id: "frameworks", icon: Shield, label: "Compliance Frameworks",
    toggles: ["SOC2", "ISO27001", "GDPR", "HIPAA", "DPA", "Financial Terms", "Subprocessor Governance"],
    enabled: ["SOC2", "ISO27001", "GDPR", "HIPAA"],
  },
  {
    id: "risk", icon: Sliders, label: "Risk Thresholds",
    sliders: [
      { label: "SOC2 Evidence Max Age (months)", value: 12, min: 6, max: 24 },
      { label: "Payment Terms Max (days)", value: 90, min: 30, max: 180 },
      { label: "High-Risk Score Threshold", value: 70, min: 50, max: 95 },
      { label: "Critical Score Threshold", value: 85, min: 70, max: 100 },
    ],
  },
  {
    id: "agents", icon: Bot, label: "Agent Configuration",
    toggles: ["Auto-trigger on document upload", "Human approval for high-risk actions", "Continuous vendor monitoring", "Slack notifications for critical signals"],
    enabled: ["Auto-trigger on document upload", "Human approval for high-risk actions", "Slack notifications for critical signals"],
  },
  {
    id: "aurora", icon: Database, label: "Aurora DSQL Connection",
    fields: [
      { label: "Cluster Endpoint", value: "••••••••••••.cluster.us-east-1.rds.amazonaws.com", type: "text" },
      { label: "Region", value: "us-east-1", type: "text" },
    ],
    note: "Aurora DSQL connection not yet configured. Backend integration required.",
  },
  {
    id: "roles", icon: Users, label: "User Roles & Permissions",
    roles: ["Compliance Lead", "Reviewer", "Auditor", "Read-Only"],
    permissions: ["Document Upload", "Risk Score Override", "Ledger Write", "Report Export", "Admin Settings"],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-500/10 border border-slate-500/20">
          <Settings className="w-5 h-5 text-slate-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Settings</h1>
          <p className="text-sm text-slate-500">Configure your organization, compliance frameworks, and system behavior.</p>
        </div>
      </div>

      {sections.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.id} className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/2">
              <Icon className="w-4 h-4 text-slate-400" />
              <h2 className="text-sm font-medium text-white">{s.label}</h2>
            </div>
            <div className="p-5 space-y-4">
              {s.fields && (
                <div className="grid grid-cols-2 gap-4">
                  {s.fields.map((f) => (
                    <div key={f.label}>
                      <label className="text-xs text-slate-500 block mb-1">{f.label}</label>
                      {f.type === "select" ? (
                        <select className="w-full px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none">
                          {f.options?.map((o) => <option key={o} className="bg-slate-900">{o}</option>)}
                        </select>
                      ) : (
                        <input type={f.type} defaultValue={f.value} className="w-full px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {s.toggles && (
                <div className="grid grid-cols-2 gap-3">
                  {s.toggles.map((t) => {
                    const on = s.enabled?.includes(t) ?? false;
                    return (
                      <div key={t} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5">
                        <span className="text-sm text-slate-300">{t}</span>
                        <div className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${on ? "bg-blue-500" : "bg-slate-700"}`}>
                          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? "right-0.5" : "left-0.5"}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {s.sliders && (
                <div className="space-y-4">
                  {s.sliders.map((sl) => (
                    <div key={sl.label}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-slate-400">{sl.label}</label>
                        <span className="text-sm font-semibold text-white">{sl.value}</span>
                      </div>
                      <input type="range" min={sl.min} max={sl.max} defaultValue={sl.value} className="w-full accent-blue-500" />
                      <div className="flex justify-between text-xs text-slate-600 mt-1">
                        <span>{sl.min}</span><span>{sl.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {s.roles && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left py-2 pr-4 text-slate-500">Permission</th>
                          {s.roles.map((r) => <th key={r} className="text-center py-2 px-3 text-slate-500">{r}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {s.permissions?.map((p) => (
                          <tr key={p}>
                            <td className="py-2 pr-4 text-slate-400">{p}</td>
                            {s.roles?.map((r, i) => (
                              <td key={r} className="py-2 px-3 text-center">
                                {i <= 1 ? <span className="text-emerald-400">✓</span> : i === 2 ? (p === "Report Export" ? <span className="text-emerald-400">✓</span> : <span className="text-slate-700">—</span>) : <span className="text-slate-700">—</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {s.note && (
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <p className="text-xs text-amber-400">{s.note}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">Discard Changes</button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">Save Settings</button>
      </div>
    </div>
  );
}
