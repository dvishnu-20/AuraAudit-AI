import type { ReactNode } from "react";
import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";

function FloatingNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav className="glass-panel pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full w-full max-w-5xl shadow-2xl shadow-black/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">LedgerGuard AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: "/dashboard", label: "Solutions" },
              { href: "/architecture", label: "Architecture" },
              { href: "/security", label: "Security" },
              { href: "/pricing", label: "Pricing" },
            ].map(({ href, label }) => (
              <Link key={label} href={href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link 
            href="/demo" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-all group"
          >
            Get Started
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen selection:bg-orange-500/30 selection:text-white bg-noise">
      <FloatingNavbar />
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
}
