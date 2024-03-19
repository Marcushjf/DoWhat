const express = require('express')
const router = express.Router()
const {getTasks, addTask, deleteAllTasks, getTasksByRoom} = require('../controllers/task.controller')

router.get('/:segment_id', getTasks)
router.get('/get/:room_name', getTasksByRoom)
router.post('/', addTask)
router.delete('/', deleteAllTasks)

module.exports = router