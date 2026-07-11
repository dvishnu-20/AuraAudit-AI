// ============================================================
// LedgerGuard AI — Centralized Mock Data
// ============================================================

export type RiskLevel = "critical" | "high" | "medium" | "low" | "compliant";
export type Region = "US East" | "EU Central" | "APAC Singapore" | "Global";
export type ComplianceStatus = "compliant" | "needs_review" | "non_compliant" | "pending";
export type AgentStatus = "running" | "completed" | "failed" | "queued";
export type LedgerStatus = "committed" | "pending" | "failed";

// ---- VENDORS -------------------------------------------------------

export interface Vendor {
  id: string;
  name: string;
  globalVendorId: string;
  operatingEntity: string;
  region: Region;
  complianceTier: "Tier 1" | "Tier 2" | "Tier 3";
  riskScore: number;
  riskLevel: RiskLevel;
  requiredFrameworks: string[];
  lastAudit: string;
  status: ComplianceStatus;
  documents: VendorDocument[];
  openGaps: string[];
  legalEntities: string[];
  aiRiskSummary: string;
  recentLedgerEvents: number;
}

export interface VendorDocument {
  id: string;
  type: string;
  name: string;
  uploadedAt: string;
  status: "processed" | "pending" | "failed";
  confidence: number;
}

