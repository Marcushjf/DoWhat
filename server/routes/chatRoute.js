const express = require('express')
const router = express.Router()
const {getChats, deleteAllChats, deleteRoomChat, getRoomChats, sendChat} = require('../controllers/chat.controller')

router.get('/', getChats)
router.delete('/', deleteAllChats)
router.delete('/:room_name', deleteRoomChat)
router.get('/:room_name', getRoomChats)
router.post('/:room_name', sendChat)

module.exports = router