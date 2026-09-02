# Participant Handout — Course Overview & Quick Reference

**Claude Code for Engineers — Advanced Day**

---

## How today works

Five modules, each with a short concept explanation followed by a lab —
all building on one running scenario against the `task-tracker-advanced`
repo. By the end of Module 5 you'll have a real pull request.

| Module | Focus | Lab | Step-by-step |
|---|---|---|---|
| 1 | MCP Servers & Permission Review | `docs/labs/lab-1-mcp-permissions.md` | `docs/labs/lab-1-mcp-permissions-steps.md` |
| 2 | Multi-Tool Diagnostic Workflow | `docs/labs/lab-2-diagnose-the-incident.md` | `docs/labs/lab-2-diagnose-the-incident-steps.md` |
| 3 | Safe Schema Changes | `docs/labs/lab-3-migration-and-tests.md` | `docs/labs/lab-3-migration-and-tests-steps.md` |
| 4 | Subagents, Skills & Hooks | `docs/labs/lab-4-subagents-skills-hooks.md` | `docs/labs/lab-4-subagents-skills-hooks-steps.md` |
| 5 | Pull Requests & Automated Review | `docs/labs/lab-5-pr-and-automated-review.md` | `docs/labs/lab-5-pr-and-automated-review-steps.md` |

Each lab is two documents: the main guide (a short **Goal** and **What to
do** — usually all you need), and a separate step-by-step document if you
want more structure. Use the step-by-step version for some labs and not
others — both are normal.

## The scenario

**Support Ticket #4417** (filed 2026-08-19):

> "My active count says 2 but I have 4 open tasks."

The dashboard's "Active tasks" widget disagrees with the plain task list —
and only for some users. Full context: `docs/INCIDENT_BRIEF.md`.

## What "merge-ready" means by the end of the day

- [ ] Fixes the discrepancy for **all** owners, not just the one in the
      ticket.
- [ ] Includes a migration (if the fix needs one), reviewed by a human, with
      existing rows accounted for.
- [ ] Includes a test that fails against the old code and passes against
      the fix.
- [ ] Has been through the automated PR review workflow, with every finding
      either fixed or explicitly justified.

## Constraints (all day, every module)

| Constraint | What it means in practice |
|---|---|
| No production write access | Everything you have is read-mostly. |
| Branch-and-PR only | Nothing is committed to `main` directly. |
| Human reviews all generated SQL | Every migration or query — including ones Claude Code proposes — gets read by you before it runs. |

## Quick reference — what's already in this repo

| Location | What it is | Comes up in |
|---|---|---|
| `CLAUDE.md` | Project conventions | All day |
| `docs/INCIDENT_BRIEF.md` | The scenario, in full | Module 2 onward |
| `.mcp.json` / `.claude/mcp-servers.md` | Pre-authorized MCP servers | Module 1 |
| `backend/src/db/migrations/` | Schema history | Module 2–3 |
| `backend/logs/app.log` | Application logs | Module 2 |
| `.claude/agents/test-runner.md` | Subagent: runs tests, reports failures | Module 4 |
| `.claude/agents/log-triage.md` | Subagent: read-only log search | Module 2, 4 |
| `.claude/skills/db-migration-review/` | Migration checklist Skill | Module 3–4 |
| `.claude/hooks/` | Schema-edit warning hook | Module 3–4 |
| `.github/workflows/pr-review.yml` | Automated PR review | Module 5 |

## If you're stuck

1. The current lab's step-by-step document in `docs/labs/`.
2. `CLAUDE.md`.
3. Ask the facilitator — for environment problems specifically, not for the
   diagnosis or approach itself.
