"use client";
import { useEffect, useRef, useState } from "react";
import { mockVendors, Vendor } from "@/lib/mock-data";
import { RiskBadge } from "./RiskBadge";
import { RegionBadge } from "./RegionBadge";
import { VendorDetailDrawer } from "./VendorDetailDrawer";
import { formatDate, statusBg, cn } from "@/lib/utils";
import { Search, Plus, Upload, X, CheckCircle, Loader2 } from "lucide-react";

// ── Toast helper ────────────────────────────────────────────────────────────

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111827] border border-white/10 shadow-2xl animate-fade-in">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="text-sm text-slate-200">{msg}</span>
    </div>
  );
}

// ── Add Vendor Modal ────────────────────────────────────────────────────────

const REGIONS = ["US East", "EU Central", "APAC Singapore"];
const TIERS = ["Tier 1 – Critical", "Tier 2 – Standard", "Tier 3 – Low Risk"];
const FRAMEWORKS = ["SOC2", "ISO27001", "GDPR", "HIPAA", "DPA", "Financial Terms"];

interface AddVendorModalProps { onClose: () => void; onAdded: (v: Vendor) => void; }

function AddVendorModal({ onClose, onAdded }: AddVendorModalProps) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [tier, setTier] = useState(TIERS[1]);
  const [frameworks, setFrameworks] = useState<string[]>(["SOC2", "GDPR"]);
  const [loading, setLoading] = useState(false);

  const toggle = (f: string) =>
    setFrameworks((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), region, complianceTier: tier, requiredFrameworks: frameworks }),
      });
      const data = await res.json();
      onAdded(data.vendor || { id: `VND-${Date.now()}`, name: name.trim(), region, complianceTier: tier, requiredFrameworks: frameworks, riskLevel: "low", status: "active", globalVendorId: `GV-${Date.now()}`, lastAudit: new Date().toISOString(), operatingEntity: name.trim(), aiRiskSummary: "", recentLedgerEvents: 0, riskScore: 0, documents: 0, openGaps: 0, legalEntities: [] } as unknown as Vendor);
    } catch {
      onAdded({ id: `VND-${Date.now()}`, name: name.trim(), region, complianceTier: tier, requiredFrameworks: frameworks, riskLevel: "low", status: "active", globalVendorId: `GV-${Date.now()}`, lastAudit: new Date().toISOString(), operatingEntity: name.trim(), aiRiskSummary: "", recentLedgerEvents: 0, riskScore: 0, documents: 0, openGaps: 0, legalEntities: [] } as unknown as Vendor);
    } finally { setLoading(false); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-base font-semibold text-white">Add New Vendor</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Vendor Name *</label>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Stripe Inc." required className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Primary Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/60 transition-all">
                {REGIONS.map((r) => <option key={r} className="bg-slate-900">{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Compliance Tier</label>
              <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/60 transition-all">
                {TIERS.map((t) => <option key={t} className="bg-slate-900">{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-2">Required Frameworks</label>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((f) => (
                <button key={f} type="button" onClick={() => toggle(f)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", frameworks.includes(f) ? "bg-blue-500/20 border-blue-500/40 text-blue-300" : "bg-white/5 border-white/8 text-slate-400 hover:bg-white/8")}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 text-sm hover:bg-white/8 transition-all">Cancel</button>
            <button type="submit" disabled={loading || !name.trim()} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50">
              {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Adding…</> : "Add Vendor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Import Progress Toast ───────────────────────────────────────────────────

function ImportToast({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 800); return 100; }
        return p + Math.random() * 18 + 8;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [onDone]);
  return (
    <div className="fixed bottom-6 right-6 z-[200] w-72 px-5 py-4 rounded-xl bg-[#111827] border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-200 font-medium">Importing CSV…</span>
        <span className="text-xs text-slate-500">{Math.min(Math.round(progress), 100)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-200" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      {progress >= 100 && <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" />12 vendors imported successfully</p>}
    </div>
  );
}

// ── VendorTable ─────────────────────────────────────────────────────────────

export function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then((data) => { if (data.vendors) setVendors(data.vendors); })
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const handleAdded = (v: Vendor) => {
    setVendors((prev) => [v, ...prev]);
    setToast(`✓ "${v.name}" added successfully`);
  };

  const filtered = vendors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.globalVendorId.toLowerCase().includes(search.toLowerCase());
    const matchRegion = selectedRegion === "All" || v.region === selectedRegion;
    const matchRisk = selectedRisk === "All" || v.riskLevel === selectedRisk;
    return matchSearch && matchRegion && matchRisk;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input type="text" placeholder="Search vendors…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" />
          </div>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all">
            <option value="All">All Regions</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={selectedRisk} onChange={(e) => setSelectedRisk(e.target.value)} className="px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all">
            <option value="All">All Risk Levels</option>
            {["critical","high","medium","low","compliant"].map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <Upload className="w-3.5 h-3.5" />Import
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">
            <Plus className="w-3.5 h-3.5" />Add Vendor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/8 overflow-hidden bg-[#0d1117]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              {["Vendor","Vendor ID","Region","Tier","Risk Score","Frameworks","Last Audit","Status"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((v) => (
              <tr key={v.id} onClick={() => setSelectedVendor(v)} className="hover:bg-white/3 cursor-pointer transition-colors group">
                <td className="px-4 py-3"><div><p className="text-slate-200 font-medium group-hover:text-white transition-colors">{v.name}</p><p className="text-xs text-slate-500">{v.operatingEntity}</p></div></td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{v.globalVendorId}</td>
                <td className="px-4 py-3"><RegionBadge region={v.region} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{v.complianceTier}</td>
                <td className="px-4 py-3"><RiskBadge level={v.riskLevel} /></td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {v.requiredFrameworks.slice(0, 2).map((f) => <span key={f} className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-slate-400 border border-white/5">{f}</span>)}
                    {v.requiredFrameworks.length > 2 && <span className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-slate-500">+{v.requiredFrameworks.length - 2}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{formatDate(v.lastAudit)}</td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", statusBg(v.status))}>
                    {v.status === "needs_review" ? "Needs Review" : v.status === "non_compliant" ? "Non-Compliant" : v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-slate-500 text-sm">No vendors match your filters.</div>}
      </div>

      {selectedVendor && <VendorDetailDrawer vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />}
      {showAddModal && <AddVendorModal onClose={() => setShowAddModal(false)} onAdded={handleAdded} />}
      {showImport && <ImportToast onDone={() => { setShowImport(false); setToast("12 vendors imported from CSV"); }} />}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
