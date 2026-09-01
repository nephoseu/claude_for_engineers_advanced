-- Task Tracker schema
-- NOTE FOR PARTICIPANTS: this schema was extended by a previous contributor
-- (see migrations/002_add_completed_flag.sql) without updating every write path.
-- That inconsistency is the root of the diagnostic task in docs/INCIDENT_BRIEF.md.
-- Do not "clean it up" outright on main — reproduce it, understand it, then fix it
-- on a branch with a proper migration and tests.

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',   -- 'active' | 'completed'  (original column)
  completed TEXT DEFAULT NULL,             -- added later, inconsistently populated: 'true' | 'false' | NULL | 1 | 0
  owner TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tasks_owner ON tasks(owner);
