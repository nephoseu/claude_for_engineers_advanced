# Lab 1 — Step-by-Step

**Companion to `lab-1-mcp-permissions.md`. Module 1: MCP Servers & Permission Review**

---

This is optional. The main lab document states the goal and leaves the
approach to you — use this only if you want more scaffolding, or if you're
short on time and would rather follow a known-good sequence than explore.

1. Open `.claude/mcp-servers.md`. For each server, write down: what can it
   read, and what is it explicitly forbidden from doing?
2. Open `.mcp.json` and confirm the configuration matches what the README
   describes — same read-only scope, nothing that looks like a write
   credential.
3. Ask Claude Code to use the `db-readonly` MCP server to select the
   `id`, `owner`, `status`, and `completed` columns from every row in
   `tasks`.
4. Look at the raw values in `completed`. Note the different forms they
   take (hint: they're not all the same type).
5. Write one or two sentences: what's inconsistent about this column, and
   which endpoint in the app (see `backend/src/controllers/tasksController.js`)
   might be affected by that inconsistency?
