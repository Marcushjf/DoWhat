const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        status:{
            type:String,
            default:''
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = {User}