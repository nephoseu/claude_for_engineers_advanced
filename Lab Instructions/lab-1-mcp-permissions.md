# Lab 1: Connect & Review MCP Permissions

**Module 1: MCP Servers & Permission Review**

---

## Goal

Before you touch any code, get comfortable with the two MCP servers already
authorized for this project, and use one of them to look directly at what's
actually in the database, without going through the application.

## What you have

- `.mcp.json` at the repo root, two configured servers: `db-readonly` and
  `logs-readonly`.
- `.claude/mcp-servers.md`, what each one is scoped to do and why.

## What to do

Open `.claude/mcp-servers.md` and `.mcp.json` and work out, in your own
words, what each server can and can't touch. Then use `db-readonly` (or, if
your facilitator hasn't wired up a live server for this cohort, query the
SQLite file directly with a read-only tool) to look at the `tasks` table —
specifically the `completed` column, and get a real answer to: *what does
this column actually contain, across every row?*

You're not fixing anything yet. The deliverable is a short written note (a
few sentences is enough, in a scratch file or your own notes) describing
what you found in that column and why it might matter later today.

There's no single right way to explore this, some people will write a
query by hand, some will ask Claude Code to do it through the MCP tool, some
will do both and compare. All of those are fine.

---

Want more structure? See the companion document:
**`lab-1-mcp-permissions-steps.md`**.
