import { useState } from "react";
import TaskCard from "./TaskCard";
import { Socket } from "socket.io-client";

interface SegmentProps {
  segment: any;
  tasks: any[];
  socket: Socket
}

function Segment({ segment, tasks, socket }: SegmentProps) {
  const [showInput, setShowInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [error, setError] = useState('')

  const handleEdit = () => {
    // Handle edit functionality
    // You can implement your edit logic here
    console.log("Editing segment:", segment);
  };

  const handleAddTask = () => {
    setShowInput(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleSubmit = () => {
    // Submit the new task name
    // Reset state
    fetch('http://localhost:3001/api/task/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task_name:newTaskName, segment_id:segment._id, room_name:segment.room_name})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding task.');
            }
            return response.json();
        })
        .then(data => {
            socket.emit('add_task',({room_name:segment.room_name}))
            console.log(data)
        })
        .catch(error => {
            // Handle error
            setError(error.message);
        });
    setShowInput(false);
    setNewTaskName("");
  };

  const handleCancel = () => {
    // Cancel adding task
    setShowInput(false);
    setNewTaskName("");
  };

  return (
    
    <div className="border p-2 position-relative">
        <button
        className="btn btn-primary position-absolute top-0 end-0 m-3"
        onClick={handleEdit}
      >
        Edit
      </button>
      <h3>{segment.segment_name}</h3>
      <h5>{`By: ${segment.deadline}`}</h5>
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
      <div>
        {showInput ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task name"
              value={newTaskName}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        )}
      </div>
    </div>
  );
}

export default Segment;
