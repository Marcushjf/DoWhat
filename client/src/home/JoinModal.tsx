import React, { useState } from "react";

interface JoinRoomModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (roomName: string, password: string) => void;
}

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!roomName || !password) {
      setError("All fields are required.");
      return;
    }

    onSubmit(roomName, password);
    setRoomName("");
    setPassword("");
    setError("");
  };

  return (
    <div className={`modal fade${show ? " show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Join Room</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomModal;
