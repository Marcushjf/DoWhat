const{Chat} = require('../models/Chat');
const{Room} = require('../models/Room')
const{User} = require('../models/User')
const { route } = require('../routes/roomRoutes');

const getChats = async (req, res) => {
    try {
        
        const chats = await Chat.find({});

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoomChats = async (req, res) => {
    let { room_name } = req.params;
    try {
        let chats = await Chat.find({ room_name: room_name }).sort({ createdAt: -1 });

        if (chats.length > 100) {
            // Delete chats beyond the first 100
            const chatsToDelete = chats.slice(100);
            await Chat.deleteMany({ _id: { $in: chatsToDelete.map(chat => chat._id) } });

            // Keep only the most recent 100 chats
            chats = chats.slice(0, 100);
        }

        // Reverse the array to maintain the original order
        chats.reverse();

        return res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const deleteAllChats = async (req, res) => {
    try {
        const result = await Chat.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All Chats deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No chats found to delete.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRoomChat = async (req,res) => {
    let {room_name} = req.params;
    try{
        const room = await Room.findOne({ room_name });
        if (!room) {
            return res.status(404).json({ message: `'${room_name}' does not exist.` });
        }
        const result = await Chat.deleteMany({room_name:room_name})
        if (result.deletedCount > 0) {
            res.status(200).json({ message: `All Chats deleted from ${room_name}.` });
        } else {
            res.status(404).json({ message: `No chats found in ${room_name}.` });
        }
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

const sendChat = async (req, res) => {
    const { room_name } = req.params;
    const { message, username } = req.body;
    try {
        const user = await User.findOne({ name: username });
        if (!user) {
            return res.status(404).json({ message: `User '${username}' does not exist.` });
        }

        const room = await Room.findOne({ room_name });
        if (!room) {
            return res.status(404).json({ message: `'${room_name}' does not exist.` });
        }

        const result = await Chat.create({ room_name, message, username });
        if (result) {
            console.log(`${username} sent "${message}" in ${room_name}`)
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: `Unable to create chat message.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getChats,
    deleteAllChats,
    getRoomChats,
    deleteRoomChat,
    sendChat
}