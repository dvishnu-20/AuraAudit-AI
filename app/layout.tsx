import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LedgerGuard AI — Global Agentic Vendor Compliance & Transactional Ledger",
  description: "Ingest vendor evidence, extract compliance controls, monitor regional risk, and write immutable audit trails across globally distributed databases. Powered by CockroachDB.",
  keywords: ["vendor compliance", "SOC2", "ISO27001", "GDPR", "HIPAA", "audit ledger", "CockroachDB", "AI compliance"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="h-full bg-[#070b14] text-white antialiased font-inter">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
