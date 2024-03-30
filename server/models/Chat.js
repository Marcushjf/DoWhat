const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema(
    {
        room_name:{
            type: String,
            required: true,
        },
        message:{
            type: String,
            default:""
        },
        username:{
            type: String,
            default:""
        },
        status:{
            type: String,
            default:""
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", ChatSchema)

module.exports = {Chat}