import { NextResponse } from "next/server";
import { initDb, pool } from "@/lib/db";
import { mockLedgerEvents } from "@/lib/mock-data";
import * as crypto from "crypto";

export async function GET() {
  const dbConnected = await initDb();

  if (!dbConnected) {
    return NextResponse.json({ source: "mock", events: mockLedgerEvents });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM ledger_events ORDER BY timestamp DESC"
    );

    // Map DB columns to the LedgerEvent interface structure the frontend expects
    const events = result.rows.map((row, index) => {
      // Calculate a pseudo sequence number for display
      const sequence = 9481204 - index;
      const fullHash = row.full_hash || "";
      const hashPreview = fullHash ? `${fullHash.slice(0, 6)}...${fullHash.slice(-6)}` : "—";
      
      return {
        id: row.id,
        sequence,
        timestamp: row.timestamp.toISOString(),
        region: row.region,
        vendorId: row.vendor_id || "VND-UNK",
        vendorName: row.vendor_name,
        agentAction: row.event_message,
        riskDelta: row.severity === "critical" ? 25 : row.severity === "high" ? 15 : row.severity === "medium" ? 5 : -10,
        policyRule: row.policy_rule || "GENERAL-AUDIT",
        commitStatus: "committed" as const,
        hashPreview,
        fullHash,
        documentHash: row.document_hash || "—",
        aiReasoning: row.event_message,
        humanApprovalStatus: (row.severity === "critical" || row.severity === "high") ? ("pending" as const) : ("not_required" as const),
        prevLedgerRef: row.prev_ledger_ref || "EVT-000",
        auroraTransactionId: row.cockroach_transaction_id || `TXN-CRDB-${row.id.replace(/\D/g, "")}`,
        extractedControls: row.policy_rule ? [row.policy_rule] : []
      };
    });

    return NextResponse.json({ source: "cockroachdb", events });
  } catch (error: any) {
    console.error("API /api/ledger GET error:", error);
    return NextResponse.json(
      { error: error.message, source: "mock", events: mockLedgerEvents },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const dbConnected = await initDb();

  try {
    const body = await request.json();
    const { vendorId, vendorName, eventType, severity = "medium", message, documentHash, policyRule, region } = body;

    if (!vendorName || !message || !region) {
      return NextResponse.json({ error: "Missing required fields (vendorName, message, region)" }, { status: 400 });
    }

    const id = `EVT-${Math.floor(100 + Math.random() * 900)}`;

    if (!dbConnected) {
      // Mock creation fallback
      const prevEvent = mockLedgerEvents[0];
      const prevHash = prevEvent?.fullHash || "0".repeat(64);
      const dataToHash = id + message + prevHash;
      const fullHash = crypto.createHash("sha256").update(dataToHash).digest("hex");
      const hashPreview = `${fullHash.slice(0, 6)}...${fullHash.slice(-6)}`;

      const newEvent = {
        id,
        sequence: 9481205 + Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
        region,
        vendorId: vendorId || "VND-MOCK",
        vendorName,
        agentAction: message,
        riskDelta: severity === "critical" ? 25 : severity === "high" ? 15 : 5,
        policyRule: policyRule || "GEN-01",
        commitStatus: "committed" as const,
        hashPreview,
        fullHash,
        documentHash: documentHash || "—",
        aiReasoning: message,
        humanApprovalStatus: "not_required" as const,
        prevLedgerRef: prevEvent?.id || "EVT-000",
        auroraTransactionId: `TXN-MOCK-${Math.floor(10000 + Math.random() * 90000)}`,
        extractedControls: [policyRule || "GEN-01"]
      };

      return NextResponse.json({ source: "mock", event: newEvent }, { status: 201 });
    }

    // 1. Fetch the last ledger event to chain the hash
    const lastEventQuery = await pool.query(
      "SELECT id, full_hash FROM ledger_events ORDER BY timestamp DESC LIMIT 1"
    );
    const prevEvent = lastEventQuery.rows[0];
    const prevLedgerRef = prevEvent ? prevEvent.id : "EVT-000";
    const prevHash = prevEvent ? prevEvent.full_hash : "0".repeat(64);

    // 2. Generate SHA-256 Hash for this event (chaining hash)
    const dataToHash = id + message + (documentHash || "") + prevHash;
    const fullHash = crypto.createHash("sha256").update(dataToHash).digest("hex");

    // 3. Generate a mock transaction ID for the commit (simulating DB transaction context)
    const cockroachTxnId = `TXN-CRDB-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;

    // 4. Insert into CockroachDB
    const queryText = `
      INSERT INTO ledger_events (id, vendor_id, vendor_name, event_type, severity, event_message, full_hash, document_hash, prev_ledger_ref, cockroach_transaction_id, policy_rule, region)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    const result = await pool.query(queryText, [
      id,
      vendorId || null,
      vendorName,
      eventType || "Manual Audit",
      severity,
      message,
      fullHash,
      documentHash || null,
      prevLedgerRef,
      cockroachTxnId,
      policyRule || null,
      region
    ]);

    // Update vendor's recent event count and audit timestamp
    if (vendorId) {
      await pool.query(
        "UPDATE vendors SET recent_ledger_events = recent_ledger_events + 1, updated_at = now() WHERE id = $1",
        [vendorId]
      );
    }

    const row = result.rows[0];
    const event = {
      id: row.id,
      sequence: 9481205 + Math.floor(Math.random() * 100),
      timestamp: row.timestamp.toISOString(),
      region: row.region,
      vendorId: row.vendor_id || "VND-UNK",
      vendorName: row.vendor_name,
      agentAction: row.event_message,
      riskDelta: row.severity === "critical" ? 25 : row.severity === "high" ? 15 : 5,
      policyRule: row.policy_rule || "GEN-01",
      commitStatus: "committed" as const,
      hashPreview: `${row.full_hash.slice(0, 6)}...${row.full_hash.slice(-6)}`,
      fullHash: row.full_hash,
      documentHash: row.document_hash || "—",
      aiReasoning: row.event_message,
      humanApprovalStatus: "not_required" as const,
      prevLedgerRef: row.prev_ledger_ref || "EVT-000",
      auroraTransactionId: row.cockroach_transaction_id,
      extractedControls: [row.policy_rule || "GEN-01"]
    };

    return NextResponse.json({ source: "cockroachdb", event }, { status: 201 });
  } catch (error: any) {
    console.error("API /api/ledger POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
