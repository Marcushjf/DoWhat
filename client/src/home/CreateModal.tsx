import React, { useState } from "react";

interface CreateRoomModalProps {
  onSubmit: (roomName: string, password: string) => void;
  id:string
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  onSubmit,
  id
}) => {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!roomName || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    onSubmit(roomName, password);
    const closeButton = document.querySelector(`#${id} .btn-close`) as HTMLButtonElement;
    if (closeButton) {
      closeButton.click();
    }
    setRoomName("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Room</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="roomName" className="form-label">
                Room Name
              </label>
              <input
                type="text"
                className="form-control"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Create
            </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
