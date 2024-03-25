import { useState } from "react";
import { Socket } from "socket.io-client";
import TaskModal from "./TaskCardModal";
import { ConfirmationModal } from "../modals/Confirmation";

interface TaskCardProps {
  task: any;
  socket: Socket
}

function TaskCard({ task, socket }: TaskCardProps) {
    const [showModal, setShowModal] = useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)


  const handleEdit = (task_name:string, description:string) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: task_name,
        description: description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error editing Task.");
        }
        return response.json();
      })
      .then((data) => {
        socket.emit("add_task", { room_name: task.room_name });
      })
      .catch((error) => {
        // Handle error
        console.log(error.message);
      });
  };

  const handleRemove = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          socket.emit('add_task', { room_name: task.room_name });
        })
        .catch((error) => {
          // Handle login error
          console.log(error);
        });
      setShowRemoveModal(false);
  }

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleRemoveModalOpen = () =>{
    setShowRemoveModal(true)
  }

  const handleStatus = (status:string) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/status/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: status
          }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          socket.emit('add_task', { room_name: task.room_name })
        })
        .catch((error) => {
          // Handle login error
          console.log(error);
        });
  };

  return (
    <div className="border p-1 m-1 row">
      <div className="col-10">{`${task.task_name} ${task.status}`}</div>
      <div className="col-1 m-0 p-0">
      <div className="dropdown">
          <button
            className="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={handleModalOpen}
              >
                Edit task
              </button>
            </li>
            <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
              <button
                className="dropdown-item"
                onClick={handleRemoveModalOpen}
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
        </div>
      <div className="col-1 m-0 p-0">
        <div className="dropdown">
          <button
            className="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-check2-square"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleStatus('completed')}
              >
                Mark as completed
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleStatus('important')}
              >
                Mark as important
              </button>
            </li>
          </ul>
        </div>
      </div>
      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleEdit}
      />
      <ConfirmationModal
        show={showRemoveModal}
        onCancel={() => setShowRemoveModal(false)}
        onConfirmRemove={handleRemove}
        message="remove task"
      />
    </div>
  );
}

export default TaskCard;