export const mockVendors: Vendor[] = [
  {
    id: "VND-001",
    name: "CloudNova Systems",
    globalVendorId: "GVN-20241001",
    operatingEntity: "CloudNova Inc. (US)",
    region: "US East",
    complianceTier: "Tier 1",
    riskScore: 78,
    riskLevel: "high",
    requiredFrameworks: ["SOC2", "ISO27001", "GDPR"],
    lastAudit: "2024-11-14",
    status: "needs_review",
    aiRiskSummary:
      "SOC2 Type II evidence is 14 months old. Encryption-at-rest controls are unverified. GDPR DPA addendum is missing for EU data processing operations.",
    openGaps: ["SOC2 evidence expired", "Missing GDPR DPA", "Encryption evidence unverified"],
    legalEntities: ["CloudNova Inc. (US)", "CloudNova GmbH (EU)"],
    recentLedgerEvents: 47,
    documents: [
      { id: "DOC-001", type: "SOC2 Report", name: "CloudNova_SOC2_2023.pdf", uploadedAt: "2024-11-01", status: "processed", confidence: 0.91 },
      { id: "DOC-002", type: "ISO Certificate", name: "ISO27001_CloudNova.pdf", uploadedAt: "2024-10-15", status: "processed", confidence: 0.87 },
    ],
  },
  {
    id: "VND-002",
    name: "PacificPay Global",
    globalVendorId: "GVN-20241002",
    operatingEntity: "PacificPay Ltd (SG)",
    region: "APAC Singapore",
    complianceTier: "Tier 1",
    riskScore: 91,
    riskLevel: "critical",
    requiredFrameworks: ["SOC2", "PCI-DSS", "ISO27001", "Financial Terms"],
    lastAudit: "2024-09-30",
    status: "non_compliant",
    aiRiskSummary:
      "Payment terms exceed the 90-day threshold for Tier-1 vendors. PCI-DSS attestation not received for FY2024. Subprocessor list has not been updated in 18 months.",
    openGaps: ["Payment terms >90 days", "PCI-DSS attestation missing", "Subprocessor list stale"],
    legalEntities: ["PacificPay Ltd (SG)", "PacificPay Japan KK"],
    recentLedgerEvents: 112,
    documents: [
      { id: "DOC-003", type: "Financial Terms", name: "PacificPay_FinTerms_2024.pdf", uploadedAt: "2024-09-28", status: "processed", confidence: 0.94 },
    ],
  },
  {
    id: "VND-003",
    name: "MedAxis DataWorks",
    globalVendorId: "GVN-20241003",
    operatingEntity: "MedAxis Corp (US)",
    region: "US East",
    complianceTier: "Tier 1",
    riskScore: 34,
    riskLevel: "low",
    requiredFrameworks: ["HIPAA", "SOC2", "ISO27001"],
    lastAudit: "2024-12-01",
    status: "compliant",
    aiRiskSummary:
      "All HIPAA safeguard controls verified. SOC2 Type II report is current. Incident response plan reviewed and accepted.",
    openGaps: [],
    legalEntities: ["MedAxis Corp (US)"],
    recentLedgerEvents: 29,
    documents: [
      { id: "DOC-004", type: "HIPAA BAA", name: "MedAxis_HIPAA_BAA_2024.pdf", uploadedAt: "2024-12-01", status: "processed", confidence: 0.98 },
      { id: "DOC-005", type: "SOC2 Report", name: "MedAxis_SOC2_2024.pdf", uploadedAt: "2024-11-20", status: "processed", confidence: 0.95 },
    ],
  },
  {
    id: "VND-004",
    name: "QuantumFleet Logistics",
    globalVendorId: "GVN-20241004",
    operatingEntity: "QuantumFleet GmbH (DE)",
    region: "EU Central",
    complianceTier: "Tier 2",
    riskScore: 62,
    riskLevel: "medium",
    requiredFrameworks: ["GDPR", "ISO27001", "DPA"],
    lastAudit: "2024-10-22",
    status: "needs_review",
    aiRiskSummary:
      "GDPR DPA present but subcontractor clauses conflict with internal policy. Cross-border transfer mechanisms need review for adequacy decisions post-Schrems II.",
    openGaps: ["Subcontractor clause conflict", "Cross-border transfer review required"],
    legalEntities: ["QuantumFleet GmbH (DE)", "QuantumFleet SAS (FR)"],
    recentLedgerEvents: 18,
    documents: [
      { id: "DOC-006", type: "DPA", name: "QuantumFleet_DPA_2024.docx", uploadedAt: "2024-10-20", status: "processed", confidence: 0.89 },
    ],
  },
  {
    id: "VND-005",
    name: "SecureBridge Identity",
    globalVendorId: "GVN-20241005",
    operatingEntity: "SecureBridge Inc. (US)",
    region: "US East",
    complianceTier: "Tier 1",
    riskScore: 21,
    riskLevel: "compliant",
    requiredFrameworks: ["SOC2", "ISO27001", "FedRAMP"],
    lastAudit: "2025-01-10",
    status: "compliant",
    aiRiskSummary:
      "All controls verified. FedRAMP moderate authorization active. SOC2 Type II is current within 12-month window.",
    openGaps: [],
    legalEntities: ["SecureBridge Inc. (US)"],
    recentLedgerEvents: 8,
    documents: [
      { id: "DOC-007", type: "SOC2 Report", name: "SecureBridge_SOC2_2025.pdf", uploadedAt: "2025-01-08", status: "processed", confidence: 0.99 },
    ],
  },
  {
    id: "VND-006",
    name: "EuroComply Services",
    globalVendorId: "GVN-20241006",
    operatingEntity: "EuroComply BV (NL)",
    region: "EU Central",
    complianceTier: "Tier 2",
    riskScore: 45,
    riskLevel: "medium",
    requiredFrameworks: ["GDPR", "ISO27001", "DPA"],
    lastAudit: "2024-11-05",
    status: "needs_review",
    aiRiskSummary:
      "ISO27001 certificate renewal pending. GDPR Article 28 obligations fully documented. Data residency confirmed to EU-West.",
    openGaps: ["ISO27001 certificate renewal pending"],
    legalEntities: ["EuroComply BV (NL)", "EuroComply GmbH (DE)"],
    recentLedgerEvents: 22,
    documents: [],
  },
  {
    id: "VND-007",
    name: "ApexCompute Labs",
    globalVendorId: "GVN-20241007",
    operatingEntity: "ApexCompute Inc. (US)",
    region: "US East",
    complianceTier: "Tier 3",
    riskScore: 55,
    riskLevel: "medium",
    requiredFrameworks: ["SOC2", "ISO27001"],
    lastAudit: "2024-08-15",
    status: "needs_review",
    aiRiskSummary:
      "Security questionnaire responses indicate incomplete patch management process. Penetration test report is 16 months old.",
    openGaps: ["Patch management gaps", "Pen test report outdated"],
    legalEntities: ["ApexCompute Inc. (US)"],
    recentLedgerEvents: 6,
    documents: [],
  },
  {
    id: "VND-008",
    name: "DataHarbor APAC",
    globalVendorId: "GVN-20241008",
    operatingEntity: "DataHarbor Pte Ltd (SG)",
    region: "APAC Singapore",
    complianceTier: "Tier 2",
    riskScore: 73,
    riskLevel: "high",
    requiredFrameworks: ["ISO27001", "GDPR", "Financial Terms"],
    lastAudit: "2024-07-30",
    status: "needs_review",
    aiRiskSummary:
      "Cyber insurance policy lapsed. Financial terms contract has auto-renewal clause that was not reviewed in the last cycle. Cross-border payment terms require manual sign-off.",
    openGaps: ["Cyber insurance lapsed", "Auto-renewal clause unreviewed", "Payment terms manual review required"],
    legalEntities: ["DataHarbor Pte Ltd (SG)", "DataHarbor Japan KK"],
    recentLedgerEvents: 34,
    documents: [],
  },
];

