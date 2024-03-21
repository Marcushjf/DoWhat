const {Task} = require('../models/Task')

// Get Tasks from Room
const getTasksByRoom = async (req, res) => {
    const { room_name } = req.params;
    try {
        const Tasks = await Task.find({ room_name: room_name });
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get Tasks from segment
const getTasks = async (req, res) => {
    const { segment_id } = req.params;
    try {
        const Tasks = await Task.find({ segment_id: segment_id });
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addTask = async (req,res) => {
    const { task_name, segment_id, room_name } = req.body;
    try {
        const task = await Task.create({task_name:task_name, segment_id:segment_id, room_name:room_name});
        if(!task){
            return res.status(404).json({ message: "failed to create task" })
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAllTasks = async (req, res) => {
    try {
        const result = await Task.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All tasks deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No tasks found to delete.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeStatusTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeTask = async (req, res) => {
    const { id } = req.params;
    const { task_name, description } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { task_name, description },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteTaskById = async (req,res) => {
    const {id} = req.params
    try {
        const updatedTask = await Task.findByIdAndDelete(id);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({message:'Task Deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getTasks,
    addTask,
    deleteAllTasks,
    getTasksByRoom,
    changeStatusTask,
    deleteTaskById,
    changeTask
}