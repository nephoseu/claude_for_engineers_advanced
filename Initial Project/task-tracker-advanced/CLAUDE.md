# Task Tracker - Project Conventions

## Workflow (hard constraints for today)

- **No production write access.** Every credential provisioned for this session is
  read-mostly. Nothing here should be able to write to a production system.
- **Branch-and-PR only.** Never commit directly to `main`. Create a branch, open a
  pull request, and let the automated PR review run before merging.
- **All generated SQL is reviewed by a human before it runs**, no exceptions - this
  includes migrations, seed scripts, and ad-hoc diagnostic queries.

## Structure

- `backend/` - Express API, SQLite database (`better-sqlite3`), tests under
  `backend/tests/`.
- `backend/src/db/schema.sql` and `backend/src/db/migrations/` - read the migration
  trail before touching anything schema-related; it explains itself.
- `backend/logs/app.log` - application logs. Real incidents usually leave a trace
  here before anyone files a ticket.
- `frontend/` - React dashboard (Vite) that consumes the API.
- `.claude/agents/` - subagents already configured for this project (see below).
- `.claude/skills/` - packaged Skills already configured for this project.
- `.claude/mcp-servers.md` - the MCP servers pre-authorized for this session and
  exactly what each one is scoped to do.

## Subagents available in this project

- **test-runner** - runs the backend test suite and returns only the failures,
  not the full noisy output.
- **log-triage** - read-only. Greps `backend/logs/app.log` for a keyword or time
  window and summarizes what it finds. Cannot modify files.

## Skills available in this project

- **db-migration-review** - loaded automatically when you're about to write or
  discuss a SQL migration. Encodes the review checklist migrations need before
  they're allowed to run.

## Testing

- `cd backend && npm test` runs the suite (Node's built-in test runner, no extra
  install needed).
- New behavior needs a test. A bug fix needs a test that fails before the fix and
  passes after it.

## Database

- SQLite file at `backend/src/db/tasks.db`, created on first run from
  `schema.sql`. Delete it and re-run `npm run db:seed` to reset to known seed data.
- Never hand-edit `tasks.db` directly - go through a migration file.
