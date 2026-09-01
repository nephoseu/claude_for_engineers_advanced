const express = require('express');
const tasksRouter = require('./routes/tasks');
const { requestLogger } = require('./middleware/requestLogger');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Task Tracker API listening on :${PORT}`));

module.exports = app;
