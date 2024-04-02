const mongoose = require('mongoose')

const SegmentSchema = mongoose.Schema(
    {
        segment_name:{
            type: String,
            required: true,
        },
        room_name:{
            type: String,
            required: true,
        },
        deadline:{
            type: String,
            default: "NIL",
        },
        completion:{
            type: Boolean,
            default: false,
        },
        tasks:{
            type: Array,
            default:[]
        }
    },
)

const Segment = mongoose.model("Segment", SegmentSchema)

module.exports = {Segment}