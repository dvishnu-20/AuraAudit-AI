import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import { mockVendors, mockLedgerEvents, mockAgentRuns } from "./mock-data";

const connectionString = process.env.COCKROACH_DB_URL || process.env.DATABASE_URL;

// Only create the pool if a connection string is available
export const pool = connectionString
  ? new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : (null as unknown as Pool);

export async function query(text: string, params?: unknown[]) {
  if (!pool) throw new Error("No database connection string configured.");
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("[DB QUERY]", { text: text.slice(0, 60), duration: `${duration}ms`, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error("[DB ERROR]", err);
    throw err;
  }
}

// Function to automatically seed data if the tables are empty
async function seedMockData() {
  // Check if vendors are empty
  const checkVendors = await pool.query("SELECT COUNT(*) FROM vendors");
  if (parseInt(checkVendors.rows[0].count, 10) === 0) {
    console.log("Seeding mock vendors into CockroachDB...");
    for (const v of mockVendors) {
      await pool.query(
        `INSERT INTO vendors (id, name, region, risk_level, status, ai_risk_summary, recent_ledger_events)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [v.id, v.name, v.region, v.riskLevel, v.status, v.aiRiskSummary, v.recentLedgerEvents]
      );
    }
  }

  // Check if ledger events are empty
  const checkLedger = await pool.query("SELECT COUNT(*) FROM ledger_events");
  if (parseInt(checkLedger.rows[0].count, 10) === 0) {
    console.log("Seeding mock ledger events into CockroachDB...");
    for (const e of mockLedgerEvents) {
      await pool.query(
        `INSERT INTO ledger_events (id, timestamp, vendor_id, vendor_name, event_type, severity, event_message, full_hash, document_hash, prev_ledger_ref, cockroach_transaction_id, policy_rule, region)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          e.id,
          e.timestamp,
          e.vendorId,
          e.vendorName,
          "SOC2 Audit",
          e.riskDelta > 10 ? "high" : "medium",
          e.agentAction,
          e.fullHash,
          e.documentHash,
          e.prevLedgerRef,
          e.auroraTransactionId,
          e.policyRule,
          e.region,
        ]
      );
    }
  }

  // Check if agent runs are empty
  const checkRuns = await pool.query("SELECT COUNT(*) FROM agent_runs");
  if (parseInt(checkRuns.rows[0].count, 10) === 0) {
    console.log("Seeding mock agent runs into CockroachDB...");
    for (const r of mockAgentRuns) {
      await pool.query(
        `INSERT INTO agent_runs (id, vendor_id, vendor_name, trigger, pipeline, status, started_at, duration, ledger_writes, steps)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          r.id,
          r.vendorId,
          r.vendor,
          r.trigger,
          r.pipeline,
          r.status,
          r.startedAt,
          r.duration,
          r.ledgerWrites,
          JSON.stringify(r.steps),
        ]
      );
    }
  }
}

let _initialized = false;

export async function initDb(): Promise<boolean> {
  if (!connectionString) {
    console.warn("COCKROACH_DB_URL is not set. Running in Demo Mode (mock data fallback).");
    return false;
  }

  if (_initialized) return true;

  try {
    console.log("Initializing CockroachDB Schema...");
    const schemaPath = path.join(process.cwd(), "lib", "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    // Run each statement individually (split on semicolons, skip empty)
    const statements = schemaSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await pool.query(stmt);
    }
    console.log("Schema initialized successfully.");

    await seedMockData();
    console.log("Database seeding verified.");
    _initialized = true;
    return true;
  } catch (err) {
    console.error("CockroachDB initialization failed:", err);
    return false;
  }
}
