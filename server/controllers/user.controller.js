const {User} = require('../models/User')

const getUsers = async (req, res )=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getUserById = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const addUser = async (req,res)=>{
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateUser = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, req.body)

        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }

        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteUser = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)

        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }
        res.status(200).json({message:'User Deleted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        // Use the deleteMany method to delete all documents from the user collection
        const result = await User.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All users deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No users found to delete.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
}