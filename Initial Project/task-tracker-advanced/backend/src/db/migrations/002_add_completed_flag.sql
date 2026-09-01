-- 002_add_completed_flag.sql
-- Added to support a "quick win" dashboard widget (active task count) without
-- touching the existing `status` column, which other parts of the app still rely on.
-- PROBLEM (this is the seed of the incident, not something to silently fix here):
-- the column was populated by application code as the STRING 'true' / 'false',
-- and later a second write path started using SQLite's native 1 / 0 instead.
-- A query that filters with `WHERE completed = 0` silently misses every row
-- written as the string 'false'.
ALTER TABLE tasks ADD COLUMN completed TEXT DEFAULT NULL;
