# Lab 4: Subagents, Skills & Hooks in Practice

**Module 4: Subagents, Skills & Hooks**

---

## Goal

Put the project's pre-configured subagents to work, notice the Skill and
hook you've already been triggering without necessarily naming them, and
delegate one more thing this project doesn't have set up yet.

## What you have

- `.claude/agents/test-runner.md` and `.claude/agents/log-triage.md` —
  already configured subagents.
- `.claude/skills/db-migration-review/SKILL.md, should have loaded
  automatically at some point during Lab 3 if you touched a migration.
- `.claude/hooks/warn-on-schema-edit.sh`, should have fired at some point
  if you edited schema or migration files.

## What to do

First, use `test-runner` deliberately to get a clean pass/fail read on your
Lab 3 changes instead of reading raw `npm test` output. Notice what it does
and doesn't include in its report.

Second, look back at Lab 3: did the `db-migration-review` Skill actually
show up, and did the hook actually fire? If you didn't touch a migration in
Lab 3, trigger both deliberately now, start a conversation about writing
one, even a throwaway example, and watch for both.

Third, the open-ended part, pick one thing this project *doesn't* have a
subagent or Skill for yet, and either delegate that task to a fresh subagent
you define on the spot, or sketch what a Skill for it would contain. A
natural candidate: a read-only code-review pass over your Lab 3 diff before
you open a PR this afternoon. You don't have to make it reusable or perfect
— the point is practicing the decision of *when* isolation or a packaged
skill is worth it, not producing a polished artifact.

---

Want more structure? See the companion document:
**`lab-4-subagents-skills-hooks-steps.md`**.
