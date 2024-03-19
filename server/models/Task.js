const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
    {
        task_name:{
            type: String,
            required: true,
        },
        segment_id:{
            type: String,
            required: true,
        },
        room_name:{
            type: String,
            required:true
        },
        deadline:{
            type: String,
            default: "NIL",
        },
        status:{
            type: String,
            default: ""
        },
        description:{
            type:String,
            default: ""
        },
    },
)

const Task = mongoose.model("Task", TaskSchema)

module.exports = {Task}