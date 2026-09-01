# Pre-Authorized MCP Servers

Two MCP servers are configured for this session in `.mcp.json` at the repo
root. **Facilitator note:** the checked-in file has placeholder values -
point it at your actual read-only database and log endpoints before the day
starts. Everything below describes the intended scope regardless of which
concrete server binary you use to provide it.

## `db-readonly`

- **Purpose:** query the `tasks` table structure and contents without going
  through the application.
- **Credential scope:** read-only database user. It must not be able to
  `INSERT`, `UPDATE`, `DELETE`, or run DDL. If your provider doesn't support a
  read-only role at the connection-string level, wrap it in a proxy that
  rejects anything but `SELECT`.
- **What it's for today:** confirming what's actually in the `completed`
  column (types, distinct values) as part of diagnosing the incident in
  `docs/INCIDENT_BRIEF.md`. It is not a substitute for reading the migration
  files - use both.

## `logs-readonly`

- **Purpose:** search application logs without shelling into a server.
- **Credential scope:** read-only access to the log source, scoped to this
  project's logs only.
- **What it's for today:** the same job as the `log-triage` subagent, but
  useful if your logs live somewhere other than the checked-in
  `backend/logs/app.log` file (e.g. a real log aggregator in your
  organization's stack).

## Before participants start

Ask everyone to open `.mcp.json`, look at what each server is scoped to do,
and say out loud (or in the group chat) what it can and can't touch. This is
the "reviewing the permissions each tool was granted" step from the kickoff
briefing - don't skip it even though the config is pre-provided.