// ---- LEDGER EVENTS -------------------------------------------------

export interface LedgerEvent {
  id: string;
  sequence: number;
  timestamp: string;
  region: Region;
  vendorId: string;
  vendorName: string;
  agentAction: string;
  riskDelta: number;
  policyRule: string;
  commitStatus: LedgerStatus;
  hashPreview: string;
  fullHash: string;
  documentHash: string;
  aiReasoning: string;
  humanApprovalStatus: "approved" | "pending" | "not_required";
  prevLedgerRef: string;
  auroraTransactionId: string;
  extractedControls: string[];
}

export const mockLedgerEvents: LedgerEvent[] = [
  {
    id: "EVT-001",
    sequence: 9481204,
    timestamp: new Date(Date.now() - 12000).toISOString(),
    region: "US East",
    vendorId: "VND-001",
    vendorName: "CloudNova Systems",
    agentAction: "SOC2 Evidence Expired — Risk Escalated",
    riskDelta: +18,
    policyRule: "SOC2-12M-EXPIRY",
    commitStatus: "committed",
    hashPreview: "a3f9d2...c8e1b4",
    fullHash: "a3f9d2c7b1e84f920d3a67c8e1b4f29a3d5c7e9b1f3a5c7d9e1b3f5a7c9d1e3",
    documentHash: "d7a3f9c2b8e1f4a0c6d2b8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8",
    aiReasoning: "SOC2 Type II report dated November 2023 is now 14 months old, exceeding the 12-month policy threshold. Risk score increased by 18 points. Human review required before renewal.",
    humanApprovalStatus: "pending",
    prevLedgerRef: "EVT-000",
    auroraTransactionId: "TXN-AURORA-20250119-09481203",
    extractedControls: ["CC6.1 Logical Access", "CC7.2 Monitoring", "A1.1 Availability"],
  },
  {
    id: "EVT-002",
    sequence: 9481203,
    timestamp: new Date(Date.now() - 45000).toISOString(),
    region: "APAC Singapore",
    vendorId: "VND-002",
    vendorName: "PacificPay Global",
    agentAction: "Payment Terms Violation Detected",
    riskDelta: +24,
    policyRule: "FIN-PAYTERM-90D",
    commitStatus: "committed",
    hashPreview: "b7e3a1...f2d8c5",
    fullHash: "b7e3a1c9d5f7a3c9d5f7a3c9d5f7a3c9d5f7a3c9d5f7a3c9d5f7a3c9d5f7a3",
    documentHash: "e9b5d1a7c3e9b5d1a7c3e9b5d1a7c3e9b5d1a7c3e9b5d1a7c3e9b5d1a7c3e9",
    aiReasoning: "Payment terms contract specifies Net-120 days, exceeding the maximum allowed threshold of 90 days for Tier-1 financial vendors. Immediate human review flagged.",
    humanApprovalStatus: "pending",
    prevLedgerRef: "EVT-001",
    auroraTransactionId: "TXN-AURORA-20250119-09481202",
    extractedControls: ["FIN-01 Payment Terms", "FIN-03 Subprocessor Governance"],
  },
  {
    id: "EVT-003",
    sequence: 9481202,
    timestamp: new Date(Date.now() - 120000).toISOString(),
    region: "EU Central",
    vendorId: "VND-004",
    vendorName: "QuantumFleet Logistics",
    agentAction: "GDPR DPA Subcontractor Clause Conflict",
    riskDelta: +12,
    policyRule: "GDPR-ART28-SUBPROC",
    commitStatus: "committed",
    hashPreview: "c2d8f4...e6a0b7",
    fullHash: "c2d8f4e6a0b7c2d8f4e6a0b7c2d8f4e6a0b7c2d8f4e6a0b7c2d8f4e6a0b7c2",
    documentHash: "f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0",
    aiReasoning: "DPA subcontractor clause allows processor substitution without prior written consent, conflicting with internal GDPR policy GDR-28B. Risk elevated. Escalated to EU compliance team.",
    humanApprovalStatus: "approved",
    prevLedgerRef: "EVT-002",
    auroraTransactionId: "TXN-AURORA-20250119-09481201",
    extractedControls: ["GDPR-Art28 Processor Agreement", "GDPR-Art46 Transfer Mechanisms"],
  },
  {
    id: "EVT-004",
    sequence: 9481201,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    region: "US East",
    vendorId: "VND-003",
    vendorName: "MedAxis DataWorks",
    agentAction: "HIPAA BAA Controls Verified — Risk Reduced",
    riskDelta: -15,
    policyRule: "HIPAA-BAA-VERIFY",
    commitStatus: "committed",
    hashPreview: "d4f0b2...a8e6c3",
    fullHash: "d4f0b2a8e6c3d4f0b2a8e6c3d4f0b2a8e6c3d4f0b2a8e6c3d4f0b2a8e6c3d4",
    documentHash: "a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6c2d8e4f0a6",
    aiReasoning: "HIPAA Business Associate Agreement reviewed. All 18 HIPAA safeguard controls verified against internal policy. Administrative, physical, and technical safeguards all confirmed. Risk score reduced.",
    humanApprovalStatus: "approved",
    prevLedgerRef: "EVT-003",
    auroraTransactionId: "TXN-AURORA-20250119-09481200",
    extractedControls: ["HIPAA §164.308 Administrative", "HIPAA §164.310 Physical", "HIPAA §164.312 Technical"],
  },
  {
    id: "EVT-005",
    sequence: 9481200,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    region: "APAC Singapore",
    vendorId: "VND-008",
    vendorName: "DataHarbor APAC",
    agentAction: "Cyber Insurance Policy Lapsed — Critical Alert",
    riskDelta: +31,
    policyRule: "INS-CYBER-REQUIRED",
    commitStatus: "committed",
    hashPreview: "e6a2d8...b4f0c1",
    fullHash: "e6a2d8b4f0c1e6a2d8b4f0c1e6a2d8b4f0c1e6a2d8b4f0c1e6a2d8b4f0c1e6",
    documentHash: "b4f0c1e6a2d8b4f0c1e6a2d8b4f0c1e6a2d8b4f0c1e6a2d8b4f0c1e6a2d8b4",
    aiReasoning: "Cyber liability insurance certificate expired 2024-12-31. Policy renewal confirmation has not been received. All Tier-2 APAC vendors are required to maintain active cyber insurance per policy INS-CYBER-REQUIRED.",
    humanApprovalStatus: "pending",
    prevLedgerRef: "EVT-004",
    auroraTransactionId: "TXN-AURORA-20250119-09481199",
    extractedControls: ["INS-01 Cyber Liability", "INS-02 Business Continuity"],
  },
  {
    id: "EVT-006",
    sequence: 9481199,
    timestamp: new Date(Date.now() - 900000).toISOString(),
    region: "EU Central",
    vendorId: "VND-006",
    vendorName: "EuroComply Services",
    agentAction: "ISO27001 Certificate Renewal Flagged",
    riskDelta: +9,
    policyRule: "ISO27001-CERT-EXPIRY",
    commitStatus: "committed",
    hashPreview: "f8c4e0...d2b6a9",
    fullHash: "f8c4e0d2b6a9f8c4e0d2b6a9f8c4e0d2b6a9f8c4e0d2b6a9f8c4e0d2b6a9f8",
    documentHash: "c6d0e2f4a8b0c6d0e2f4a8b0c6d0e2f4a8b0c6d0e2f4a8b0c6d0e2f4a8b0c6",
    aiReasoning: "ISO/IEC 27001:2022 certificate expiry date is 45 days from now. Renewal documentation not yet received. Flagged for EU compliance team follow-up.",
    humanApprovalStatus: "not_required",
    prevLedgerRef: "EVT-005",
    auroraTransactionId: "TXN-AURORA-20250119-09481198",
    extractedControls: ["ISO27001 A.5 Org Controls", "ISO27001 A.8 Asset Management"],
  },
];

