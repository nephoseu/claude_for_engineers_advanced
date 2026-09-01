# Lab 2: Diagnose the Incident

**Module 2: Multi-Tool Diagnostic Workflow**

---

## Goal

Turn Support Ticket #4417 into an actual root-cause diagnosis, by pulling
together everything you have access to, issue context, schema, logs, and
source, rather than guessing from the code alone.

## What you have

- `docs/INCIDENT_BRIEF.md`,  the ticket and what "done" will look like later
  today (you're not fixing it yet, just diagnosing it).
- `backend/src/db/migrations/`, the schema's history, in order.
- `backend/logs/app.log`,  application logs, readable directly or through
  the `log-triage` subagent (`.claude/agents/log-triage.md`).
- `backend/src/controllers/tasksController.js` and `backend/src/routes/tasks.js`, the code path behind the broken endpoint.
- What you already found in Lab 1 about the `completed` column.

## What to do

Confirm, with evidence, exactly why `GET /tasks/active-count` disagrees with
`GET /tasks` for some owners. Use whichever combination of tools gets you
there fastest, reading the migrations yourself, delegating a log search to
`log-triage`, asking Claude Code to trace the query against what Lab 1
turned up, or some mix of all three. There's no prescribed order.

By the end, you should be able to explain the root cause out loud, in one or
two sentences, to someone who hasn't looked at the code, and be specific
about which rows it affects and which it doesn't. Write that explanation
down somewhere (a scratch file, a comment, a draft PR description), you'll
reuse it directly in Lab 3 and again in this afternoon's PR.

---

Want more structure? See the companion document:
**`lab-2-diagnose-the-incident-steps.md`**.
