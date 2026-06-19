"use client";
import { useState } from "react";
import Link from "next/link";
import { Shield, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) {
      const el = document.getElementById(`code-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>

      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mx-auto mb-6">
        <span className="text-2xl">✉️</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Verify your email</h1>
      <p className="text-sm text-slate-500 mb-8">We sent a 6-digit code to <strong className="text-slate-300">you@acme.com</strong></p>

      <div className="flex items-center justify-center gap-3 mb-6">
        {code.map((digit, i) => (
          <input
            key={i}
            id={`code-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-white/5 border border-white/8 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
          />
        ))}
      </div>

      <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all mb-4">
        Verify Code
      </button>

      <div className="space-y-2">
        <button className="flex items-center justify-center gap-2 w-full text-xs text-slate-500 hover:text-slate-300 transition-colors">
          <RefreshCw className="w-3 h-3" />
          Resend code
        </button>
        <Link href="/login" className="block text-xs text-slate-600 hover:text-slate-400">Change email address</Link>
      </div>
    </div>
  );
}
