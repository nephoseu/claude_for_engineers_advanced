const test = require('node:test');
const { after } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');

// Use an isolated DB file for tests so we don't touch the seeded dev data.
const DB_PATH = path.join(__dirname, '..', 'src', 'db', 'tasks.test.db');
process.env.TEST_DB_PATH = DB_PATH;
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const Database = require('better-sqlite3');
const schema = fs.readFileSync(path.join(__dirname, '..', 'src', 'db', 'schema.sql'), 'utf8');
const db = new Database(DB_PATH);
db.exec(schema);

// Mirrors seed.js: a mix of string-typed and native-typed `completed` values,
// which is the real-world shape this bug shows up in.
db.exec(`
  INSERT INTO tasks (title, status, completed, owner) VALUES
    ('Older task, string false', 'active', 'false', 'ana'),
    ('Older task, string true',  'completed', 'true', 'ana'),
    ('Newer task, native 0',     'active', 0, 'ana'),
    ('Newer task, native 1',     'completed', 1, 'ana');
`);

test('active count includes tasks written by both the old and new write paths', () => {
  // ana has two active tasks: one written as string 'false', one as native 0.
  const row = db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE owner = 'ana' AND completed = 0`).get();
  assert.strictEqual(
    row.count,
    2,
    `Expected 2 active tasks for ana, got ${row.count}. The query only matches native 0, ` +
      `so the task written with the string 'false' is being silently dropped from the count.`
  );
});

after(() => {
  db.close();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
});
