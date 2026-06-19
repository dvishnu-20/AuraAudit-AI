"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, CheckCircle, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>

      {!sent ? (
        <>
          <h1 className="text-2xl font-bold text-white mb-1">Reset your password</h1>
          <p className="text-sm text-slate-500 mb-8">Enter your work email to receive reset instructions.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Work Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@acme.com" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
            </div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all disabled:opacity-60">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-4">
            <CheckCircle className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
          <p className="text-sm text-slate-500">Password reset instructions sent to <strong className="text-slate-300">{email}</strong></p>
        </div>
      )}

      <Link href="/login" className="block text-center text-xs text-slate-600 hover:text-slate-400 mt-6">← Back to login</Link>
    </div>
  );
}
