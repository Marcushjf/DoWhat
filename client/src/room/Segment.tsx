import { useState } from "react";
import TaskCard from "./TaskCard";
import { Socket } from "socket.io-client";
import { EditModal } from "./SegmentModals";
import { ConfirmationModal } from "../modals/Confirmation";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import DroppableContainer from "../drag&drop/DroppableContainer";
import DragDropContextWrapper from "../drag&drop/DragDropContextWrapper";

interface SegmentProps {
  segment: any;
  tasks: any[];
  socket: Socket;
}

function Segment({ segment, tasks, socket }: SegmentProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [error, setError] = useState("");

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSegment = (segment_name: string, deadline: string) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/segment/${segment._id}`, {
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

  const handleAddTask = () => {
    setShowInput(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleSubmit = () => {
    // Submit the new task name
    // Reset state
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/`, {
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/segment/${segment._id}`, {
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
  };


  return (
    
      <div className="border p-2 position-relative rounded-4" style={{ backgroundColor: '#1c1f22' }} id="fadeIn">
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
            <button className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#edit${segment._id}`}>
              Edit
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#remove${segment._id}`}>
              Remove
            </button>
          </li>
        </ul>
      </div>

      <h3 className="p-3">{segment.segment_name}</h3>
      {segment.deadline && <h5 className="p-3">{`Deadline : ${segment.deadline}`}</h5>}
      <DroppableContainer droppableId={segment._id}>
        {tasks.map((task, index) => (
          <Draggable draggableId={task._id} key={task._id} index={index}>
            {(provided)=>(
              <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                <TaskCard task={task} socket={socket} />
              </div>  
            )}
          </Draggable>
        ))}
      </DroppableContainer>

      <div className="p-2">
        {showInput ? (
          <div className="hstack gap-2">
            <input className="form-control p-1 m-0 ps-2" type="text" placeholder="Task name" aria-label="Task name" value={newTaskName} onChange={handleInputChange} />
            <button type="button" className="btn btn-secondary p-1" style={{ width: '50px' }} onClick={handleSubmit}>Add</button>
            <div className="vr"></div>
            <button type="button" className="btn btn-outline-danger p-1" style={{ width: '50px' }} onClick={handleCancel}><i className="bi bi-x-lg"></i></button>
          </div>

        ) : (
          <button
            className="btn btn-secondary w-100 p-2 rounded-pill"
            type="button"
            onClick={handleAddTask}
          >
            <i className="bi bi-plus-lg"></i>Add Task
          </button>
        )}
      </div>

      <div>
        {/* Modals */}
        <EditModal onEditSegment={handleEditSegment} segment={segment} id={`edit${segment._id}`}/>
        <ConfirmationModal onConfirmRemove={handleConfirmRemove} id={`remove${segment._id}`} message="remove segment" />
      </div>
    </div>
    
  );
}

export default Segment;