// ---- AGENT RUNS ----------------------------------------------------

export interface AgentRun {
  id: string;
  vendor: string;
  vendorId: string;
  trigger: string;
  pipeline: string[];
  status: AgentStatus;
  startedAt: string;
  duration: string;
  ledgerWrites: number;
  steps: AgentStep[];
}

export interface AgentStep {
  step: number;
  name: string;
  status: "completed" | "running" | "pending" | "failed";
  output: string;
  duration: string;
}

export const mockAgentRuns: AgentRun[] = [
  {
    id: "RUN-4821",
    vendor: "CloudNova Systems",
    vendorId: "VND-001",
    trigger: "SOC2 Upload",
    pipeline: ["Document Parser", "Control Mapper", "Risk Scorer", "Ledger Writer"],
    status: "completed",
    startedAt: new Date(Date.now() - 600000).toISOString(),
    duration: "4m 12s",
    ledgerWrites: 3,
    steps: [
      { step: 1, name: "Ingested SOC2 PDF", status: "completed", output: "152-page SOC2 Type II report parsed. 94 control assertions extracted.", duration: "1m 2s" },
      { step: 2, name: "Extracted compliance controls", status: "completed", output: "Mapped to 31 internal policy controls. CC6.1, CC7.2, A1.1 verified.", duration: "48s" },
      { step: 3, name: "Matched to internal policy", status: "completed", output: "SOC2 evidence dated Nov 2023 — 14 months old. Threshold exceeded.", duration: "22s" },
      { step: 4, name: "Detected missing encryption evidence", status: "completed", output: "Encryption-at-rest control CC6.7 has no supporting evidence artifact.", duration: "15s" },
      { step: 5, name: "Raised risk score +18", status: "completed", output: "Risk score increased from 60 to 78. Flagged for human review.", duration: "8s" },
      { step: 6, name: "Wrote immutable audit entry", status: "completed", output: "Ledger event EVT-001 committed to CockroachDB. Hash: a3f9d2...c8e1b4", duration: "37s" },
    ],
  },
  {
    id: "RUN-4820",
    vendor: "PacificPay Global",
    vendorId: "VND-002",
    trigger: "Scheduled Review",
    pipeline: ["Document Parser", "Control Mapper", "Risk Scorer", "Policy Validator", "Ledger Writer"],
    status: "completed",
    startedAt: new Date(Date.now() - 1800000).toISOString(),
    duration: "6m 44s",
    ledgerWrites: 5,
    steps: [
      { step: 1, name: "Ingested Financial Terms PDF", status: "completed", output: "Financial terms contract parsed. Payment terms: Net-120 days detected.", duration: "55s" },
      { step: 2, name: "Extracted financial controls", status: "completed", output: "FIN-01 Payment Terms, FIN-03 Subprocessor Governance extracted.", duration: "38s" },
      { step: 3, name: "Validated against regional policy", status: "completed", output: "APAC policy FIN-PAYTERM-90D: Net-120 exceeds 90-day maximum.", duration: "29s" },
      { step: 4, name: "Raised risk score +24", status: "completed", output: "Risk score increased from 67 to 91. Critical threshold crossed.", duration: "12s" },
      { step: 5, name: "Wrote immutable audit entry", status: "completed", output: "Ledger event EVT-002 committed. Human review queue notified.", duration: "42s" },
    ],
  },
  {
    id: "RUN-4819",
    vendor: "MedAxis DataWorks",
    vendorId: "VND-003",
    trigger: "Document Upload",
    pipeline: ["Document Parser", "Control Mapper", "Risk Scorer", "Ledger Writer"],
    status: "running",
    startedAt: new Date(Date.now() - 120000).toISOString(),
    duration: "2m 01s",
    ledgerWrites: 1,
    steps: [
      { step: 1, name: "Ingested HIPAA BAA", status: "completed", output: "HIPAA BAA document processed. 18 safeguard controls identified.", duration: "44s" },
      { step: 2, name: "Mapping controls to policy", status: "running", output: "Matching HIPAA §164.308 administrative safeguards…", duration: "ongoing" },
      { step: 3, name: "Risk scoring", status: "pending", output: "—", duration: "—" },
      { step: 4, name: "Ledger write", status: "pending", output: "—", duration: "—" },
    ],
  },
  {
    id: "RUN-4818",
    vendor: "QuantumFleet Logistics",
    vendorId: "VND-004",
    trigger: "Manual Trigger",
    pipeline: ["Document Parser", "Control Mapper", "Policy Validator", "Human Escalation", "Ledger Writer"],
    status: "completed",
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    duration: "8m 17s",
    ledgerWrites: 4,
    steps: [
      { step: 1, name: "Ingested GDPR DPA", status: "completed", output: "DPA parsed. Article 28 processor agreement identified.", duration: "1m 12s" },
      { step: 2, name: "Extracted GDPR controls", status: "completed", output: "Art28 obligations, Art46 transfer mechanisms extracted.", duration: "52s" },
      { step: 3, name: "Detected subcontractor clause conflict", status: "completed", output: "Subprocessor substitution without consent violates GDR-28B.", duration: "38s" },
      { step: 4, name: "Escalated to Human Review", status: "completed", output: "Ticket HRV-0421 created. EU compliance team notified.", duration: "10s" },
      { step: 5, name: "Wrote immutable audit entry", status: "completed", output: "Ledger event EVT-003 committed to CockroachDB.", duration: "25s" },
    ],
  },
];

