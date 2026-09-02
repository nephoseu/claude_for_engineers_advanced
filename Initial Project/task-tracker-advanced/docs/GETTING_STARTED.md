# Getting Started: How to Run This Project

This walks you through getting `task-tracker-advanced` running locally from
a completely fresh checkout, step by step. It assumes no prior setup, if
you've already got it running, you probably only need the Quick Start.

---

## Prerequisites

Check these before you start, all three are required.

| Requirement | How to check | Notes |
|---|---|---|
| Node.js 18 or newer | `node --version` | `better-sqlite3` needs a reasonably recent Node. If you don't have it, install via [nodejs.org](https://nodejs.org) or a version manager like `nvm`. |
| npm | `npm --version` | Ships with Node, no separate install needed. |
| git | `git --version` | Only needed if you're cloning from a remote rather than working from the unzipped folder. |

You do **not** need SQLite installed separately, `better-sqlite3` bundles
its own engine.

---

## Quick Start

If you just want it running as fast as possible, from the project root:

```bash
# Terminal 1, backend
cd backend
npm install
npm run db:seed
npm run dev

# Terminal 2, frontend
cd frontend
npm install
npm run dev

# Once, in any terminal, sets up both MCP servers for Module 1 / Lab 1
cd .claude/mcp-servers
npm install
```

Then open **http://localhost:5173** in a browser. You should see a task
dashboard where the "Active tasks" widget disagrees with the visible task
list, that mismatch is intentional, see `docs/INCIDENT_BRIEF.md`.

The rest of this document walks through each of those steps in more detail,
plus how to verify things are actually working and what to do if something
goes wrong.

---

## Step 1: Get the Project Onto Your Machine

If you received this as a `.zip`, unzip it anywhere convenient. If you're
pulling it from a git remote:

```bash
git clone <your-repo-url> task-tracker-advanced
cd task-tracker-advanced
```

Either way, you should end up in a folder containing `backend/`,
`frontend/`, `docs/`, `.claude/`, and a root `CLAUDE.md`.

---

## Step 2: Start the Backend

The backend is an Express API backed by a local SQLite database.

```bash
cd backend
npm install
```

This installs `express` and `better-sqlite3`. It's normal for this to take
a little longer than usual the first time, `better-sqlite3` compiles a
small native module during install.

Next, create and seed the database:

```bash
npm run db:seed
```

This does two things the first time it runs:

1. Creates `backend/src/db/tasks.db` from `backend/src/db/schema.sql`, if it
   doesn't already exist.
2. Deletes any existing rows and inserts a fixed set of seed tasks across
   three owners (`ana`, `marko`, `ivana`), deliberately written with mixed
   representations in the `completed` column, that inconsistency is the
   whole point of the day's scenario.

You should see output like:

```
Seeded 10 tasks into /path/to/backend/src/db/tasks.db
```

Now start the API:

```bash
npm run dev
```

You should see:

```
Task Tracker API listening on :4000
```

Leave this terminal running, the server stays up until you stop it with
`Ctrl+C`.

### Verify the backend is actually working

In a **new** terminal (leave the server running in the first one):

```bash
curl "http://localhost:4000/tasks?owner=ana"
curl "http://localhost:4000/tasks/active-count?owner=ana"
```

The first command should return a JSON array of ana's tasks. The second
should return something like `{"count":0}` or `{"count":1}`, a number that
does **not** match how many of ana's tasks actually show `"status":"active"`
in the first response. That mismatch is the bug the whole day is built
around, if you see it, the backend is working correctly.

---

## Step 3: Start the Frontend

In a second terminal, from the project root:

```bash
cd frontend
npm install
npm run dev
```

You should see Vite print a local URL, typically:

```
Local:   http://localhost:5173/
```

Open that URL in a browser. You should see "Ana's Tasks" with an orange
"Active tasks" widget above the task list, and the number in that widget
should visibly not match the number of tasks below it marked `(active)`.
If the frontend loads but shows "Couldn't load tasks, is the backend
running?", double check the backend terminal is still running and that
nothing else is using port 4000.

---

## Running the Tests

From the `backend` folder:

```bash
npm test
```

This runs Node's built-in test runner against `backend/tests/tasks.test.js`.
On a fresh, unmodified checkout, you should see **one failing test**, that
failure is intentional and demonstrates the bug directly:

