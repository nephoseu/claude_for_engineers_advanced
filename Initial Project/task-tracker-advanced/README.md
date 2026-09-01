# Task Tracker - Advanced Day Starter Project

This extends the Task Tracker app built across the Beginner and Intermediate
courses (Express backend + React dashboard) into a realistic, project-based
scenario for the Advanced day: a real SQLite database, application logs, a
cross-cutting bug that spans app code / schema / logs, and a repo that
already has CLAUDE.md, subagents, a Skill, a hook, pre-authorized MCP server
config, and an automated PR review workflow in place.

This is now an instructor-led, module-based day (5 modules, each with a
short lecture and a lab) rather than a single self-directed block. See
`docs/introduction-script.md` for the short course-opening script,
`docs/participant-task-brief.md` for the participant-facing overview, and
`docs/Lab-Guides.md` for all five labs (goal + approach), with an optional
numbered walkthrough for each in `docs/Lab-Step-by-Step-Appendix.md`.
`docs/INCIDENT_BRIEF.md` is the full scenario all five labs build toward.

## Facilitator setup (do this before the session)

```bash
cd backend
npm install
npm run db:seed        # creates + seeds backend/src/db/tasks.db
npm run dev             # http://localhost:4000

# in a second terminal
cd frontend
npm install
npm run dev             # http://localhost:5173
```

Confirm:
- `GET http://localhost:4000/tasks/active-count?owner=ana` returns a count
  that visibly disagrees with the task list for `ana` (this is intentional -
  see `docs/INCIDENT_BRIEF.md`).
- `cd backend && npm test` shows one failing test.
- Replace the placeholder values in `.mcp.json` with your real read-only DB
  and log endpoints (see `.claude/mcp-servers.md`), or remove that server
  entry and have participants use the `log-triage` / DB inspection via the
  CLI instead if you don't have MCP servers ready for this cohort.
- The GitHub repo (if you're using one instead of local-only) has the
  `pr-review` workflow enabled under Actions, and branch protection requires
  it to pass before merging.

## Repo layout

```
backend/            Express API + SQLite DB + tests + logs
frontend/            React dashboard (Vite)
.claude/
  agents/           test-runner, log-triage subagents
  skills/           db-migration-review skill
  hooks/            schema-edit warning hook
  settings.json     hook registration
  mcp-servers.md    scope of the two pre-authorized MCP servers
.mcp.json            MCP server config (placeholder - fill in before the day)
.github/
  workflows/pr-review.yml    automated PR review CI job
  PULL_REQUEST_TEMPLATE.md
scripts/
  pr-review-check.js         the static checks the workflow runs
docs/
  INCIDENT_BRIEF.md               the full scenario, mapped to modules 1-5
  introduction-script.md          short facilitator script for the course opening
  participant-task-brief.md       participant-facing overview + quick reference
  Lab-Guides.md                   all five labs: goal + what to do
  Lab-Step-by-Step-Appendix.md    optional numbered walkthrough per lab
CLAUDE.md            root project conventions
```
