"use client";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">Set new password</h1>
      <p className="text-sm text-slate-500 mb-8">Choose a strong password for your compliance workspace.</p>
      <form className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Confirm New Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 text-sm" required />
        </div>
        <Link href="/login">
          <button type="button" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all">
            Reset Password
          </button>
        </Link>
      </form>
    </div>
  );
}
