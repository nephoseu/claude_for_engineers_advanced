#!/usr/bin/env node
/**
 * db-readonly MCP server
 *
 * A genuinely read-only MCP server over the Task Tracker SQLite database.
 * Opens the database in SQLite's own readonly mode (so writes fail at the
 * engine level, not just by convention) and additionally rejects any query
 * that isn't a single SELECT statement before it ever reaches the database.
 *
 * No external endpoint, no credentials to configure. This is intentionally
 * self-contained so a facilitator can run the Advanced day without needing
 * a real production-adjacent database to point at.
 */
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

const DB_PATH = path.join(__dirname, '..', '..', '..', 'backend', 'src', 'db', 'tasks.db');

function openDb() {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(
      `Database not found at ${DB_PATH}. Run "npm run db:seed" inside backend/ first.`
    );
  }
  // readonly: true means SQLite itself refuses any write, this is not just
  // an application-level convention, the engine enforces it.
  return new Database(DB_PATH, { readonly: true, fileMustExist: true });
}

// Reject anything that isn't a single, simple SELECT statement. This is a
// second, independent layer of protection on top of SQLite's readonly mode,
// so a query is refused before it ever touches the database at all.
function assertReadOnlyQuery(sql) {
  const trimmed = sql.trim().replace(/;\s*$/, '');
  if (trimmed.includes(';')) {
    throw new Error('Only a single statement is allowed, remove the extra semicolon(s).');
  }
  if (!/^select\s/i.test(trimmed)) {
    throw new Error('Only SELECT statements are allowed through db-readonly.');
  }
  const forbidden = /\b(insert|update|delete|drop|alter|create|attach|pragma|replace|vacuum)\b/i;
  if (forbidden.test(trimmed)) {
    throw new Error('Query contains a keyword that is not allowed through db-readonly.');
  }
  return trimmed;
}

const server = new McpServer({
  name: 'db-readonly',
  version: '1.0.0',
});

server.tool(
  'query_tasks',
  'Run a read-only SELECT query against the Task Tracker SQLite database (the "tasks" table). ' +
    'Only SELECT statements are accepted, anything else is rejected before it reaches the database. ' +
    'Use this to inspect real data, e.g. to see what the "completed" column actually contains across rows.',
  {
    sql: z.string().describe(
      'A single SELECT statement, e.g. "SELECT id, owner, status, completed FROM tasks"'
    ),
  },
  async ({ sql }) => {
    const safeSql = assertReadOnlyQuery(sql);
    const db = openDb();
    try {
      const rows = db.prepare(safeSql).all();
      return {
        content: [{ type: 'text', text: JSON.stringify(rows, null, 2) }],
      };
    } finally {
      db.close();
    }
  }
);

server.tool(
  'describe_schema',
  'List the tables and columns in the Task Tracker database, useful before writing a query.',
  {},
  async () => {
    const db = openDb();
    try {
      const tables = db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
        .all();
      const schema = tables.map((t) => {
        const columns = db.prepare(`PRAGMA table_info(${t.name})`).all();
        return {
          table: t.name,
          columns: columns.map((c) => ({ name: c.name, type: c.type, nullable: !c.notnull })),
        };
      });
      return { content: [{ type: 'text', text: JSON.stringify(schema, null, 2) }] };
    } finally {
      db.close();
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('db-readonly MCP server failed to start:', err);
  process.exit(1);
});
