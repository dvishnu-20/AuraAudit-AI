"use client";
import Link from "next/link";
import { Shield } from "lucide-react";

const ssoProviders = [
  { name: "Okta", color: "border-blue-500/20 bg-blue-500/5 text-blue-400", abbr: "Ok" },
  { name: "Azure AD", color: "border-sky-500/20 bg-sky-500/5 text-sky-400", abbr: "Az" },
  { name: "Google Workspace", color: "border-red-500/20 bg-red-500/5 text-red-400", abbr: "GW" },
  { name: "OneLogin", color: "border-violet-500/20 bg-violet-500/5 text-violet-400", abbr: "OL" },
];

export default function SSOPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">Single Sign-On</h1>
      <p className="text-sm text-slate-500 mb-8">Enter your company domain to continue with SSO.</p>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Company Domain</label>
          <input type="text" placeholder="acme.com" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" />
        </div>

        <Link href="/login">
          <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all">
            Continue with SSO
          </button>
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-xs text-slate-500 mb-3">Supported SSO providers</p>
        <div className="grid grid-cols-2 gap-2">
          {ssoProviders.map((p) => (
            <div key={p.name} className={`flex items-center gap-2 p-3 rounded-lg border ${p.color}`}>
              <div className={`flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${p.color}`}>{p.abbr}</div>
              <span className="text-xs text-slate-300">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/login" className="block text-center text-xs text-slate-600 hover:text-slate-400 mt-6">← Back to login</Link>
    </div>
  );
}