// ---- RISK SIGNALS --------------------------------------------------

export interface RiskSignal {
  id: string;
  vendor: string;
  region: Region;
  signalType: string;
  severity: RiskLevel;
  triggerRule: string;
  currentState: string;
  lastUpdated: string;
}

export const mockRiskSignals: RiskSignal[] = [
  { id: "SIG-001", vendor: "CloudNova Systems", region: "US East", signalType: "Evidence Expiry", severity: "high", triggerRule: "SOC2-12M-EXPIRY", currentState: "SOC2 evidence 14 months old", lastUpdated: new Date(Date.now() - 12000).toISOString() },
  { id: "SIG-002", vendor: "PacificPay Global", region: "APAC Singapore", signalType: "Financial Term Violation", severity: "critical", triggerRule: "FIN-PAYTERM-90D", currentState: "Net-120 detected. Threshold: Net-90", lastUpdated: new Date(Date.now() - 45000).toISOString() },
  { id: "SIG-003", vendor: "QuantumFleet Logistics", region: "EU Central", signalType: "GDPR Policy Conflict", severity: "medium", triggerRule: "GDPR-ART28-SUBPROC", currentState: "Subcontractor clause conflict", lastUpdated: new Date(Date.now() - 120000).toISOString() },
  { id: "SIG-004", vendor: "DataHarbor APAC", region: "APAC Singapore", signalType: "Insurance Lapse", severity: "critical", triggerRule: "INS-CYBER-REQUIRED", currentState: "Cyber insurance expired 2024-12-31", lastUpdated: new Date(Date.now() - 600000).toISOString() },
  { id: "SIG-005", vendor: "EuroComply Services", region: "EU Central", signalType: "Certificate Expiry", severity: "medium", triggerRule: "ISO27001-CERT-EXPIRY", currentState: "Certificate expires in 45 days", lastUpdated: new Date(Date.now() - 900000).toISOString() },
  { id: "SIG-006", vendor: "ApexCompute Labs", region: "US East", signalType: "Pen Test Outdated", severity: "medium", triggerRule: "PENTEST-12M-RULE", currentState: "Pen test report 16 months old", lastUpdated: new Date(Date.now() - 1800000).toISOString() },
];

