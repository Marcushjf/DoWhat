import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

interface RoomCardProps {
    room: Room,
    socket: Socket,
    userid: string
  }

interface Room {
    room_name: string;
    size: number;
}
  

function RoomCard({ room, socket, userid }: RoomCardProps) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
  
    function leaveRoom() {
      setShowModal(true);
    }
  
    function confirmLeave() {
      fetch("http://localhost:3001/api/occupant/leave", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userid, room: room.room_name }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Handle successful login
          console.log(data)
          socket.emit("leave", {username:userid, room_name:room.room_name});
        })
        .catch((error) => {
          // Handle login error
          console.log(error);
        });
      setShowModal(false);
    }

    function handleEnterRoom() {
      navigate(`/room/${room.room_name}`)
    }
  
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col">{`Room: ${room.room_name}`}</h5>
            <h5 className="card-title col">{`Users: ${room.size}`}</h5>
          </div>
          <div className="d-flex">
            <button type="button" className="btn btn-success me-2" onClick={handleEnterRoom}>
              Enter
            </button>
            <button type="button" className="btn btn-danger" onClick={leaveRoom}>
              Leave Room
            </button>
          </div>
          {/* Modal */}
          <div className={`modal fade${showModal ? ' show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Leave Room</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to leave the room?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={confirmLeave}>Leave</button>
                </div>
              </div>
            </div>
          </div>
          {/* End Modal */}
        </div>
      </div>
    );
  }

export default RoomCard