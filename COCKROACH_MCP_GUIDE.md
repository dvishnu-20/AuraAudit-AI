# CockroachDB Cloud Managed MCP & Agent Integration Guide

This guide describes how to connect AI agents (like Claude Code, Cursor, and VS Code) directly and securely to your CockroachDB Cloud cluster using the CockroachDB Cloud Managed MCP (Model Context Protocol) Server, `ccloud` CLI, and open-source Agent Skills.

---

## 1. CockroachDB Cloud Managed MCP Server

The Managed MCP Server allows AI agents to securely query your CockroachDB cluster directly from your IDE or terminal. It runs in a safe-by-default environment with read-only access and full audit logs.

### Endpoint
`https://cockroachlabs.cloud/mcp`

### Configuration

#### A. Cursor IDE Configuration
1. Open Cursor and go to **Settings** -> **Features** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Fill in the following details:
   - **Name**: `cockroachdb`
   - **Type**: `sse`
   - **URL**: `https://cockroachlabs.cloud/mcp`
4. Set up headers (or configure connection credentials) in your CockroachDB Cloud Console to authorize the incoming Cursor requests.

#### B. Claude Code Terminal Configuration
To connect Claude Code, add the MCP configuration to your Claude configuration file (typically at `%APPDATA%\Claude\claude_desktop_config.json` on Windows or `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "cockroachdb": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://<user>:<password>@<host>:<port>/<dbname>?sslmode=verify-full"
      ]
    }
  }
}
```

Or connect directly to the Managed SSE Endpoint:

```json
{
  "mcpServers": {
    "cockroachdb-managed": {
      "command": "sse",
      "url": "https://cockroachlabs.cloud/mcp",
      "headers": {
        "Authorization": "Bearer <your_cockroach_mcp_token>"
      }
    }
  }
}
```

---

## 2. ccloud CLI (Agent-Ready)

The `ccloud` CLI is built with consistent noun-verb commands and granular RBAC, outputting machine-readable JSON that AI agents can parse immediately.

### Commands for AI Agents

To list clusters in JSON format:
```bash
ccloud cluster list --format json
```

To inspect database health:
```bash
ccloud cluster status <cluster-id> --format json
```

To list backup schedules:
```bash
ccloud backup schedule list --cluster <cluster-id> --format json
```

### Scripted Agent Integration Example (`lib/ccloud-agent.js`)
We can automate backup checks or network configurations by running child processes in node that execute `ccloud` commands:

```javascript
const { execSync } = require('child_process');

function getClusterHealth(clusterId) {
  try {
    const output = execSync(`ccloud cluster status ${clusterId} --format json`).toString();
    const status = JSON.parse(output);
    console.log(`Cluster Health: ${status.health_status}`);
    return status;
  } catch (error) {
    console.error("Failed to read cluster status via ccloud CLI", error);
  }
}
```

---

## 3. CockroachDB Agent Skills Repo

The open-source **CockroachDB Agent Skills** provide pre-packaged prompt templates and instructions that teach AI models how to optimize queries, design schemas, and troubleshoot replication lag on CockroachDB.

To use these skills with Cursor or Claude Code, reference the skills repository in your system prompt or load the skills directly into your agent pipeline.

### Vector Similarity Search Skill
Our AI audit engine uses CockroachDB's **Distributed Vector Indexing** for compliance matches. Below is the SQL structure the agent uses to execute semantic matching against compliance controls:

```sql
-- Search for SOC2 security chunks using Cosine Distance
SELECT 
    c.content, 
    1 - (c.embedding <=> $1) as similarity_score
FROM 
    document_chunks c
WHERE 
    c.vendor_id = $2
ORDER BY 
    c.embedding <=> $1 ASC
LIMIT 3;
```
This query uses CockroachDB's distributed HNSW index to locate the relevant contract clauses in milliseconds.
