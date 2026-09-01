const db = require('../db/client');
const { log } = require('../middleware/requestLogger');

function listTasks(req, res) {
  const { owner } = req.query;
  const rows = owner
    ? db.prepare('SELECT * FROM tasks WHERE owner = ? ORDER BY id').all(owner)
    : db.prepare('SELECT * FROM tasks ORDER BY id').all();
  res.json(rows);
}

function createTask(req, res) {
  const { title, owner } = req.body || {};
  if (!title || !owner) {
    log(`WARN POST /tasks rejected - missing title or owner in payload`);
    return res.status(400).json({ error: 'title and owner are required' });
  }
  const info = db
    .prepare('INSERT INTO tasks (title, status, completed, owner) VALUES (?, ?, ?, ?)')
    .run(title, 'active', 0, owner); // new write path: native 0, matches migration 002's newer convention
  const created = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
}

// BUG: this filters on `completed = 0`, which only matches rows written by the
// newer code path (native 0/1). Rows written earlier as the string 'false' are
// silently excluded, so the count is wrong for any owner with older tasks.
// This is the entry point participants should trace during the diagnostic task -
// see docs/INCIDENT_BRIEF.md.
function activeCount(req, res) {
  const { owner } = req.query;
  try {
    const row = owner
      ? db.prepare('SELECT COUNT(*) as count FROM tasks WHERE owner = ? AND completed = 0').get(owner)
      : db.prepare('SELECT COUNT(*) as count FROM tasks WHERE completed = 0').get();
    res.json({ count: row.count });
  } catch (err) {
    log(`ERROR GET /tasks/active-count failed: ${err.message}`);
    res.status(500).json({ error: 'failed to compute active count' });
  }
}

module.exports = { listTasks, createTask, activeCount };
