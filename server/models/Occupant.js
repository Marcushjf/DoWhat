const mongoose = require('mongoose')

const OccupantSchema = mongoose.Schema(
    {
        user:{
            type: String,
            required: true,
        },
        room:{
            type: String,
            required: true,
        },
    },
)

const Occupant = mongoose.model("Occupant", OccupantSchema)

module.exports = {Occupant}