```
Expected 2 active tasks for ana, got 1. The query only matches native 0,
so the task written with the string 'false' is being silently dropped
from the count.
```

If every test passes on a completely fresh checkout, something's off,
check that you haven't accidentally modified `backend/src/controllers/
tasksController.js` or the seed data.

---

## Resetting the Database

If you want to wipe the database back to its original seeded state, for
example after experimenting with a migration:

```bash
cd backend
rm -f src/db/tasks.db src/db/tasks.db-shm src/db/tasks.db-wal
npm run db:seed
```

The `-shm` and `-wal` files are SQLite's write-ahead-log files, they may or
may not exist depending on how the server was last stopped, `rm -f` won't
complain either way.

---

## Setting Up the MCP Servers

The two MCP servers used throughout the day, `db-readonly` and
`logs-readonly`, are real, working, local servers. There are no external
endpoints or credentials to configure, they run as ordinary Node processes
against the same SQLite database and log file the backend uses.

```bash
cd .claude/mcp-servers
npm install
```

That's it, `.mcp.json` at the project root already points at both. You can
sanity check either one starts cleanly with:

```bash
node .claude/mcp-servers/db-readonly/server.js
```

It won't print anything and will just sit there, that's correct, it's
waiting for an MCP client (Claude Code) to connect over stdio. Press
`Ctrl+C` to stop it, you don't need to run it manually day-to-day, Claude
Code starts and stops it automatically per `.mcp.json`.

**What each server actually does**, in case you want to read the source
(both are short, under 120 lines):

- `db-readonly` (`.claude/mcp-servers/db-readonly/server.js`) opens
  `backend/src/db/tasks.db` using SQLite's own readonly connection mode, and
  separately rejects any query that isn't a plain `SELECT` before it's run.
  It exposes two tools: `query_tasks` and `describe_schema`.
- `logs-readonly` (`.claude/mcp-servers/logs-readonly/server.js`) only ever
  calls `fs.readFileSync` on `backend/logs/app.log`, there's no write code
  path at all. It exposes `search_logs` and `tail_logs`.

See `.claude/mcp-servers.md` for the full scope description participants
are asked to review during Lab 1.

If you'd rather point these at a real external database or log aggregator
instead, you can, just edit the `command`/`args` in `.mcp.json`. Nothing
about the labs requires it though, the local servers are fully sufficient.

---

## Optional: Wiring Up the Automated PR Review

`.github/workflows/pr-review.yml` only does anything if this project is
pushed to a GitHub repository (it won't run against a purely local, non-git
folder). To use it for real:

1. Push this project to a GitHub repo.
2. Under the repo's Settings, enable branch protection on `main` requiring
   the `pr-review` check to pass before merging.
3. Confirm participants have push access to their own branches and can open
   pull requests, but cannot merge without the check passing.

---

## Stopping Everything

Go to each terminal running a `npm run dev` process and press `Ctrl+C`. The
database file persists between runs, if you want a clean slate next time,
see **Resetting the Database** above.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `npm install` fails on `better-sqlite3` | Missing build tools for native modules | On macOS, install Xcode command line tools (`xcode-select --install`). On Linux, install `build-essential` (or your distro's equivalent) and `python3`. On Windows, install the "Desktop development with C++" workload via Visual Studio Build Tools. |
| `EADDRINUSE` on port 4000 or 5173 | Something else is already using that port | Stop the other process, or change the port: `PORT=4001 npm run dev` for the backend, or edit the `server.port` value in `frontend/vite.config.js` for the frontend. |
| Frontend loads but shows a fetch error | Backend isn't running, or is running on a different port | Confirm the backend terminal shows `listening on :4000`, and that `frontend/src/App.jsx` still points at `http://localhost:4000`. |
| `npm test` shows zero failing tests | The bug's been accidentally fixed, or the seed data was modified | Reset the database (see above) and confirm `backend/src/controllers/tasksController.js` still has the original `activeCount` query. |
| Database seems empty or stale | `db:seed` wasn't run, or was run against a database that already had different data | Follow **Resetting the Database** above for a guaranteed clean slate. |
| An MCP server won't start / Claude Code reports a connection error | `.claude/mcp-servers/node_modules` doesn't exist yet | Run `npm install` inside `.claude/mcp-servers/` (see **Setting Up the MCP Servers** above). |
