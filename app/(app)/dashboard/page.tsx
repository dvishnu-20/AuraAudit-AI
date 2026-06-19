"use client";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";
import { MetricCard } from "@/components/app/MetricCard";
import { RiskBadge } from "@/components/app/RiskBadge";
import { RegionBadge } from "@/components/app/RegionBadge";
import { agenticInsights, mockLedgerEvents, mockVendors, mockRegions } from "@/lib/mock-data";
import { formatDateTime, cn } from "@/lib/utils";
import { Bot, AlertTriangle, TrendingUp, Globe, Activity, Zap, Info } from "lucide-react";

const riskPieData = [
  { name: "Compliant", value: 1840, color: "#10b981" },
  { name: "Needs Review", value: 712, color: "#f59e0b" },
  { name: "High Risk", value: 228, color: "#f97316" },
  { name: "Critical", value: 67, color: "#ef4444" },
];

const riskTrendData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  high: Math.floor(80 + Math.random() * 80),
  critical: Math.floor(20 + Math.random() * 40),
  compliant: Math.floor(1600 + Math.random() * 400),
}));

const controlsData = [
  { framework: "SOC2", coverage: 78 },
  { framework: "ISO27001", coverage: 85 },
  { framework: "GDPR", coverage: 62 },
  { framework: "HIPAA", coverage: 91 },
  { framework: "Financial", coverage: 54 },
];

const severityColor = (s: "high" | "critical" | "medium") =>
  s === "critical" ? "border-l-red-500 bg-red-500/5" : s === "high" ? "border-l-orange-500 bg-orange-500/5" : "border-l-amber-500 bg-amber-500/5";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">Global Compliance Command Center</h1>
        <p className="text-sm text-slate-500 mt-1">AI-powered vendor risk, document intelligence, and immutable audit trails across regions.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-6 gap-4">
        <MetricCard label="Total Vendors" value="2,847" sub="Active in registry" trend="up" trendValue="12 this week" accent="blue" icon={<Globe className="w-4 h-4 text-blue-400" />} />
        <MetricCard label="High Risk Vendors" value="143" sub="Require action" trend="down" trendValue="+3 today" accent="red" icon={<AlertTriangle className="w-4 h-4 text-red-400" />} />
        <MetricCard label="Documents Processed" value="18,420" sub="AI-analyzed" trend="up" trendValue="204 today" accent="violet" icon={<Bot className="w-4 h-4 text-violet-400" />} />
        <MetricCard label="Active Agent Runs" value="27" sub="Running now" accent="amber" icon={<Activity className="w-4 h-4 text-amber-400" />} />
        <MetricCard label="Ledger Events Today" value="91,304" sub="Across all regions" trend="up" trendValue="12k/hr" accent="green" icon={<Zap className="w-4 h-4 text-emerald-400" />} />
        <MetricCard label="Global Sync Health" value="99.999%" sub="All regions healthy" accent="green" icon={<TrendingUp className="w-4 h-4 text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Risk Ring */}
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
          <h3 className="text-sm font-medium text-white mb-4">Global Vendor Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={riskPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {riskPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {riskPieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-slate-400">{d.name}</span>
                <span className="text-xs text-slate-500 ml-auto">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Region Cards */}
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
          <h3 className="text-sm font-medium text-white mb-4">Multi-Region Workload</h3>
          <div className="space-y-3">
            {mockRegions.map((r) => (
              <div key={r.name} className="p-3 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <RegionBadge region={r.name} />
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400">Healthy</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><p className="text-slate-500">Latency</p><p className="text-white font-medium">{r.latency}</p></div>
                  <div><p className="text-slate-500">Writes/min</p><p className="text-white font-medium">{r.writesPerMin}</p></div>
                  <div><p className="text-slate-500">Load</p><p className="text-white font-medium">{r.workload}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agentic Insights */}
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-medium text-white">Agentic Insights</h3>
            <span className="ml-auto text-xs text-slate-500">Live</span>
          </div>
          <div className="space-y-2.5">
            {agenticInsights.map((insight) => (
              <div key={insight.id} className={cn("p-3 rounded-lg border-l-2 text-xs leading-relaxed", severityColor(insight.severity))}>
                <p className="text-slate-300">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Trend Chart */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] p-5">
        <h3 className="text-sm font-medium text-white mb-4">Risk Trend — Last 12 Months</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={riskTrendData}>
            <defs>
              <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }} />
            <Area type="monotone" dataKey="critical" stroke="#ef4444" fill="url(#criticalGrad)" strokeWidth={2} name="Critical" />
            <Area type="monotone" dataKey="high" stroke="#f97316" fill="url(#highGrad)" strokeWidth={2} name="High Risk" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Assessments */}
      <div className="rounded-xl border border-white/8 bg-[#0d1117] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Recent AI Assessments</h3>
          <span className="text-xs text-slate-500">Last 24h</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              {["Vendor", "Region", "Document Type", "Risk Score", "Status", "Last Agent Decision", "Ledger ID"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockVendors.slice(0, 5).map((v) => (
              <tr key={v.id} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 text-slate-200 text-xs font-medium">{v.name}</td>
                <td className="px-4 py-3"><RegionBadge region={v.region} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{v.documents[0]?.type || "—"}</td>
                <td className="px-4 py-3"><RiskBadge level={v.riskLevel} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs capitalize">{v.status.replace("_", " ")}</td>
                <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-[180px]">{v.aiRiskSummary.slice(0, 60)}…</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">EVT-{String(v.recentLedgerEvents).padStart(3, "0")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
