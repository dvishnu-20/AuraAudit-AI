# 🛡️ LedgerGuard AI (AuraAudit)
### Global Distributed Compliance Ledger & Agentic Risk Auditor
*Built for the CockroachDB × AWS Hackathon 2026*

LedgerGuard AI (formerly AuraAudit) is an enterprise-grade agentic AI compliance platform that transforms unstructured compliance documents into queryable, auditable, and immutable risk profiles. Backed by **CockroachDB's** distributed transaction consistency and pgvector semantic capabilities, and executed via **Amazon Bedrock (Claude 3.5 Sonnet)** on AWS.

---

## 🚀 Key Platform Features

1. **🤖 Multi-Agent Compliance Pipeline**:
   - **Document Parser Agent**: Extracts assertions from complex BAAs, SOC2s, and DPAs.
   - **Control Mapping Agent**: Resolves text assertions against corporate compliance frameworks (SOC2, ISO27001, GDPR, HIPAA) using Bedrock semantic analysis.
   - **Risk Scoring Agent**: Evaluates risk delta and updates vendor tiers.
   - **Ledger Writer Agent**: Writes cryptographically chained SHA-256 blocks to CockroachDB.

2. **🔗 Cryptographically Chained Ledger**:
   - Every compliance decision and agent action is recorded as an immutable ledger event.
   - Events are linked using SHA-256 hashes, forming a tamper-proof chain of custody stored in CockroachDB.

3. **🌍 Active-Active Multi-Region Replication**:
   - Strongly consistent topology spanning US East, EU Central, and APAC Singapore.
   - Low-latency access and local data residency policy compliance (e.g. GDPR controls in EU, MAS controls in APAC).

4. **⚡ Complete Application Interactivity**:
   - **Add Vendor Modal**: Interactive form allowing creation of vendor profiles, compliance tiers, and required frameworks.
   - **Document Upload Zone**: Drop compliance files to trigger parsing with live upload progress animations.
   - **Start Agent Run Modal**: Spin up real-time audit pipelines on specific vendors.
   - **Inline Step Trace**: Table expanders to monitor live agent execution steps.
   - **Search Command Palette (⌘K)**: Quick global search for app navigation and registry lookup.
   - **Notification Center**: Dropdown dashboard alerting teams of risk changes, transaction logs, and pipeline completions.
   - **Report Builder**: Select regions, frameworks, and date ranges to generate a custom JSON/PDF report package.

---

## 🏆 Hackathon Alignment & Technology Stack

### CockroachDB Features Utilized
- **Distributed Vector Indexing (pgvector)**: Leverages `document_chunks.embedding VECTOR(1536)` with an HNSW index to run similarity searches across policy clauses.
- **Strong Global Consistency**: Implements multi-region schema validation to verify multi-region write latency and zero replication lag.
- **Managed MCP Server**: Direct AI assistant interaction with database resources via CockroachDB Managed Model Context Protocol.

### AWS Features Utilized
- **Amazon Bedrock**: Powering the cognitive agent logic with high-throughput Claude 3.5 Sonnet invocations.
- **AWS Region Optimization**: Multi-region architecture syncing across AWS deployment zones.

---

## 📊 Deep-Dive: Database Schema & Vector Search

LedgerGuard AI leverages CockroachDB's standard SQL and pgvector capabilities to run high-performance relational and semantic queries.

