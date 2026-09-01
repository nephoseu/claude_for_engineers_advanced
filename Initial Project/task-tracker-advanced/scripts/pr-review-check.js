#!/usr/bin/env node
// Simulated "automated PR review" for the Advanced day.
// Runs a handful of cheap, real static checks against the diff vs. main and
// prints findings. Exits non-zero if any HIGH-severity finding is present so
// it fails the CI job as a real reviewer bot would; MEDIUM/LOW just get
// printed for participants to triage.
const { execSync } = require('child_process');

function diffFiles() {
  try {
    const out = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch {
    // Fallback for local runs without a configured remote/base.
    const out = execSync('git diff --name-only main...HEAD', { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  }
}

function diffText() {
  try {
    return execSync('git diff origin/main...HEAD', { encoding: 'utf8' });
  } catch {
    return execSync('git diff main...HEAD', { encoding: 'utf8' });
  }
}

const findings = [];
const files = diffFiles();
const diff = diffText();

// 1. Any SQL migration touched without a matching test file also touched.
const touchesMigration = files.some((f) => f.startsWith('backend/src/db/migrations/'));
const touchesTest = files.some((f) => f.startsWith('backend/tests/'));
if (touchesMigration && !touchesTest) {
  findings.push({
    severity: 'HIGH',
    message: 'A migration was added or changed but no test file was touched in this PR. Every migration needs a test that would have caught the problem it fixes.',
  });
}

// 2. Raw console.log left in shipped backend code (noise / potential leak).
const addedLines = diff.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
if (addedLines.some((l) => /console\.log\(/.test(l) && !l.includes('scripts/'))) {
  findings.push({
    severity: 'MEDIUM',
    message: 'console.log() found in added backend code. Use the existing logger (middleware/requestLogger.js) instead so it lands in backend/logs/app.log.',
  });
}

// 3. Migration file present but not referenced from schema.sql comments/history.
if (touchesMigration && !files.includes('backend/src/db/schema.sql')) {
  findings.push({
    severity: 'LOW',
    message: 'A migration was added but backend/src/db/schema.sql was not updated to reflect the new shape. Confirm this is intentional.',
  });
}

if (findings.length === 0) {
  console.log('Automated PR review: no findings.');
  process.exit(0);
}

console.log('Automated PR review findings:\n');
for (const f of findings) {
  console.log(`[${f.severity}] ${f.message}`);
}

const hasHigh = findings.some((f) => f.severity === 'HIGH');
process.exit(hasHigh ? 1 : 0);