// ---- REGION SYNC ---------------------------------------------------

export interface RegionSyncCheck {
  id: string;
  entity: string;
  usValue: string;
  euValue: string;
  apacValue: string;
  result: "consistent" | "inconsistent" | "pending";
}

export const mockRegionSyncChecks: RegionSyncCheck[] = [
  { id: "CHK-001", entity: "Vendor Registry Schema", usValue: "v2.14.1", euValue: "v2.14.1", apacValue: "v2.14.1", result: "consistent" },
  { id: "CHK-002", entity: "Audit Log Sequence", usValue: "9,481,204", euValue: "9,481,204", apacValue: "9,481,204", result: "consistent" },
  { id: "CHK-003", entity: "Risk Telemetry Config", usValue: "v3.2.0", euValue: "v3.2.0", apacValue: "v3.2.0", result: "consistent" },
  { id: "CHK-004", entity: "Compliance Schema Version", usValue: "v5.1.2", euValue: "v5.1.2", apacValue: "v5.1.2", result: "consistent" },
  { id: "CHK-005", entity: "Policy Engine Rules", usValue: "rule-set-47", euValue: "rule-set-47", apacValue: "rule-set-47", result: "consistent" },
  { id: "CHK-006", entity: "Regional Policy Overrides", usValue: "12 rules", euValue: "9 rules", apacValue: "7 rules", result: "consistent" },
];

