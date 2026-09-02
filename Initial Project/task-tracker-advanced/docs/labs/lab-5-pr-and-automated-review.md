# Lab 5 — Open the PR & Triage Automated Review

**Module 5: Pull Requests & Automated Review**

---

## Goal

Turn your branch from Labs 3–4 into an actual pull request that meets this
morning's standard, and respond to what the automated review actually says
about it — not what you assume it'll say.

## What you have

- Your fix, migration (if any), and tests from Lab 3.
- Anything you decided to keep from Lab 4.
- `.github/PULL_REQUEST_TEMPLATE.md` — fills in automatically when you open
  a PR.
- `.github/workflows/pr-review.yml` — the automated review, which runs on
  every PR.

## What to do

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

---

Want more structure? See the companion document:
**`lab-5-pr-and-automated-review-steps.md`**.
