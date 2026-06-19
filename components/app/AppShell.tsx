"use client";
import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AgentAuditModal } from "./AgentAuditModal";

export function AppShell({ children }: { children: ReactNode }) {
  const [showAuditModal, setShowAuditModal] = useState(false);
  return (
    <div className="flex h-screen bg-[#070b14] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar onRunAudit={() => setShowAuditModal(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      {showAuditModal && <AgentAuditModal onClose={() => setShowAuditModal(false)} />}
    </div>
  );
}
