const {Room} = require('../models/Room.js')
const{User} = require('../models/User.js')
const{Occupant} = require('../models/Occupant.js')

const getProducts = async (req, res) => {
    try {
        
        const rooms = await Room.find({});
        // const roomsData = [];
        // for (let i = 0; i < rooms.length; i++) {
        //     const obj = { room_name: rooms[i].room_name, size: rooms[i].size };
        //     roomsData.push(obj);
        // }
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProductById = async (req,res)=>{
    try {
        const {id} = req.params
        const room = await Room.findById(id)
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const addRoom = async (req,res)=>{
    const { room_name, userid } = req.body;
    try {

        //check if room already exists
        const existingRoom = await Room.findOne({room_name})
        if(existingRoom){
            return res.status(404).json({ message: 'Room already exists.' });
        }

        //check if user is registered
        const user = await User.findOne({name: userid})

        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }
    
        await Occupant.create({user:userid, room:room_name})
        
        const room = await Room.create({ room_name, size:1})
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateRoom = async (req,res)=>{
    try {
        const {id} = req.params
        const room = await Room.findByIdAndUpdate(id, req.body)

        if(!room){
            return res.status(404).json({message: 'Product Not Found'})
        }

        const updatedRoom = await Room.findById(id)
        res.status(200).json(updatedRoom)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteRoom = async (req,res)=>{
    try {
        const {id} = req.params
        const room = await Room.findByIdAndDelete(id)

        if(!room){
            return res.status(404).json({message: 'Product Not Found'})
        }
        res.status(200).json({message:'Product Deleted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteAllRooms = async (req, res) => {
    try {
        // Use the deleteMany method to delete all documents from the Room collection
        const result = await Room.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All rooms deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No rooms found to delete.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    getProducts,
    getProductById,
    addRoom,
    updateRoom,
    deleteRoom,
    deleteAllRooms
}