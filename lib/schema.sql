-- Enable the pgvector extension for Distributed Vector Indexing in CockroachDB
CREATE EXTENSION IF NOT EXISTS vector;

-- Vendors Registry Table
CREATE TABLE IF NOT EXISTS vendors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL, -- e.g., 'US East', 'EU Central', 'APAC Singapore'
    risk_level VARCHAR(50) NOT NULL DEFAULT 'medium', -- 'compliant', 'low', 'medium', 'high', 'critical'
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'compliant', 'needs_review', 'non_compliant', 'pending'
    ai_risk_summary TEXT,
    recent_ledger_events INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documents Ingested
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(50) PRIMARY KEY,
    vendor_id VARCHAR(50) NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- e.g., 'SOC2 Type II', 'ISO27001 Certificate', 'GDPR DPA'
    content TEXT, -- Parsed text content
    hash VARCHAR(64) NOT NULL, -- Cryptographic hash of document file
    status VARCHAR(50) NOT NULL DEFAULT 'processing', -- 'processing', 'processed', 'failed'
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Document Chunks for Semantic Vector Search
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id VARCHAR(50) NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    vendor_id VARCHAR(50) NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL -- Distributed Vector Indexing (1536 dimensions for Amazon Bedrock Titan Text Embeddings)
);

-- Create Distributed Vector Index for Fast Similarity Search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx ON document_chunks USING hnsw (embedding vector_cosine_ops);

-- Immutable Global Compliance Audit Ledger
CREATE TABLE IF NOT EXISTS ledger_events (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'EVT-001'
    timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    vendor_id VARCHAR(50) REFERENCES vendors(id) ON DELETE SET NULL,
    vendor_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- e.g., 'SOC2 Analysis', 'ISO Verification', 'GDPR Validation'
    severity VARCHAR(50) NOT NULL DEFAULT 'medium', -- 'compliant', 'medium', 'high', 'critical'
    event_message TEXT NOT NULL,
    full_hash VARCHAR(64) NOT NULL, -- SHA-256 hash chaining previous ledger event
    document_hash VARCHAR(64),
    prev_ledger_ref VARCHAR(50),
    cockroach_transaction_id VARCHAR(100),
    policy_rule VARCHAR(100),
    region VARCHAR(100) NOT NULL -- US East, EU Central, APAC Singapore
);

-- Agentic Compliance Runs history
CREATE TABLE IF NOT EXISTS agent_runs (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'RUN-4819'
    vendor_id VARCHAR(50) REFERENCES vendors(id) ON DELETE CASCADE,
    vendor_name VARCHAR(255) NOT NULL,
    trigger VARCHAR(255) NOT NULL, -- e.g., 'Manual Run', 'Document Upload', 'Scheduled Review'
    pipeline VARCHAR(100)[] NOT NULL, -- Array of agent names in pipeline
    status VARCHAR(50) NOT NULL DEFAULT 'running', -- 'running', 'completed', 'failed'
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    duration VARCHAR(50),
    ledger_writes INT DEFAULT 0,
    steps JSONB NOT NULL DEFAULT '[]'::jsonb -- Stores sequential agent trace steps
);
