import Link from "next/link";
import { Shield, CheckCircle, Lock, Eye, Globe, Archive, Key, Users } from "lucide-react";

const securityFeatures = [
  {
    icon: Eye,
    title: "AI-assisted, not AI-autonomous",
    desc: "Every AI decision is reviewable by a human. No autonomous approval of high-risk vendor actions. The agent proposes; the human approves.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Human approval for high-risk actions",
    desc: "Critical risk escalations, contract renewals, and control overrides require human sign-off. Queue-based review with full audit trail.",
    color: "amber",
  },
  {
    icon: Lock,
    title: "Ledger event hashing",
    desc: "Each ledger event is cryptographically hashed. Document input hash, extracted control hash, and event chain hash are stored immutably.",
    color: "violet",
  },
  {
    icon: Key,
    title: "Role-based access control",
    desc: "Granular RBAC with Compliance Lead, Reviewer, Auditor, and Read-Only roles. Permissions enforced at API and ledger levels.",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Data residency controls",
    desc: "Regional policy engines enforce data residency requirements. EU data stays in EU-West. APAC data stays in ap-southeast-1.",
    color: "cyan",
  },
  {
    icon: Archive,
    title: "Audit log retention",
    desc: "Configurable retention policies (7 years for financial, 5 years for general). Aurora DSQL append-only prevents deletion.",
    color: "green",
  },
  {
    icon: Eye,
    title: "Vendor evidence tracking",
    desc: "Document hashes stored at ingestion time. Tamper detection compares current document hash to original ingestion hash.",
    color: "violet",
  },
  {
    icon: Lock,
    title: "Append-only ledger model",
    desc: "No UPDATE or DELETE operations on audit records. All corrections are new ledger events referencing the original.",
    color: "green",
  },
];

export default function SecurityPage() {
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

      <div className="py-16 px-8 max-w-6xl mx-auto space-y-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SOC2 Type II · ISO27001 · GDPR · HIPAA
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Security & Compliance</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            LedgerGuard AI is built on a security-first architecture. Every design decision prioritizes auditability, human control, and data integrity.
          </p>
        </div>

        {/* Security principle */}
        <div className="p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-3">"AI-assisted, not AI-autonomous"</h2>
            <p className="text-slate-400 leading-relaxed">
              Every compliance decision involving vendor risk, contract renewal, or control override requires human review before being finalized. AI agents analyze, extract, score, and propose — but humans decide. This principle is enforced at the system level, not just as a guideline.
            </p>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-5">
          {securityFeatures.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-[#0d1117]">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-${color}-500/10 border border-${color}-500/20 shrink-0`}>
                <Icon className={`w-5 h-5 text-${color}-400`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance frameworks */}
        <div className="p-8 rounded-2xl border border-white/8 bg-[#0d1117]">
          <h2 className="text-xl font-bold text-white mb-6">Compliance Framework Coverage</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "SOC2 Type II", items: ["CC6.1 Access Controls", "CC6.7 Encryption", "CC7.2 Monitoring", "A1.1 Availability"] },
              { name: "ISO/IEC 27001", items: ["A.5 Org Controls", "A.8 Asset Management", "A.9 Access Control", "A.16 Incident Response"] },
              { name: "GDPR", items: ["Art.28 Processor", "Art.46 Transfers", "Art.30 Records", "Art.32 Security"] },
              { name: "HIPAA", items: ["§164.308 Admin", "§164.310 Physical", "§164.312 Technical", "§164.316 Policies"] },
            ].map(({ name, items }) => (
              <div key={name} className="p-4 rounded-xl bg-white/3 border border-white/5">
                <h3 className="text-sm font-semibold text-white mb-3">{name}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
