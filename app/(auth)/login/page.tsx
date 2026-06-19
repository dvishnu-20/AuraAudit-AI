"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="text-base font-semibold text-white">LedgerGuard AI</span>
      </div>

      <h1 className="text-2xl font-bold text-white mb-1">Sign in to your workspace</h1>
      <p className="text-sm text-slate-500 mb-8">Protected workspace access for enterprise compliance teams.</p>

      {/* OAuth buttons */}
      <div className="space-y-2 mb-6">
        {[
          { label: "Continue with Google", icon: "G" },
          { label: "Continue with Microsoft", icon: "M" },
          { label: "Continue with SSO", icon: "⊞" },
        ].map(({ label, icon }) => (
          <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-300 hover:bg-white/8 hover:text-white transition-all text-sm font-medium">
            <span className="w-5 h-5 rounded flex items-center justify-center bg-white/10 text-xs">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-xs text-slate-600">or continue with email</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@acme.com"
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all text-sm"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-3.5 h-3.5 accent-blue-500" />
            <span className="text-xs text-slate-400">Remember this device</span>
          </label>
          <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-violet-500 transition-all disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="mt-6 space-y-2 text-center">
        <p className="text-xs text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">Create workspace</Link>
        </p>
        <Link href="/" className="block text-xs text-slate-600 hover:text-slate-400">← Back to landing page</Link>
      </div>
    </div>
  );
}
