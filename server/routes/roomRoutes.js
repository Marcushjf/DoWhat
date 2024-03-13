const express = require('express')
const router = express.Router()
const {getProducts, getProductById, addRoom, updateRoom, deleteRoom, deleteAllRooms} = require('../controllers/room.controller.js')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', addRoom)
router.put('/:id', updateRoom)
router.delete('/:id', deleteRoom)
router.delete('/', deleteAllRooms)

module.exports = router