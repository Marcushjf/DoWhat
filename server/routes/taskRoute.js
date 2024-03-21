const express = require('express')
const router = express.Router()
const {getTasks, addTask, deleteAllTasks, getTasksByRoom, changeStatusTask, deleteTaskById, changeTask} = require('../controllers/task.controller')

router.get('/:segment_id', getTasks)
router.get('/get/:room_name', getTasksByRoom)
router.post('/', addTask)
router.delete('/', deleteAllTasks)
router.delete('/:id', deleteTaskById)
router.put('/status/:id', changeStatusTask)
router.put('/:id', changeTask)

module.exports = router