export const mockRegions = [
  { name: "US East" as Region, role: "Active Writer", workload: "42%", latency: "18ms", writesPerMin: "1,204", schemaVersion: "v2.14.1", health: "healthy" as const },
  { name: "EU Central" as Region, role: "Active Writer", workload: "31%", latency: "24ms", writesPerMin: "891", schemaVersion: "v2.14.1", health: "healthy" as const },
  { name: "APAC Singapore" as Region, role: "Active Writer", workload: "27%", latency: "31ms", writesPerMin: "723", schemaVersion: "v2.14.1", health: "healthy" as const },
];

// ---- REPORTS -------------------------------------------------------

export interface Report {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
  format: "PDF" | "CSV" | "JSON";
  size: string;
  framework?: string;
}

export const mockReports: Report[] = [
  { id: "RPT-001", name: "Executive Risk Summary", description: "High-level vendor risk posture across all regions with KPI trends and board-ready summary.", lastGenerated: "2025-01-19T08:00:00Z", format: "PDF", size: "2.4 MB" },
  { id: "RPT-002", name: "SOC2 Vendor Gap Report", description: "Identifies vendors with missing, expired, or non-compliant SOC2 evidence.", lastGenerated: "2025-01-18T14:30:00Z", format: "PDF", size: "1.8 MB", framework: "SOC2" },
  { id: "RPT-003", name: "ISO27001 Evidence Report", description: "Full audit trail of ISO27001 certificate verifications and control mappings.", lastGenerated: "2025-01-17T11:00:00Z", format: "CSV", size: "890 KB", framework: "ISO27001" },
  { id: "RPT-004", name: "GDPR Cross-Border Processing Report", description: "Documents all GDPR data processing activities, DPA statuses, and transfer mechanisms.", lastGenerated: "2025-01-19T06:00:00Z", format: "PDF", size: "3.1 MB", framework: "GDPR" },
  { id: "RPT-005", name: "High-Risk Vendor Renewal Report", description: "Vendors requiring contract renewal within 90 days with risk scores and gap analysis.", lastGenerated: "2025-01-16T09:45:00Z", format: "CSV", size: "420 KB" },
  { id: "RPT-006", name: "Global Audit Ledger Export", description: "Complete append-only audit trail export from CockroachDB with cryptographic hashes.", lastGenerated: "2025-01-19T00:00:00Z", format: "JSON", size: "48.7 MB" },
];

// ---- COMPLIANCE SCHEMAS --------------------------------------------

export interface ComplianceSchema {
  id: string;
  name: string;
  framework: string;
  requiredEvidence: string[];
  extractedEvidence: string[];
  verificationStatus: "verified" | "partial" | "missing" | "pending";
  confidence: number;
  humanApprovalRequired: boolean;
}

