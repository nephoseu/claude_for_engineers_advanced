# Incident Brief: Active Task Count Is Wrong

**Ticket #4417** (support, filed 2026-08-19):
> "My active count says 2 but I have 4 open tasks."

## What you know at the start

- The dashboard shows an "Active tasks" widget powered by
  `GET /tasks/active-count`.
- The plain task list on the same page (powered by `GET /tasks`) looks
  correct - it's specifically the count widget that's wrong, and only for
  some users.
- `backend/logs/app.log` has entries around the time the ticket was filed.
- The `tasks` table has a `completed` column that was added after the table
  already existed - see the migration trail in `backend/src/db/migrations/`.

## What "done" looks like

A merge-ready pull request that:

1. Fixes the active-count discrepancy for **all** owners, not just the one in
   the bug report.
2. Includes a migration (if the fix requires one) that a human has reviewed,
   with existing rows accounted for.
3. Includes a test that fails against the old code and passes against the
   fix.
4. Has gone through the automated PR review workflow, with any findings
   triaged (fixed, or explicitly justified if not).

## Constraints

- No production write access - you're working against the local SQLite dev
  database and seeded logs.
- Branch-and-PR workflow only; nothing lands on `main` directly.
- Review every line of generated SQL before it runs, including inside
  Claude Code's own migration proposals.

## How this maps to today's modules

This incident is worked through across all five modules and labs, not
solved in one sitting:

| Module | Lab | What it covers |
|---|---|---|
| 1 | `docs/labs/lab-1-mcp-permissions.md` | Reviewing MCP permissions, inspecting the raw data |
| 2 | `docs/labs/lab-2-diagnose-the-incident.md` | Root-causing the discrepancy |
| 3 | `docs/labs/lab-3-migration-and-tests.md` | Fixing it on a branch, with tests |
| 4 | `docs/labs/lab-4-subagents-skills-hooks.md` | Using the project's subagents/Skills/hooks |
| 5 | `docs/labs/lab-5-pr-and-automated-review.md` | Opening the PR, triaging automated review |

## Where to look if you're stuck

- The current lab's section in `docs/Lab-Guides.md`, or its counterpart in
  `docs/Lab-Step-by-Step-Appendix.md` for a numbered walkthrough.
- `CLAUDE.md` at the repo root - project conventions and what's available.
- `backend/src/db/migrations/` - read them in order; the second one explains
  the problem it introduced.
- `backend/logs/app.log` - or delegate the search to the `log-triage`
  subagent.
- `.claude/agents/` - `test-runner` and `log-triage` are already set up.
- `.claude/skills/db-migration-review/` - loads automatically once you start
  discussing a migration.
- `.claude/mcp-servers.md` - what the two pre-authorized MCP servers are
  scoped to do.
