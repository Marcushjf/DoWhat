import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Segment from "./Segment";
import DragDropContextWrapper from "../drag&drop/DragDropContextWrapper";

interface TODOProps {
  segments: any[];
  socket: Socket;
  room?: string;
}

const TODO = ({ segments, socket, room }: TODOProps) => {
  const [newSegmentName, setNewSegmentName] = useState("");
  const [newSegmentDeadline, setNewSegmentDeadline] = useState("");
  const [error, setError] = useState("");
  const copy = [...segments]
  const [wat, setSegments] = useState(copy)

  useEffect(()=>{
    setSegments(copy)
  },[copy])

  // Function to handle submission of the new segment
  const handleAddSegment = () => {
    //check if name field is empty
    if (!newSegmentName) {
      setError("Segment must have a name");
      return;
    }

    if(newSegmentName.length > 15) {
      setError("Segment name too long")
      return
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/segment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        segment_name: newSegmentName,
        room_name: room,
        deadline: newSegmentDeadline,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding segment.");
        }
        return response.json();
      })
      .then((data) => {
        socket.emit("add_segment", { room_name: room });
        //close modal
        const closeButton = document.querySelector(
          `#${`addSeg${room}`} .btn-close`
        ) as HTMLButtonElement;
        if (closeButton) {
          closeButton.click();
        }
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      });
    setNewSegmentName(""); // Reset the segment name input
    setNewSegmentDeadline(""); // Reset the deadline input
    setError(``); // Reset error message
  };

  // Function to handle canceling adding a new segment
  const handleCancel = () => {
    setNewSegmentName(""); // Reset the segment name input
    setNewSegmentDeadline(""); // Reset the deadline input
    setError(``); // Reset error message
  };

  const handleDragEnd = (results: any) => {
    const { source, destination, type } = results;
    //if no destination
    if (!destination) {
      console.log("Huh Where you dropping this?");
      return;
    }
    //if same position
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      console.log("Same position");
      return;
    }

    if (type === "group") {
      // Find the source and destination segments
      const sourceSegment = segments.find(
        (segment) => segment._id === source.droppableId
      );
      const destinationSegment = segments.find(
        (segment) => segment._id === destination.droppableId
      );
    
      if (sourceSegment._id === destinationSegment._id) {
        const taskList = [...sourceSegment.tasks];
        const [removedTask] = taskList.splice(source.index, 1);
        taskList.splice(destination.index, 0, removedTask);
    
        // Update the client-side state
        const updatedSegments = segments.map((segment) => {
          if (segment._id === sourceSegment._id) {
            return {
              ...segment,
              tasks: taskList,
            };
          }
          return segment;
        });
        setSegments(updatedSegments);
    
        // Update order on the server
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/segment/order/${
            sourceSegment._id
          }`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasks: taskList }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error updating order.");
            }
            return response.json();
          })
          .then((data) => {
            socket.emit("add_segment", { room_name: room });
          })
          .catch((error) => {
            console.error("Error updating order:", error);
            // Revert the client-side state if the server update fails
            const revertedSegments = segments.map((segment) => {
              if (segment._id === sourceSegment._id) {
                return {
                  ...segment,
                  tasks: sourceSegment.tasks,
                };
              }
              return segment;
            });
            setSegments(revertedSegments);
          });
      } else {
        console.log(destinationSegment.segment_name);
        console.log("diff segment");
      }
    }
    
    //console.log(source, destination)
  };

  return (
    <>
      <DragDropContextWrapper onDragEnd={handleDragEnd}>
        <div
          className="container border rounded-3 h-100 pt-3 ps-0 pe-0"
          style={{ backgroundColor: "rgba(80, 80, 80, 0.2)" }}
        >
          <div className="row flex-nowrap overflow-auto w-100 h-100 m-0">
            {wat.map((segment, index) => (
              <div key={index} className="" style={{ width: "380px" }}>
                <Segment socket={socket} segment={segment} />
              </div>
            ))}
            <div style={{ width: "365px" }}>
              <button
                className="btn btn-secondary ps-2 pe-2 w-100"
                data-bs-toggle="modal"
                data-bs-target={`#addSeg${room}`}
              >
                <i className="bi bi-plus-lg"></i>Add a Goal/Objective
              </button>
            </div>
          </div>
        </div>

        {/* Modal for adding a new segment */}
        <div
          className="modal fade"
          id={`addSeg${room}`}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Segment</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="segmentName" className="form-label">
                    Segment Name
                  </label>
                  <input
                    type="text"
                    id="segmentName"
                    className="form-control"
                    value={newSegmentName}
                    onChange={(e) => setNewSegmentName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="segmentDeadline"
                    className="form-label"
                  >{`Deadline (Optional)`}</label>
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
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </DragDropContextWrapper>
    </>
  );
};

export default TODO;
