"use client";
import { useState } from "react";
import { mockVendors, Vendor } from "@/lib/mock-data";
import { RiskBadge } from "./RiskBadge";
import { RegionBadge } from "./RegionBadge";
import { VendorDetailDrawer } from "./VendorDetailDrawer";
import { formatDate, statusBg, cn } from "@/lib/utils";
import { Search, SlidersHorizontal, Plus, Upload } from "lucide-react";

export function VendorTable() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filtered = mockVendors.filter((v) => {
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
            <input
              type="text"
              placeholder="Search vendors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all"
          >
            <option value="All">All Regions</option>
            <option value="US East">US East</option>
            <option value="EU Central">EU Central</option>
            <option value="APAC Singapore">APAC Singapore</option>
          </select>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-3 py-2 text-sm bg-white/5 border border-white/8 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all"
          >
            <option value="All">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="compliant">Compliant</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm transition-all">
            <Upload className="w-3.5 h-3.5" />
            Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all">
            <Plus className="w-3.5 h-3.5" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/8 overflow-hidden bg-[#0d1117]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Vendor</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Vendor ID</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Region</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Tier</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Risk Score</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Frameworks</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Last Audit</th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((v) => (
              <tr
                key={v.id}
                onClick={() => setSelectedVendor(v)}
                className="hover:bg-white/3 cursor-pointer transition-colors group"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="text-slate-200 font-medium group-hover:text-white transition-colors">{v.name}</p>
                    <p className="text-xs text-slate-500">{v.operatingEntity}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{v.globalVendorId}</td>
                <td className="px-4 py-3"><RegionBadge region={v.region} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{v.complianceTier}</td>
                <td className="px-4 py-3">
                  <RiskBadge level={v.riskLevel} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {v.requiredFrameworks.slice(0, 2).map((f) => (
                      <span key={f} className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-slate-400 border border-white/5">{f}</span>
                    ))}
                    {v.requiredFrameworks.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-slate-500">+{v.requiredFrameworks.length - 2}</span>
                    )}
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
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">No vendors match your filters.</div>
        )}
      </div>

      {selectedVendor && (
        <VendorDetailDrawer vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
      )}
    </div>
  );
}
