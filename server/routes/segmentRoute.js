const express = require('express')
const router = express.Router()
const {getSegments, addSegment, deleteAllSegments, deleteSegment, updateSegment, updateOrderSegment} = require('../controllers/segment.controller')

router.get('/:room_name', getSegments)
router.post('/', addSegment)
router.delete('/', deleteAllSegments)
router.delete('/:id', deleteSegment)
router.put('/:id', updateSegment)
router.patch('/order/:id', updateOrderSegment)

module.exports = router