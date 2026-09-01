# Lab Step-by-Step Appendix

**Claude Code for Engineers — Advanced Day**

---

This is a companion to `Lab-Guides.md`, not a replacement for it. Each lab
in the main guide states a goal and leaves the approach to you — that's
still the intended way to work through the day. Use this appendix if you
want more scaffolding for a particular lab, or if you're short on time and
would rather follow a known-good sequence than explore.

There's no rule that you use this for every lab, or none of them. Plenty of
people use the main guide for two or three labs and this appendix for
whichever one they're least confident about.

---

## Lab 1 — Connect & Review MCP Permissions

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

## Lab 2 — Diagnose the Incident

1. Re-read `docs/INCIDENT_BRIEF.md` for exactly what the user reported.
2. Read `backend/src/db/migrations/001_initial.sql` and
   `backend/src/db/migrations/002_add_completed_flag.sql` in order — the
   second one describes a real problem it introduced.
3. Open `backend/src/controllers/tasksController.js` and find the
   `activeCount` function. Identify exactly which SQL condition it filters
   on.
4. Delegate to the `log-triage` subagent: ask it to search
   `backend/logs/app.log` around the ticket's filing date (2026-08-19) and
   summarize anything relevant.
5. Cross-reference: given what Lab 1 showed about the real contents of
   `completed`, which rows would the query in step 3 silently miss?
6. Write a one-paragraph root-cause statement: what's wrong, which rows are
   affected, and why it only shows up for some owners and not others.

## Lab 3 — Fix It Safely: Migration & Tests on a Branch

1. `git checkout -b fix/active-count`.
2. Decide: query-only fix (normalize `completed` at query time, e.g. treat
   `'false'`/`0`/`NULL` consistently) vs. a migration that backfills the
   column into one consistent representation. Either is acceptable — write
   down which one you picked and why.
3. If you're writing a migration: ask Claude Code to propose one, then read
   the generated SQL yourself against the checklist in
   `.claude/skills/db-migration-review/SKILL.md` before running it.
4. Update or extend `backend/tests/tasks.test.js` so it covers more than one
   owner and more than one representation of `completed`.
5. Run `cd backend && npm test` — confirm it's currently red for the right
   reason.
6. Apply the fix in `backend/src/controllers/tasksController.js` (and the
   migration, if you wrote one).
7. Re-run the suite until green.
8. Manually sanity-check against the seed data for at least two different
   owners, not just `ana`.

## Lab 4 — Subagents, Skills & Hooks in Practice

1. Ask Claude Code to delegate to the `test-runner` subagent and report
   back only the pass/fail summary for the backend suite.
2. Open `.claude/skills/db-migration-review/SKILL.md` and
   `.claude/hooks/warn-on-schema-edit.sh` and re-read what each is supposed
   to do.
3. If neither fired during Lab 3, start a scratch conversation proposing a
   trivial migration (e.g., adding an unused nullable column) purely to
   observe the Skill and hook trigger — don't actually run it.
4. Define a new, temporary subagent (in conversation, or as a throwaway
   file under `.claude/agents/`) whose only job is: read-only review of a
   git diff, flagging anything that looks unrelated to the stated fix.
5. Point it at your Lab 3 branch's diff and read what it flags.
6. Decide whether you'd keep this subagent in the project long-term — note
   why or why not.

## Lab 5 — Open the PR & Triage Automated Review

1. `git push -u origin fix/active-count` (or your branch's actual name).
2. Open a pull request against `main`. Confirm the template loaded.
3. Fill in "What this PR does" and "Diagnosis" using your Lab 2 write-up.
4. Check the "Tests" and "Migration review" boxes only once they're
   genuinely true, not preemptively.
5. Wait for the `pr-review` workflow to finish (Actions tab, or your git
   host's PR checks panel).
6. Read every finding it printed, not just the pass/fail status.
7. For each finding: fix it and re-push, or add a one-line justification
   under "Automated PR review" in the PR description.
8. Re-read the "What done looks like" checklist from
   `docs/INCIDENT_BRIEF.md` against your actual PR, item by item.
9. Leave the PR open (don't merge) — you'll walk through it live this
   afternoon.
