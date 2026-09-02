# Pre-Authorized MCP Servers

Two MCP servers are configured for this session in `.mcp.json` at the repo
root. Both are real, working, local servers with source code in
`.claude/mcp-servers/`, there are no external endpoints or credentials to
configure. Run `npm install` once inside `.claude/mcp-servers/` before the
day starts (see `docs/GETTING_STARTED.md`), and both servers are ready to
use.

## `db-readonly`

- **Purpose:** query the `tasks` table structure and contents without going
  through the application.
- **How the read-only guarantee works, in two independent layers:**
  1. The database connection itself is opened with SQLite's native
     `readonly` flag (see `.claude/mcp-servers/db-readonly/server.js`), so
     the database engine refuses any write, not just an application-level
     convention.
  2. Before a query ever reaches the database, the server rejects anything
     that isn't a single `SELECT` statement, including if it spots `INSERT`,
     `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `ATTACH`, `PRAGMA`, or
     `VACUUM` anywhere in the text.
- **Tools it exposes:**
  - `query_tasks`, run any `SELECT` statement against the database.
  - `describe_schema`, list tables and columns, useful before writing a
    query.
- **What it's for today:** confirming what's actually in the `completed`
  column (types, distinct values) as part of diagnosing the incident in
  `docs/INCIDENT_BRIEF.md`. It is not a substitute for reading the migration
  files, use both.

## `logs-readonly`

- **Purpose:** search the application log without shelling into a server.
- **How the read-only guarantee works:** the server only ever opens
  `backend/logs/app.log` with `fs.readFileSync`, there is no code path in
  `.claude/mcp-servers/logs-readonly/server.js` that writes to or deletes
  the file.
- **Tools it exposes:**
  - `search_logs`, filter by keyword and/or an ISO date prefix.
  - `tail_logs`, return the last N lines.
- **What it's for today:** the same job as the `log-triage` subagent, a
  second way to get at the same read-only log data, useful if you'd rather
  work through MCP directly than delegate to a subagent.

## Before participants start

Ask everyone to open `.mcp.json` and skim
`.claude/mcp-servers/db-readonly/server.js` and
`.claude/mcp-servers/logs-readonly/server.js`, then say out loud (or in the
group chat) what each server can and can't touch. This is the "reviewing
the permissions each tool was granted" step from Module 1, it's worth doing
even though the servers are pre-built and already known to be safe, the
habit of checking is the point, not just the conclusion.

## Facilitator note

If you'd rather point these at a real, external read-only database or log
aggregator instead of the local, self-contained versions checked in here,
you can, just replace the `command`/`args` in `.mcp.json` with your own
server and update the scope description above to match. Nothing about the
labs requires it, the local servers are fully sufficient for the day.
