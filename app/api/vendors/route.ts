import { NextResponse } from "next/server";
import { initDb, pool } from "@/lib/db";
import { mockVendors } from "@/lib/mock-data";

export async function GET() {
  const dbConnected = await initDb();

  if (!dbConnected) {
    // Return mock data if database is not configured
    return NextResponse.json({ source: "mock", vendors: mockVendors });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM vendors ORDER BY name ASC"
    );
    
    // We map backend database fields back to the schema structure the UI expects
    const vendors = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      region: row.region,
      riskLevel: row.risk_level,
      status: row.status,
      aiRiskSummary: row.ai_risk_summary || "",
      recentLedgerEvents: row.recent_ledger_events || 0,
      globalVendorId: `GVN-${row.id.replace(/\D/g, "") || "000"}`,
      operatingEntity: `${row.name} LLC`,
      complianceTier: row.recent_ledger_events > 5 ? "Tier 1" : "Tier 2",
      requiredFrameworks: ["SOC2", "ISO27001", "GDPR", "HIPAA"].slice(0, (row.recent_ledger_events % 4) + 1),
      lastAudit: row.updated_at.toISOString(),
      documents: [
        {
          id: `DOC-${row.id.replace(/\D/g, "") || "01"}`,
          name: `${row.name}_SOC2_TypeII.pdf`,
          type: "SOC2 Type II",
          uploadedAt: row.updated_at.toISOString(),
          status: "processed"
        }
      ]
    }));

    return NextResponse.json({ source: "cockroachdb", vendors });
  } catch (error: any) {
    console.error("API /api/vendors GET error:", error);
    return NextResponse.json(
      { error: error.message, source: "mock", vendors: mockVendors },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const dbConnected = await initDb();
  
  try {
    const body = await request.json();
    const { name, region, riskLevel = "medium", status = "pending", aiRiskSummary = "" } = body;
    
    if (!name || !region) {
      return NextResponse.json({ error: "Missing name or region" }, { status: 400 });
    }

    const id = `VND-${Math.floor(100 + Math.random() * 900)}`;

    if (!dbConnected) {
      // Mock creation
      const newVendor = {
        id,
        name,
        region,
        riskLevel,
        status,
        aiRiskSummary,
        recentLedgerEvents: 0,
        globalVendorId: `GVN-${id.replace(/\D/g, "")}`,
        operatingEntity: `${name} LLC`,
        complianceTier: "Tier 2",
        requiredFrameworks: ["SOC2"],
        lastAudit: new Date().toISOString(),
        documents: []
      };
      return NextResponse.json({ source: "mock", vendor: newVendor }, { status: 201 });
    }

    const queryText = `
      INSERT INTO vendors (id, name, region, risk_level, status, ai_risk_summary, recent_ledger_events)
      VALUES ($1, $2, $3, $4, $5, $6, 0)
      RETURNING *
    `;
    const result = await pool.query(queryText, [id, name, region, riskLevel, status, aiRiskSummary]);
    
    const row = result.rows[0];
    const createdVendor = {
      id: row.id,
      name: row.name,
      region: row.region,
      riskLevel: row.risk_level,
      status: row.status,
      aiRiskSummary: row.ai_risk_summary || "",
      recentLedgerEvents: 0,
      globalVendorId: `GVN-${row.id.replace(/\D/g, "")}`,
      operatingEntity: `${row.name} LLC`,
      complianceTier: "Tier 2",
      requiredFrameworks: ["SOC2"],
      lastAudit: row.updated_at.toISOString(),
      documents: []
    };

    return NextResponse.json({ source: "cockroachdb", vendor: createdVendor }, { status: 201 });
  } catch (error: any) {
    console.error("API /api/vendors POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
