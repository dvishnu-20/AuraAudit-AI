import { NextResponse } from "next/server";
import { initDb, pool } from "@/lib/db";
import * as crypto from "crypto";

// Helper to generate a deterministic mock vector embedding from a text string
// This ensures vector operations (like pgvector '<=>' operator) work seamlessly even without live AWS Bedrock keys
function getDeterministicEmbedding(text: string): number[] {
  const hash = crypto.createHash("sha256").update(text).digest();
  const vector: number[] = [];
  for (let i = 0; i < 1536; i++) {
    // Generate float value between -1.0 and 1.0 using hash bytes
    const byteOffset = (i * 2) % (hash.length - 1);
    const byteVal = (hash.readInt16LE(byteOffset) / 32768.0);
    vector.push(byteVal);
  }
  
  // Normalize vector to unit length (important for cosine similarity/distance queries)
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map((val) => val / (magnitude || 1));
}

export async function GET(request: Request) {
  const dbConnected = await initDb();
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("query");
  const vendorId = url.searchParams.get("vendorId");

  if (!dbConnected) {
    return NextResponse.json({
      source: "mock",
      message: "Database not connected. Real vector search requires CockroachDB connection.",
      results: []
    });
  }

  try {
    if (searchQuery) {
      // 1. Generate embedding for query
      const queryEmbedding = getDeterministicEmbedding(searchQuery);
      
      // 2. Perform Cosine Distance search in CockroachDB
      const sqlQuery = `
        SELECT 
          c.id, 
          c.chunk_index, 
          c.content, 
          d.name AS document_name, 
          d.type AS document_type,
          v.name AS vendor_name,
          (c.embedding <=> $1) AS cosine_distance
        FROM document_chunks c
        JOIN documents d ON c.document_id = d.id
        JOIN vendors v ON d.vendor_id = v.id
        ${vendorId ? "WHERE c.vendor_id = $2" : ""}
        ORDER BY c.embedding <=> $1 ASC
        LIMIT 5
      `;
      
      const params = vendorId ? [JSON.stringify(queryEmbedding), vendorId] : [JSON.stringify(queryEmbedding)];
      const result = await pool.query(sqlQuery, params);

      return NextResponse.json({
        source: "cockroachdb_vector_indexing",
        query: searchQuery,
        results: result.rows.map(row => ({
          id: row.id,
          chunkIndex: row.chunk_index,
          content: row.content,
          documentName: row.document_name,
          documentType: row.document_type,
          vendorName: row.vendor_name,
          similarityScore: (1 - row.cosine_distance).toFixed(4)
        }))
      });
    }

    // Default: List all ingested documents
    const sql = `
      SELECT d.*, v.name AS vendor_name 
      FROM documents d
      JOIN vendors v ON d.vendor_id = v.id
      ORDER BY d.uploaded_at DESC
    `;
    const result = await pool.query(sql);
    return NextResponse.json({
      source: "cockroachdb",
      documents: result.rows
    });
  } catch (error: any) {
    console.error("API /api/documents GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const dbConnected = await initDb();

  try {
    const body = await request.json();
    const { vendorId, name, type, textContent } = body;

    if (!vendorId || !name || !type || !textContent) {
      return NextResponse.json({ error: "Missing required fields (vendorId, name, type, textContent)" }, { status: 400 });
    }

    const documentId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
    const documentHash = crypto.createHash("sha256").update(textContent).digest("hex");

    if (!dbConnected) {
      // Mock upload
      return NextResponse.json({
        source: "mock",
        document: {
          id: documentId,
          vendorId,
          name,
          type,
          hash: documentHash,
          status: "processed",
          uploadedAt: new Date().toISOString()
        }
      }, { status: 201 });
    }

    // 1. Insert Document record
    await pool.query(
      `INSERT INTO documents (id, vendor_id, name, type, content, hash, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'processed')`,
      [documentId, vendorId, name, type, textContent, documentHash]
    );

    // 2. Split text into chunks and compute embeddings
    // (Simple sentence/paragraph splitter for demo simplicity)
    const paragraphs = textContent
      .split(/\n\n+/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 20);

    console.log(`Processing document chunks: splitting into ${paragraphs.length} blocks.`);

    for (let i = 0; i < paragraphs.length; i++) {
      const chunkText = paragraphs[i];
      const embedding = getDeterministicEmbedding(chunkText);

      // Insert chunk with vector embedding into CockroachDB
      await pool.query(
        `INSERT INTO document_chunks (document_id, vendor_id, chunk_index, content, embedding)
         VALUES ($1, $2, $3, $4, $5)`,
        [documentId, vendorId, i, chunkText, JSON.stringify(embedding)]
      );
    }

    // Update vendor's audit status
    await pool.query(
      "UPDATE vendors SET status = 'needs_review', updated_at = now() WHERE id = $1",
      [vendorId]
    );

    return NextResponse.json({
      source: "cockroachdb_vector_indexing",
      message: "Document parsed, chunked, and vector index updated in CockroachDB.",
      documentId,
      chunksCreated: paragraphs.length,
      hash: documentHash
    }, { status: 201 });

  } catch (error: any) {
    console.error("API /api/documents POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
