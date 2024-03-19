const express = require('express')
const router = express.Router()
const {getSegments, addSegment, deleteAllSegments, deleteSegment} = require('../controllers/segment.controller')

router.get('/:room_name', getSegments)
router.post('/', addSegment)
router.delete('/', deleteAllSegments)
router.delete('/:id', deleteSegment)

module.exports = router