"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signup({});
    router.push("/onboarding");
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>

      <h1 className="text-2xl font-bold text-white mb-1">Create your workspace</h1>
      <p className="text-sm text-slate-500 mb-8">Enterprise compliance infrastructure for global vendor risk.</p>

      <div className="space-y-2 mb-6">
        {["Continue with Google", "Continue with Microsoft"].map((label) => (
          <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 text-sm font-medium transition-all">
            <span className="w-5 h-5 rounded bg-white/10 text-xs flex items-center justify-center">{label.includes("Google") ? "G" : "M"}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-xs text-slate-600">or sign up with email</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Full Name</label>
            <input type="text" placeholder="Anirudh Sharma" className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Work Email</label>
            <input type="email" placeholder="you@acme.com" className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Company Name</label>
          <input type="text" placeholder="ACME Corporation" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Company Size</label>
            <select className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 focus:outline-none text-sm">
              {["1–50", "51–250", "251–1,000", "1,000+"].map((o) => <option key={o} className="bg-slate-900">{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">Primary Use Case</label>
            <select className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 focus:outline-none text-sm">
              {["Vendor compliance", "Security questionnaires", "Multi-region audit ledger", "AI document review", "Regulated vendor risk"].map((o) => <option key={o} className="bg-slate-900">{o}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Confirm Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Creating workspace…" : "Create Workspace"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
      </p>
    </div>
  );
}
