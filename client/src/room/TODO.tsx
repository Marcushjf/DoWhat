import { useState } from "react";
import { Socket } from "socket.io-client";
import Segment from "./Segment";

interface TODOProps {
  segments: any[];
  tasks: any[];
  socket: Socket;
  room: string
}

const TODO = ({ segments, tasks, socket, room }: TODOProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newSegmentName, setNewSegmentName] = useState("");
  const [newSegmentDeadline, setNewSegmentDeadline] = useState("");
  const [error, setError] = useState("")

  // Function to add a new segment
  const addSegment = () => {
    setShowModal(true);
  };

  // Function to handle submission of the new segment
  const handleAddSegment = () => {

    //check if name field is empty
    if(!newSegmentName){
      setError('Segment must have a name')
      return
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/segment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ segment_name:newSegmentName, room_name:room, deadline:newSegmentDeadline})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding segment.');
            }
            return response.json();
        })
        .then(data => {
            socket.emit('add_segment',({room_name:room}))
        })
        .catch(error => {
            // Handle error
            setError(error.message);
        });
    setShowModal(false);
    setNewSegmentName(""); // Reset the segment name input
    setNewSegmentDeadline(""); // Reset the deadline input
    setError(``) // Reset error message
  };

  // Function to handle canceling adding a new segment
  const handleCancel = () => {
    setShowModal(false);
    setNewSegmentName(""); // Reset the segment name input
    setNewSegmentDeadline(""); // Reset the deadline input
    setError(``) // Reset error message
  };

  return (
    <div className="container border rounded-3 h-100 pt-3 ps-0 pe-0">
      <div className="row flex-nowrap overflow-auto w-100 h-100 m-0">
        {segments.map((segment, index) => (
          <div key={index} className="" style={{ width: "380px" }}>
            <Segment
              socket={socket}
              segment={segment}
              tasks={tasks.filter((task) => task.segment_id === segment._id)} // Filter tasks for current segment
            />
          </div>
        ))}
        <div style={{ width: "365px" }}>
          <button
            className="btn btn-secondary ps-2 pe-2 w-100"
            onClick={addSegment}
          >
            <i className="bi bi-plus-lg"></i>Add a Goal/Objective
          </button>
        </div>
      </div>

      {/* Modal for adding a new segment */}
      {showModal && (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Segment</h5>
                <button type="button" className="close" onClick={handleCancel}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="segmentName" className="form-label">Segment Name</label>
                  <input
                    type="text"
                    id="segmentName"
                    className="form-control"
                    value={newSegmentName}
                    onChange={(e) => setNewSegmentName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="segmentDeadline" className="form-label">{`Deadline (Optional)`}</label>
                  <input
                    type="date"
                    id="segmentDeadline"
                    className="form-control"
                    value={newSegmentDeadline}
                    onChange={(e) => setNewSegmentDeadline(e.target.value)}
                  />
                </div>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddSegment}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TODO;
