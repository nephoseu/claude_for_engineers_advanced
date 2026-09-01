# Lab 2: Step-by-Step

**Companion to `lab-2-diagnose-the-incident.md`. Module 2: Multi-Tool Diagnostic Workflow**

---

This is optional. The main lab document states the goal and leaves the
approach to you, use this only if you want more scaffolding, or if you're
short on time and would rather follow a known-good sequence than explore.

1. Re-read `docs/INCIDENT_BRIEF.md` for exactly what the user reported.
2. Read `backend/src/db/migrations/001_initial.sql` and
   `backend/src/db/migrations/002_add_completed_flag.sql` in order, the
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
