const {Segment} = require('../models/Segment')
const {Task} = require('../models/Task')

// Get segments from room
const getSegments = async (req, res) => {
    let { room_name } = req.params;
    try {
        const segments = await Segment.find({ room_name: room_name });
        res.status(200).json(segments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Add a segment
const addSegment = async (req,res) => {
    const { segment_name, room_name, deadline } = req.body;
    try {
        const segment = await Segment.create({segment_name:segment_name, room_name:room_name, deadline:deadline});
        if(!segment){
            return res.status(404).json({ message: "failed to create segment" });
        }
        res.status(200).json(segment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAllSegments = async (req, res) => {
    try {
        // Use the deleteMany method to delete all documents from the Room collection
        const result = await Segment.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All segments deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No segments found to delete.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSegment = async (req, res) => {
    try {
        const { id } = req.params;
        const segment = await Segment.findByIdAndDelete(id);

        if (!segment) {
            return res.status(404).json({ message: 'Segment Not Found' });
        } else {
            // Delete all tasks associated with the segment
            await Task.deleteMany({ segment_id: id });
        }

        res.status(200).json({ message: 'Segment Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateSegment = async (req,res)=>{
    try {
        const {id} = req.params
        const segment = await Segment.findByIdAndUpdate(id, req.body)

        if(!segment){
            return res.status(404).json({message: 'Segment Not Found'})
        }

        const updatedSegment = await Segment.findById(id)
        res.status(200).json(updatedSegment)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports = {
    getSegments,
    addSegment,
    deleteAllSegments,
    deleteSegment,
    updateSegment
}