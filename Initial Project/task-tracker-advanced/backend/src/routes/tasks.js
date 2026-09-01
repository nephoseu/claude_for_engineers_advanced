const express = require('express');
const router = express.Router();
const { listTasks, createTask, activeCount } = require('../controllers/tasksController');

router.get('/', listTasks);
router.post('/', createTask);
router.get('/active-count', activeCount);

module.exports = router;
