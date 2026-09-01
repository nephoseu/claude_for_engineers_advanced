# Course Introduction — Facilitator Script

**Duration: ~20 min · Follows Welcome & Environment Check, precedes Module 1**

Unlike the old kickoff, this is intentionally short — each module now opens
with its own short lecture and its own lab intro, so this section only
needs to set up what's common to the whole day: the scenario, the
constraints, and the standard. Resources like MCP, subagents, Skills, and
PR review are introduced inside the module where they're actually used, not
all at once here.

## The Scenario (0:00–0:07)

> SAY: "Everything you do today happens inside one running scenario: a real
> support ticket against a real-ish codebase. Five modules, five labs, all
> against the same repo, all building toward one pull request by the end of
> the day."

Read `docs/INCIDENT_BRIEF.md`'s ticket text aloud, verbatim: *"My active
count says 2 but I have 4 open tasks."*

> SAY: "That's genuinely all you're told. Where the bug lives, why it only
> affects some users, what the right fix looks like — that's what the day
> is for. I'm not going to tell you where it is."

DO: Show the dashboard running locally with the mismatch visible.

## The Constraints (0:07–0:14)

> SAY: "Three constraints hold for the entire day, across every module."

1. **No production write access** — every credential today is read-mostly.
2. **Branch-and-PR only** — nothing lands on `main` directly.
3. **A human reads every generated SQL statement before it runs** — no
   exceptions, including inside Claude Code's own proposals.

> SAY: "You'll feel that third one most directly in Module 3. Keep it in
> mind starting now, though — it applies the moment you're exploring the
> database in Module 1, too."

## The Standard (0:14–0:19)

> SAY: "One more thing before we start Module 1: what 'done' looks like by
> 4:45 this afternoon."

Walk through the checklist from `docs/INCIDENT_BRIEF.md`:

1. Fixes the discrepancy for **all** owners, not just the one in the ticket.
2. Includes a migration, if needed — human-reviewed, existing rows
   accounted for.
3. Includes a test that fails before the fix and passes after it.
4. Has gone through the automated PR review, with every finding triaged.

> SAY: "Each module builds toward one piece of this. You won't be able to
> tick every box until Module 5, and that's expected — today is
> cumulative, not five separate exercises."

## Go (0:19–0:20)

> SAY: "One more note on how today runs: each module opens with a short
> concept explanation, then a lab intro slide where I'll tell you exactly
> what the lab is asking for and how much structure is available if you
> want it. If a lab guide's 'step-by-step' section is more detail than you
> need, skip it — it's there for whoever wants it, not a requirement."

DO: Move directly into Module 1's lecture slides.
