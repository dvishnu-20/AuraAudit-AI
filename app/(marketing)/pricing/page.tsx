import Link from "next/link";
import { Shield, Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Compliance Team",
    target: "SMB & mid-market",
    price: "Contact Sales",
    color: "border-white/8",
    features: [
      "Up to 500 vendors",
      "AI document intake",
      "Risk dashboard",
      "SOC2 & ISO27001",
      "Basic compliance reports",
      "Single region",
      "Email support",
    ],
    cta: "Start Demo",
    ctaHref: "/demo",
    highlight: false,
  },
  {
    name: "Global Enterprise",
    target: "Enterprise teams",
    price: "Contact Sales",
    color: "border-blue-500/30 bg-blue-500/5",
    features: [
      "Unlimited vendors",
      "Multi-region compliance",
      "CockroachDB ledger",
      "Advanced risk telemetry",
      "Human review workflows",
      "SOC2, ISO27001, GDPR, HIPAA",
      "Compliance report builder",
      "Priority support",
    ],
    cta: "Contact Sales",
    ctaHref: "/demo",
    highlight: true,
  },
  {
    name: "Regulated Industry",
    target: "Financial & healthcare",
    price: "Contact Sales",
    color: "border-violet-500/20",
    features: [
      "Everything in Enterprise",
      "HIPAA/GDPR-heavy workflows",
      "Custom policy engines",
      "Audit export automation",
      "Dedicated compliance controls",
      "On-prem option available",
      "SLA guarantees",
      "Dedicated CSM",
    ],
    cta: "Contact Sales",
    ctaHref: "/demo",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-16 border-b border-white/5 bg-[#070b14]/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">LedgerGuard AI</span>
        </Link>
        <Link href="/dashboard" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium">Launch Dashboard</Link>
      </nav>

      <div className="py-20 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Enterprise-grade compliance infrastructure</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Purpose-built for compliance teams managing global vendor risk at scale. All plans include AI-assisted, not AI-autonomous workflows.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border p-8 ${plan.color} ${plan.highlight ? "shadow-2xl shadow-blue-500/10" : ""}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-sm text-slate-500">{plan.target}</p>
              </div>
              <div className="mb-8">
                <p className="text-2xl font-bold text-white">{plan.price}</p>
                <p className="text-xs text-slate-600 mt-1">Annual contract · custom pricing based on vendor count</p>
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
              <Link href={plan.ctaHref}>
                <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${plan.highlight ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500" : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/8"}`}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 rounded-2xl border border-white/8 bg-[#0d1117]">
          <p className="text-sm text-slate-400">All plans include SOC2-ready infrastructure, immutable audit trails, and human-reviewable AI decisions.</p>
          <p className="text-xs text-slate-600 mt-2">Powered by CockroachDB · Active-active multi-region · GDPR + HIPAA compliant architecture</p>
        </div>
      </div>
    </>
  );
}
