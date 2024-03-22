import { useState } from "react";
import TaskCard from "./TaskCard";
import { Socket } from "socket.io-client";
import { EditModal} from "./SegmentModals";
import { ConfirmationModal } from "../modals/Confirmation";

interface SegmentProps {
  segment: any;
  tasks: any[];
  socket: Socket;
}

function Segment({ segment, tasks, socket }: SegmentProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [error, setError] = useState("");

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSegment = (segment_name:string, deadline:string) => {
    fetch(`http://localhost:3001/api/segment/${segment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        segment_name: segment_name,
        room_name: segment.room_name,
        deadline: deadline,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error editing segment.");
        }
        return response.json();
      })
      .then((data) => {
        socket.emit("add_segment", { room_name: segment.room_name });
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      });
    setShowEditModal(false);
  };

  const handleRemove = () => {
    setShowRemoveModal(true)
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
    fetch("http://localhost:3001/api/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: newTaskName,
        segment_id: segment._id,
        room_name: segment.room_name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding task.");
        }
        return response.json();
      })
      .then((data) => {
        socket.emit("add_task", { room_name: segment.room_name });
      })
      .catch((error) => {
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

  const handleConfirmRemove = () => {
    // Handle confirming remove segment
    fetch(`http://localhost:3001/api/segment/${segment._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Handle successful login
          console.log(data)
          socket.emit('add_segment', { room_name: segment.room_name });
        })
        .catch((error) => {
          // Handle login error
          console.log(error);
        });
      setShowRemoveModal(false);
  };


  return (
    <div className="border p-2 position-relative">
      <div className="dropdown position-absolute top-0 end-0 m-3">
        <button
          className="btn"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-three-dots"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={() => handleEdit()}>
              Edit
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleRemove()}>
              Remove
            </button>
          </li>
        </ul>
      </div>

      <h3>{segment.segment_name}</h3>
      <h5>{`By: ${segment.deadline}`}</h5>
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} socket={socket}/>
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
              <i className="bi bi-x-lg"></i>
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        ) : (
          <button
            className="btn btn-primary w-100 "
            type="button"
            onClick={handleAddTask}
          >
            <i className="bi bi-plus-lg"></i>Add Task
          </button>
        )}
      </div>

      <div>
      {/* Segment content */}
      <EditModal
        show={showEditModal}
        onCancel={() => setShowEditModal(false)}
        onEditSegment={handleEditSegment}
      />
      <ConfirmationModal
        show={showRemoveModal}
        onCancel={() => setShowRemoveModal(false)}
        onConfirmRemove={handleConfirmRemove}
        message="remove segment"
      />
    </div>
    </div>
  );
}

export default Segment;