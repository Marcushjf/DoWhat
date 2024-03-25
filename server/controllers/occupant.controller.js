const { Chat } = require('../models/Chat');
const {Task} = require('../models/Task')
const {Segment} = require('../models/Segment')
const {Occupant} = require('../models/Occupant')
const{Room} = require('../models/Room');
const { route } = require('../routes/roomRoutes');

const getOccupants = async (req, res) => {
    try {
        
        const Occupants = await Occupant.find({});

        res.status(200).json(Occupants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllOccupants = async (req, res) => {
    try {
        // Use the deleteMany method to delete all documents from the Room collection
        const result = await Occupant.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All occupants deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No rooms found to delete.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOccupiedRooms = async (req, res) => {
    const { user } = req.params;
    try {
        // Find all rooms where the user is present
        const occupiedRooms = await Occupant.find({ user: user });
        const roomNames = occupiedRooms.map(room => room.room);
        const rooms = await Room.find({ room_name: { $in: roomNames } });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const leaveRoom = async (req, res) => {
    const { user, room } = req.body;
    try {
        // Delete the user from the Occupant collection
        await Occupant.findOneAndDelete({ user, room });

        // Find the room and decrement its size by 1
        const updatedRoom = await Room.findOneAndUpdate(
            { room_name: room },
            { $inc: { size: -1 }, $pull: { users: user } }, // Decrement size by 1
            { new: true } // Return the updated document
        );

        // If the updated room has size 0, delete the room
        if (updatedRoom.size === 0) {
            await Room.deleteOne({ room_name: room });
            // Delete tasks associated with the room
            await Task.deleteMany({ room_name: room });
            // Delete segments associated with the room
            await Segment.deleteMany({ room_name: room });
            // Delete chats associated with the room
            await Chat.deleteMany({ room_name: room });
            return res.status(200).json({ message: 'User left the room successfully and Room deleted.' });
        }
        
        console.log(`${user} left ${room}`)
        res.status(200).json({ message: 'User left the room successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




module.exports = {
    getOccupants,
    deleteAllOccupants,
    getOccupiedRooms,
    leaveRoom
}