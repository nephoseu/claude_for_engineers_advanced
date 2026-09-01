# Lab 3: Step-by-Step

**Companion to `lab-3-migration-and-tests.md`. Module 3: Safe Schema Changes**

---

This is optional. The main lab document states the goal and leaves the
approach to you, use this only if you want more scaffolding, or if you're
short on time and would rather follow a known-good sequence than explore.

1. `git checkout -b fix/active-count`.
2. Decide: query-only fix (normalize `completed` at query time, e.g. treat
   `'false'`/`0`/`NULL` consistently) vs. a migration that backfills the
   column into one consistent representation. Either is acceptable, write
   down which one you picked and why.
3. If you're writing a migration: ask Claude Code to propose one, then read
   the generated SQL yourself against the checklist in
   `.claude/skills/db-migration-review/SKILL.md` before running it.
4. Update or extend `backend/tests/tasks.test.js` so it covers more than one
   owner and more than one representation of `completed`.
5. Run `cd backend && npm test`, confirm it's currently red for the right
   reason.
6. Apply the fix in `backend/src/controllers/tasksController.js` (and the
   migration, if you wrote one).
7. Re-run the suite until green.
8. Manually sanity-check against the seed data for at least two different
   owners, not just `ana`.
