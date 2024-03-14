const express = require('express')
const router = express.Router()
const {getUsers, getUserById, addUser, updateUser, deleteUser, deleteAllUsers, registerUser, loginUser} = require('../controllers/user.controller')

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.delete('/', deleteAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router