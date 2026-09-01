# Lab 3: Fix It Safely: Migration & Tests on a Branch

**Module 3: Safe Schema Changes**

---

## Goal

Turn your Lab 2 diagnosis into an actual fix, on a branch, backed by a
test that proves the bug and then proves the fix, and, if the fix needs a
schema change, a migration that a human has actually read before it runs.

## What you have

- Your root-cause note from Lab 2.
- `.claude/skills/db-migration-review/SKILL.md`, the checklist this project
  expects a migration to pass, which should load automatically once you
  start discussing one.
- `.claude/hooks/warn-on-schema-edit.sh`, fires automatically when you edit
  schema or migration files, as a reminder, not a blocker.
- `backend/tests/tasks.test.js`, the existing test, which currently fails
  for exactly the reason you diagnosed.

## What to do

Create a branch. Decide, based on your Lab 2 diagnosis, whether the right
fix is purely in the query, or whether it also needs a migration to
normalize the data going forward, either is defensible, but be able to
justify your choice. Write (or extend) a test that fails against the old
code and passes against your fix. Apply the fix. Run the suite.

**The constraint from this morning still applies: any generated SQL,
migration or otherwise, gets read by you before it runs.** If Claude Code
proposes a migration, that's the moment to actually read it, not skim it.

Remember the standard from this morning: the fix needs to hold for **every**
affected owner, not just the one in the ticket. Check your fix against more
than one example before calling it done.

---

Want more structure? See the companion document:
**`lab-3-migration-and-tests-steps.md`**.
