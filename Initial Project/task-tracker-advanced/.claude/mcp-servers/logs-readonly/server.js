#!/usr/bin/env node
/**
 * logs-readonly MCP server
 *
 * A read-only MCP server over the Task Tracker application log file. Offers
 * a keyword/date search tool and a tail tool. There is no write or delete
 * capability exposed at all, this process only ever opens the log file for
 * reading.
 *
 * No external endpoint, no credentials to configure. This is intentionally
 * self-contained so a facilitator can run the Advanced day without needing
 * a real log aggregator to point at.
 */
const path = require('path');
const fs = require('fs');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

const LOG_PATH = path.join(__dirname, '..', '..', '..', 'backend', 'logs', 'app.log');

function readLines() {
  if (!fs.existsSync(LOG_PATH)) {
    throw new Error(`Log file not found at ${LOG_PATH}.`);
  }
  return fs.readFileSync(LOG_PATH, 'utf8').split('\n').filter(Boolean);
}

const server = new McpServer({
  name: 'logs-readonly',
  version: '1.0.0',
});

server.tool(
  'search_logs',
  'Search the Task Tracker application log for lines matching a keyword and/or a date prefix ' +
    '(e.g. "2026-08-19"). Returns matching lines, most recent last, capped at "limit" results.',
  {
    keyword: z.string().optional().describe('Case-insensitive substring to search for, e.g. "active-count" or "WARN"'),
    datePrefix: z.string().optional().describe('ISO date prefix to filter by, e.g. "2026-08-19"'),
    limit: z.number().int().positive().max(500).optional().describe('Max lines to return, defaults to 50'),
  },
  async ({ keyword, datePrefix, limit }) => {
    const max = limit ?? 50;
    let lines = readLines();
    if (datePrefix) {
      lines = lines.filter((l) => l.startsWith(datePrefix));
    }
    if (keyword) {
      const needle = keyword.toLowerCase();
      lines = lines.filter((l) => l.toLowerCase().includes(needle));
    }
    const result = lines.slice(-max);
    return {
      content: [
        {
          type: 'text',
          text:
            result.length > 0
              ? result.join('\n')
              : 'No matching log lines found for that keyword/date filter.',
        },
      ],
    };
  }
);

server.tool(
  'tail_logs',
  'Return the last N lines of the application log, most recent last. Useful for a quick overview before searching.',
  {
    lines: z.number().int().positive().max(500).optional().describe('Number of lines to return, defaults to 20'),
  },
  async ({ lines }) => {
    const n = lines ?? 20;
    const all = readLines();
    return { content: [{ type: 'text', text: all.slice(-n).join('\n') }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('logs-readonly MCP server failed to start:', err);
  process.exit(1);
});
