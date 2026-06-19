"use client";
import { useState } from "react";
import { mockRiskSignals } from "@/lib/mock-data";
import { RiskBadge } from "@/components/app/RiskBadge";
import { RegionBadge } from "@/components/app/RegionBadge";
import { MetricCard } from "@/components/app/MetricCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Activity, RefreshCw, AlertTriangle, Clock, Shield } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const distData = [
  { level: "Critical", count: 67, fill: "#ef4444" },
  { level: "High", count: 143, fill: "#f97316" },
  { level: "Medium", count: 412, fill: "#f59e0b" },
  { level: "Low", count: 892, fill: "#3b82f6" },
  { level: "Compliant", count: 1333, fill: "#10b981" },
];

const trendData = Array.from({ length: 14 }, (_, i) => ({
  day: `Jan ${i + 6}`,
  signals: Math.floor(20 + Math.random() * 50),
}));

const thresholds = [
  { rule: "SOC2 evidence older than 12 months", triggered: 12, status: "active" },
  { rule: "Payment term above 90 days", triggered: 3, status: "active" },
  { rule: "GDPR DPA missing", triggered: 7, status: "active" },
  { rule: "ISO certificate expired", triggered: 2, status: "active" },
  { rule: "Critical vendor without cyber insurance", triggered: 1, status: "active" },
];

export default function RiskTelemetryPage() {
  const [signals, setSignals] = useState(mockRiskSignals);
  const [recalculating, setRecalculating] = useState(false);

  const handleRecalculate = () => {
    setRecalculating(true);
    setTimeout(() => setRecalculating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20">
            <Activity className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Active Risk Telemetry</h1>
            <p className="text-sm text-slate-500">Live risk signals, threshold engine, and control failure monitoring.</p>
          </div>
        </div>
        <button
          onClick={handleRecalculate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? "animate-spin" : ""}`} />
          {recalculating ? "Recalculating…" : "Recalculate Risk"}
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-4">
        <MetricCard label="Continuous Checks" value="2,847" sub="Vendor monitors active" accent="blue" icon={<Shield className="w-4 h-4 text-blue-400" />} />
        <MetricCard label="Expiring Evidence" value="34" sub="In next 30 days" accent="amber" icon={<Clock className="w-4 h-4 text-amber-400" />} />
        <MetricCard label="Policy Conflicts" value="11" sub="GDPR + Financial" accent="red" icon={<AlertTriangle className="w-4 h-4 text-red-400" />} />
        <MetricCard label="High-Risk Transactions" value="7" sub="Flagged today" accent="red" icon={<Activity className="w-4 h-4 text-red-400" />} />
        <MetricCard label="Human Review Queue" value="23" sub="Pending approval" accent="amber" icon={<AlertTriangle className="w-4 h-4 text-amber-400" />} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
          <h3 className="text-sm font-medium text-white mb-4">Risk Score Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={distData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="level" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {distData.map((d, i) => <Bar key={i} dataKey="count" fill={d.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Signal trend */}
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
          <h3 className="text-sm font-medium text-white mb-4">Risk Signal Trend — Last 14 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }} />
              <Area type="monotone" dataKey="signals" stroke="#ef4444" fill="url(#sigGrad)" strokeWidth={2} name="Signals" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Threshold engine */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
        <h3 className="text-sm font-medium text-white mb-4">Threshold Engine — Active Rules</h3>
        <div className="grid grid-cols-5 gap-3">
          {thresholds.map((t) => (
            <div key={t.rule} className="p-3 rounded-lg bg-red-500/5 border border-red-500/15">
              <p className="text-xs text-slate-400 leading-relaxed mb-2">{t.rule}</p>
              <p className="text-lg font-bold text-red-400">{t.triggered}</p>
              <p className="text-xs text-slate-600">triggered</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active risk signals */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Active Risk Signals</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              {["Signal ID", "Vendor", "Region", "Type", "Severity", "Trigger Rule", "Current State", "Last Updated"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {signals.map((s) => (
              <tr key={s.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.id}</td>
                <td className="px-4 py-3 text-slate-200 text-xs font-medium">{s.vendor}</td>
                <td className="px-4 py-3"><RegionBadge region={s.region} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{s.signalType}</td>
                <td className="px-4 py-3"><RiskBadge level={s.severity} /></td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.triggerRule}</td>
                <td className="px-4 py-3 text-slate-400 text-xs max-w-[180px] truncate">{s.currentState}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDateTime(s.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
