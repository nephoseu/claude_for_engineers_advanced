-- 001_initial.sql
-- Applied historically. Kept for the migration trail participants should read.
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  owner TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