### 1. Database Schema Definitions
The complete schema is declared in [lib/schema.sql](file:///c:/Users/duddu/Downloads/AuraAudit-AI/lib/schema.sql):

- **`vendors`**: Core registry containing vendor metadata, geographical settings, calculated risk levels, and AI compliance summaries.
  ```sql
  CREATE TABLE vendors (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      region VARCHAR(100) NOT NULL, -- e.g., 'US East', 'EU Central', 'APAC Singapore'
      risk_level VARCHAR(50) NOT NULL DEFAULT 'medium',
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      ai_risk_summary TEXT,
      recent_ledger_events INT DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  ```
- **`documents`**: Tracks raw uploaded compliance text content, status, and cryptographic SHA-256 hashes of the files.
- **`document_chunks`**: Stores section-by-section text chunks alongside unit-length embeddings for semantic searching:
  ```sql
  CREATE TABLE document_chunks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      document_id VARCHAR(50) NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
      vendor_id VARCHAR(50) NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
      chunk_index INT NOT NULL,
      content TEXT NOT NULL,
      embedding VECTOR(1536) NOT NULL
  );
  ```
- **`ledger_events`**: Cryptographically chained SHA-256 ledger records representing the tamper-proof compliance chain of custody.
- **`agent_runs`**: Stores a visual checklist trace with step-by-step metadata using the `JSONB` data type for live frontend monitoring.

### 2. Distributed HNSW Vector Indexing
We optimize vector lookup latency by building a Hierarchical Navigable Small World (HNSW) index over the `embedding` vector using the pgvector cosine distance operator:
```sql
CREATE INDEX document_chunks_embedding_idx 
ON document_chunks USING hnsw (embedding vector_cosine_ops);
```

When query inputs are submitted, the application matches text embeddings against the index using a Cosine Distance calculation:
```sql
SELECT 
  c.content, 
  d.name AS document_name, 
  v.name AS vendor_name,
  (c.embedding <=> $1) AS cosine_distance
FROM document_chunks c
JOIN documents d ON c.document_id = d.id
JOIN vendors v ON d.vendor_id = v.id
ORDER BY c.embedding <=> $1 ASC
LIMIT 5;
```

---

## 🤖 Deep-Dive: AWS Bedrock & Claude 3.5 Sonnet Agent

The multi-agent execution pipeline delegates complex audit assessments to **Claude 3.5 Sonnet** hosted on Amazon Bedrock.

### 1. Bedrock Client Configuration
The runtime service initializes command execution using the official `@aws-sdk/client-bedrock-runtime` client:
```typescript
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: awsRegion,
  credentials: { accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey }
});
```

### 2. Prompt Instruction & Structured JSON Output
The Risk Auditing Agent passes raw document chunks to Claude 3.5 Sonnet and extracts structured data fields for programmatic updates:
```typescript
const prompt = `
  You are an AI Compliance Auditor checking the following vendor compliance text:
  "${documentsText.slice(0, 4000)}"

  Verify if there are any outdated SOC2 certificates (evidence older than 12 months) or missing encryption policies.
  Respond in JSON format:
  {
    "controlsChecked": number,
    "gapsDetected": number,
    "riskDelta": number,
    "policyRule": "string",
    "reasoning": "string",
    "escalated": boolean
  }
`;
```

If AWS Bedrock or credentials are not configured, the system falls back to a deterministic rule-based simulation to guarantee complete UI interactivity during offline demos.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.0 or later
- A [CockroachDB Cloud](https://cockroachlabs.cloud/) cluster (Free-tier or Serverless)
- An AWS IAM User credentials with Amazon Bedrock Access (e.g. `us-east-1` region)

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```
Fill in the following values:
```ini
# CockroachDB Connection String
COCKROACH_DB_URL="postgresql://<user>:<pass>@<host>:26257/defaultdb?sslmode=verify-full"

# AWS Bedrock Credentials
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_REGION="us-east-1"
```

### 3. Initialize Database Schema
The system auto-seeds and sets up required tables upon first API access. To initialize manually, run the schema script in your CockroachDB console:
```bash
# Using Cockroach SQL Shell:
\i lib/schema.sql
```

### 4. Run Locally
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Repository Structure

- [`/app`](./app) - Next.js App Router (Dashboard, Ledger registry, Vendor detail overlays, Onboarding flow)
- [`/components`](./components) - Glassmorphism UI Components (Topbar notification dropdowns, search palettes, file dropzones)
- [`/lib`](./lib) - Database pool adapters, mock data registry, and CockroachDB connector scripts
- [`lib/schema.sql`](./lib/schema.sql) - Structured CockroachDB schemas, active-active topologies, and HNSW indexes
- [`lib/test-db.js`](./lib/test-db.js) - Verification script for pg connection and vector search sanity check

---

## 🤖 Demo Mode (No Database Required)
If `COCKROACH_DB_URL` is omitted, LedgerGuard AI falls back to local simulation mode. Every single feature (forms, table rows, file generation, and settings storage) runs on local state and `localStorage` to ensure seamless offline demoing.
