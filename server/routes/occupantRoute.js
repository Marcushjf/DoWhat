const express = require('express')
const router = express.Router()
const {getOccupants, deleteAllOccupants, getOccupiedRooms, leaveRoom} = require('../controllers/occupant.controller')

router.get('/', getOccupants)
router.delete('/', deleteAllOccupants)
router.get('/:user', getOccupiedRooms )
router.delete('/leave', leaveRoom)

module.exports = router