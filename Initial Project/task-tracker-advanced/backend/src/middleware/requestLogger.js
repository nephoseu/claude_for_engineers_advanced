const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '..', '..', 'logs', 'app.log');

function log(line) {
  const entry = `${new Date().toISOString()} ${line}\n`;
  fs.appendFileSync(LOG_PATH, entry);
}

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    log(`INFO ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });
  next();
}

module.exports = { requestLogger, log };
