---
name: db-migration-review
description: Use whenever writing, reviewing, or discussing a SQL migration for the Task Tracker database. Encodes the checklist a migration needs to pass before it's allowed to run against any shared environment.
---

# Database Migration Review

Before proposing or applying a migration in this project, check it against
every item below. Present the checklist result alongside the migration -
don't just apply it silently.

## Checklist

- **Reversible or explicitly justified.** Prefer additive changes (new column,
  new table). If a change is destructive (drop column, drop table, backfill
  overwrite), say so explicitly and confirm with the user before writing it.
- **No mixed representations.** If a column stores a boolean-like value,
  every write path must use the same representation (this project has already
  been bitten by this once - see `backend/src/db/migrations/002_add_completed_flag.sql`).
- **Existing rows accounted for.** New columns need a stated default or an
  explicit backfill step - don't leave existing rows in an undefined state.
- **Matching test.** Every migration ships with a test that would have caught
  the problem it's fixing, not just a test that the migration ran.
- **Human review of the raw SQL before it executes.** Never run a generated
  migration against the database without the SQL being read by a person first.

## Output shape

When proposing a migration, produce:
1. The migration file itself.
2. A one-paragraph plain-language explanation of what it changes and why.
3. The checklist above, with a pass/flag next to each item.
