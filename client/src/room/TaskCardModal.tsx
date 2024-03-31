import React, { useState } from "react";

interface TaskModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (taskName: string, description: string) => void;
  task: any
}

const TaskModal: React.FC<TaskModalProps> = ({ show, onClose, onSubmit, task }) => {
  const [taskName, setTaskName] = useState(task.task_name);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!taskName) {
      setError("Task name is required.");
      return;
    }
    onSubmit(taskName, description);
    setError("");
    onClose();
  };

  return (
    
    <div className={`${show ? " show" : ""} text-light p-3 m-2 bg-body rounded-3 border border-secondary`} style={{ display: show ? "block" : "none"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="taskName" className="form-label">Task Name</label>
              <input type="text" className="form-control" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary mr-3" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
