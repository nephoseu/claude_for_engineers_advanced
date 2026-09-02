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
`docs/labs/` for all five labs. Each lab is two documents: a main guide
(goal + approach) and a `-steps` companion with an optional numbered
walkthrough. `docs/INCIDENT_BRIEF.md` is the full scenario all five labs
build toward.

**New to this project? Start with `docs/GETTING_STARTED.md`** for a full,
step-by-step walkthrough of installing, seeding the database, running the
backend and frontend, running tests, and troubleshooting. The section below
is just the quick version.

## Quick Start

```bash
cd backend
npm install
npm run db:seed        # creates + seeds backend/src/db/tasks.db
npm run dev             # http://localhost:4000

# in a second terminal
cd frontend
npm install
npm run dev             # http://localhost:5173

# once, in any terminal, sets up both MCP servers
cd .claude/mcp-servers
npm install
```

Confirm:
- `GET http://localhost:4000/tasks/active-count?owner=ana` returns a count
  that visibly disagrees with the task list for `ana` (this is intentional -
  see `docs/INCIDENT_BRIEF.md`).
- `cd backend && npm test` shows one failing test.
- The two MCP servers (`db-readonly`, `logs-readonly`) are real, local,
  self-contained servers, no external endpoints or credentials needed. Run
  `npm install` once inside `.claude/mcp-servers/` (see
  `docs/GETTING_STARTED.md`) and they're ready to use.
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
  mcp-servers/      source code for both, real and self-contained, npm install once
.mcp.json            MCP server config, points at .claude/mcp-servers/, no placeholders
.github/
  workflows/pr-review.yml    automated PR review CI job
  PULL_REQUEST_TEMPLATE.md
scripts/
  pr-review-check.js         the static checks the workflow runs
docs/
  GETTING_STARTED.md              full setup and run guide, start here
  INCIDENT_BRIEF.md               the full scenario, mapped to modules 1-5
  introduction-script.md          short facilitator script for the course opening
  participant-task-brief.md       participant-facing overview + quick reference
  labs/                           two documents per lab: lab-N-*.md (goal +
                                   approach) and lab-N-*-steps.md (optional
                                   numbered walkthrough)
CLAUDE.md            root project conventions
```
