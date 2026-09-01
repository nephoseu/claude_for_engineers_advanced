# Lab 5: Step-by-Step

**Companion to `lab-5-pr-and-automated-review.md`. Module 5: Pull Requests & Automated Review**

---

This is optional. The main lab document states the goal and leaves the
approach to you, use this only if you want more scaffolding, or if you're
short on time and would rather follow a known-good sequence than explore.

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
9. Leave the PR open (don't merge), you'll walk through it live this
   afternoon.