export const mockSchemas: ComplianceSchema[] = [
  {
    id: "SCH-001",
    name: "SOC2 Security",
    framework: "SOC2 Type II",
    requiredEvidence: ["Access Control Policy", "Encryption Certificate", "Penetration Test", "Incident Response Plan", "Change Management Process"],
    extractedEvidence: ["Access Control Policy", "Incident Response Plan", "Change Management Process"],
    verificationStatus: "partial",
    confidence: 0.84,
    humanApprovalRequired: true,
  },
  {
    id: "SCH-002",
    name: "SOC2 Availability",
    framework: "SOC2 Type II",
    requiredEvidence: ["Uptime SLA", "Disaster Recovery Plan", "Backup Policy", "Monitoring Dashboard"],
    extractedEvidence: ["Uptime SLA", "Backup Policy"],
    verificationStatus: "partial",
    confidence: 0.71,
    humanApprovalRequired: false,
  },
  {
    id: "SCH-003",
    name: "ISO27001 Access Control",
    framework: "ISO/IEC 27001:2022",
    requiredEvidence: ["Access Control Policy", "User Access Review", "Privileged Access Management", "Identity Verification"],
    extractedEvidence: ["Access Control Policy", "User Access Review", "Privileged Access Management", "Identity Verification"],
    verificationStatus: "verified",
    confidence: 0.97,
    humanApprovalRequired: false,
  },
  {
    id: "SCH-004",
    name: "GDPR Data Processing",
    framework: "GDPR",
    requiredEvidence: ["Data Processing Agreement", "Subprocessor List", "Data Residency Statement", "Transfer Mechanism Documentation"],
    extractedEvidence: ["Data Processing Agreement", "Data Residency Statement"],
    verificationStatus: "partial",
    confidence: 0.68,
    humanApprovalRequired: true,
  },
  {
    id: "SCH-005",
    name: "HIPAA Safeguards",
    framework: "HIPAA",
    requiredEvidence: ["BAA Agreement", "Administrative Safeguards", "Physical Safeguards", "Technical Safeguards", "Workforce Training"],
    extractedEvidence: ["BAA Agreement", "Administrative Safeguards", "Physical Safeguards", "Technical Safeguards", "Workforce Training"],
    verificationStatus: "verified",
    confidence: 0.99,
    humanApprovalRequired: false,
  },
  {
    id: "SCH-006",
    name: "Cross-Border Payment Terms",
    framework: "Financial Compliance",
    requiredEvidence: ["Payment Terms Contract", "Currency Risk Statement", "Escrow Requirements", "Audit Rights Clause"],
    extractedEvidence: ["Payment Terms Contract"],
    verificationStatus: "missing",
    confidence: 0.42,
    humanApprovalRequired: true,
  },
  {
    id: "SCH-007",
    name: "Subprocessor Governance",
    framework: "GDPR / Contractual",
    requiredEvidence: ["Subprocessor Registry", "Written Consent Records", "Subprocessor DPA", "Annual Review Documentation"],
    extractedEvidence: ["Subprocessor Registry"],
    verificationStatus: "missing",
    confidence: 0.38,
    humanApprovalRequired: true,
  },
];

// ---- MOCK USER & AUTH ---------------------------------------------

export const mockUser = {
  id: "USR-001",
  name: "Anirudh Sharma",
  email: "anirudh@acme-corp.com",
  role: "Compliance Lead",
  organization: "ACME Corporation",
  avatar: "AS",
  region: "US East" as Region,
};

// ---- AGENTIC INSIGHTS ---------------------------------------------

export const agenticInsights = [
  { id: "INS-001", severity: "high" as const, message: "12 vendors have expired SOC2 evidence exceeding the 12-month policy window." },
  { id: "INS-002", severity: "critical" as const, message: "EU subcontractor clauses in 3 DPAs conflict with internal GDPR policy GDR-28B." },
  { id: "INS-003", severity: "critical" as const, message: "APAC payment terms for PacificPay Global exceed the allowed 90-day threshold for Tier-1 vendors." },
  { id: "INS-004", severity: "high" as const, message: "3 vendors require human approval before contract renewal in the next 30 days." },
  { id: "INS-005", severity: "medium" as const, message: "ISO27001 certificates for 2 EU vendors expire within 45 days. Renewal documentation not received." },
  { id: "INS-006", severity: "medium" as const, message: "DataHarbor APAC cyber insurance has lapsed. Policy requires active coverage for all APAC Tier-2 vendors." },
];
