# Lab 4: Step-by-Step

**Companion to `lab-4-subagents-skills-hooks.md`. Module 4: Subagents, Skills & Hooks**

---

This is optional. The main lab document states the goal and leaves the
approach to you, use this only if you want more scaffolding, or if you're
short on time and would rather follow a known-good sequence than explore.

1. Ask Claude Code to delegate to the `test-runner` subagent and report
   back only the pass/fail summary for the backend suite.
2. Open `.claude/skills/db-migration-review/SKILL.md` and
   `.claude/hooks/warn-on-schema-edit.sh` and re-read what each is supposed
   to do.
3. If neither fired during Lab 3, start a scratch conversation proposing a
   trivial migration (e.g., adding an unused nullable column) purely to
   observe the Skill and hook trigger, don't actually run it.
4. Define a new, temporary subagent (in conversation, or as a throwaway
   file under `.claude/agents/`) whose only job is: read-only review of a
   git diff, flagging anything that looks unrelated to the stated fix.
5. Point it at your Lab 3 branch's diff and read what it flags.
6. Decide whether you'd keep this subagent in the project long-term, note
   why or why not.
