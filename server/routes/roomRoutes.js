const express = require('express')
const router = express.Router()
const {getProducts, getProductById, addRoom, updateRoom, deleteRoom, deleteAllRooms, joinRoom, getUsers} = require('../controllers/room.controller.js')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.get('/users/:room_name', getUsers)
router.post('/create', addRoom)
router.put('/join', joinRoom)
router.put('/:id', updateRoom)
router.delete('/:id', deleteRoom)
router.delete('/', deleteAllRooms)

module.exports = router