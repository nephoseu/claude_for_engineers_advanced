const path = require('path');
const Database = require('better-sqlite3');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'tasks.db');
const isNewDb = !fs.existsSync(DB_PATH);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

if (isNewDb) {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
}

module.exports = db;
