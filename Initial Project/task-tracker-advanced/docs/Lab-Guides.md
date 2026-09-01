# Lab Guides

**Claude Code for Engineers — Advanced Day**

---

Five labs, one per module, all building on the same `task-tracker-advanced`
repo and the same running scenario (Support Ticket #4417 — see
`docs/INCIDENT_BRIEF.md`).

Each lab below has a **Goal** and a **What To Do** section. That's usually
all you need — there's no single right way to work through a lab, and
several reasonable approaches exist for each one.

**Want more structure?** A companion document, `Lab Step-by-Step Appendix.md`,
has an optional numbered walkthrough for every lab in this guide. Use it if
you want more scaffolding, skip it if you don't — both are normal.

---

## Lab 1 — Connect & Review MCP Permissions

**Module 1: MCP Servers & Permission Review**

### Goal

Before you touch any code, get comfortable with the two MCP servers already
authorized for this project, and use one of them to look directly at what's
actually in the database — without going through the application.

### What you have

- `.mcp.json` at the repo root — two configured servers: `db-readonly` and
  `logs-readonly`.
- `.claude/mcp-servers.md` — what each one is scoped to do and why.

### What to do

Open `.claude/mcp-servers.md` and `.mcp.json` and work out, in your own
words, what each server can and can't touch. Then use `db-readonly` (or, if
your facilitator hasn't wired up a live server for this cohort, query the
SQLite file directly with a read-only tool) to look at the `tasks` table —
specifically the `completed` column — and get a real answer to: *what does
this column actually contain, across every row?*

You're not fixing anything yet. The deliverable is a short written note (a
few sentences is enough, in a scratch file or your own notes) describing
what you found in that column and why it might matter later today.

---

## Lab 2 — Diagnose the Incident

**Module 2: Multi-Tool Diagnostic Workflow**

### Goal

Turn Support Ticket #4417 into an actual root-cause diagnosis, by pulling
together everything you have access to — issue context, schema, logs, and
source — rather than guessing from the code alone.

### What you have

- `docs/INCIDENT_BRIEF.md` — the ticket and what "done" will look like later
  today (you're not fixing it yet, just diagnosing it).
- `backend/src/db/migrations/` — the schema's history, in order.
- `backend/logs/app.log` — application logs, readable directly or through
  the `log-triage` subagent (`.claude/agents/log-triage.md`).
- `backend/src/controllers/tasksController.js` and `backend/src/routes/tasks.js`
  — the code path behind the broken endpoint.
- What you already found in Lab 1 about the `completed` column.

### What to do

Confirm, with evidence, exactly why `GET /tasks/active-count` disagrees with
`GET /tasks` for some owners. Use whichever combination of tools gets you
there fastest — reading the migrations yourself, delegating a log search to
`log-triage`, asking Claude Code to trace the query against what Lab 1
turned up, or some mix of all three. There's no prescribed order.

By the end, you should be able to explain the root cause out loud, in one or
two sentences, to someone who hasn't looked at the code — and be specific
about which rows it affects and which it doesn't. Write that explanation
down somewhere (a scratch file, a comment, a draft PR description) — you'll
reuse it directly in Lab 3 and again in this afternoon's PR.

---

## Lab 3 — Fix It Safely: Migration & Tests on a Branch

**Module 3: Safe Schema Changes**

### Goal

Turn your Lab 2 diagnosis into an actual fix — on a branch, backed by a
test that proves the bug and then proves the fix, and, if the fix needs a
schema change, a migration that a human has actually read before it runs.

### What you have

- Your root-cause note from Lab 2.
- `.claude/skills/db-migration-review/SKILL.md` — the checklist this project
  expects a migration to pass, which should load automatically once you
  start discussing one.
- `.claude/hooks/warn-on-schema-edit.sh` — fires automatically when you edit
  schema or migration files, as a reminder, not a blocker.
- `backend/tests/tasks.test.js` — the existing test, which currently fails
  for exactly the reason you diagnosed.

### What to do

Create a branch. Decide, based on your Lab 2 diagnosis, whether the right
fix is purely in the query, or whether it also needs a migration to
normalize the data going forward — either is defensible, but be able to
justify your choice. Write (or extend) a test that fails against the old
code and passes against your fix. Apply the fix. Run the suite.

**The constraint from this morning still applies: any generated SQL,
migration or otherwise, gets read by you before it runs.** If Claude Code
proposes a migration, that's the moment to actually read it, not skim it.

Remember the standard from this morning: the fix needs to hold for **every**
affected owner, not just the one in the ticket. Check your fix against more
than one example before calling it done.

---

## Lab 4 — Subagents, Skills & Hooks in Practice

**Module 4: Subagents, Skills & Hooks**

### Goal

Put the project's pre-configured subagents to work, notice the Skill and
hook you've already been triggering without necessarily naming them, and
delegate one more thing this project doesn't have set up yet.

### What you have

- `.claude/agents/test-runner.md` and `.claude/agents/log-triage.md` —
  already configured subagents.
- `.claude/skills/db-migration-review/SKILL.md` — should have loaded
  automatically at some point during Lab 3 if you touched a migration.
- `.claude/hooks/warn-on-schema-edit.sh` — should have fired at some point
  if you edited schema or migration files.

### What to do

First, use `test-runner` deliberately to get a clean pass/fail read on your
Lab 3 changes instead of reading raw `npm test` output. Notice what it does
and doesn't include in its report.

Second, look back at Lab 3: did the `db-migration-review` Skill actually
show up, and did the hook actually fire? If you didn't touch a migration in
Lab 3, trigger both deliberately now — start a conversation about writing
one, even a throwaway example, and watch for both.

Third — the open-ended part — pick one thing this project *doesn't* have a
subagent or Skill for yet, and either delegate that task to a fresh subagent
you define on the spot, or sketch what a Skill for it would contain. A
natural candidate: a read-only code-review pass over your Lab 3 diff before
you open a PR this afternoon. You don't have to make it reusable or perfect
— the point is practicing the decision of *when* isolation or a packaged
skill is worth it, not producing a polished artifact.

---

## Lab 5 — Open the PR & Triage Automated Review

**Module 5: Pull Requests & Automated Review**

### Goal

Turn your branch from Labs 3–4 into an actual pull request that meets this
morning's standard, and respond to what the automated review actually says
about it — not what you assume it'll say.

### What you have

- Your fix, migration (if any), and tests from Lab 3.
- Anything you decided to keep from Lab 4.
- `.github/PULL_REQUEST_TEMPLATE.md` — fills in automatically when you open
  a PR.
- `.github/workflows/pr-review.yml` — the automated review, which runs on
  every PR.

### What to do

Push your branch and open a pull request. Fill in the template honestly,
including the diagnosis section — this is your Lab 2 write-up, not a new
summary. Let the automated review run, then actually read its findings
rather than assuming it passed or guessing what it checks.

For every finding: either fix it, or write a short, specific justification
in the PR description for why you're not fixing it. "It's just a warning"
is not a justification the standard from this morning would accept.

Before you consider the PR merge-ready, re-check it against the checklist
from the Introduction this morning: fixes it for every owner, migration
reviewed by a human with existing rows accounted for, a test that would
have caught the original bug, and every automated finding triaged.
