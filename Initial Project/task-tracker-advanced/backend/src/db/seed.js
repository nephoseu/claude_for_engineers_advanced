// Seeds realistic-looking data, including the write-path inconsistency
// described in migrations/002_add_completed_flag.sql.
// Run with: npm run db:seed
const db = require('./client');

db.exec('DELETE FROM tasks');

const insert = db.prepare(
  `INSERT INTO tasks (title, status, completed, owner) VALUES (?, ?, ?, ?)`
);

const rows = [
  // Older rows: written back when `completed` was stored as the STRING 'true'/'false'.
  ['Write Q3 retro doc', 'completed', 'true', 'ana'],
  ['Fix flaky checkout test', 'completed', 'true', 'ana'],
  ['Update onboarding guide', 'active', 'false', 'ana'],
  ['Prepare demo environment', 'active', 'false', 'marko'],
  // Newer rows: written by the second code path, using native 0/1 instead of strings.
  ['Rotate staging credentials', 'completed', 1, 'marko'],
  ['Investigate slow dashboard query', 'active', 0, 'marko'],
  ['Draft incident postmortem', 'completed', 1, 'ivana'],
  ['Review pending PRs', 'active', 0, 'ivana'],
  // A couple of rows where `completed` was never backfilled at all.
  ['Legacy task from before the migration', 'completed', null, 'ana'],
  ['Another legacy task', 'active', null, 'marko'],
];

for (const row of rows) insert.run(...row);

console.log(`Seeded ${rows.length} tasks into ${db.name}`);
