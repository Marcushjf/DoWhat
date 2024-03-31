import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ConfirmationModal } from "../modals/Confirmation";

interface RoomCardProps {
    room: Room,
    socket: Socket,
    userid: string
    join: (room:string) => void
  }

interface Room {
    room_name: string;
    size: number;
}
  

function RoomCard({ room, socket, userid, join }: RoomCardProps) {
    const navigate = useNavigate()
  
    function confirmLeave() {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/occupant/leave`, {
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
    }

    function handleEnterRoom() {
      join(room.room_name)
      navigate(`/room/${room.room_name}`)
    }
  
    return (
      <Fragment>
        <div className="card" id="hoverCard">
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col">{`Room: ${room.room_name}`}</h5>
            <h5 className="card-title col">{`Users: ${room.size}`}</h5>
          </div>
          <div className="d-flex">
            <button type="button" className="btn btn-success me-2" onClick={handleEnterRoom}>
              Enter
            </button>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#leave${room.room_name}`}>
              Leave Room
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <ConfirmationModal onConfirmRemove={confirmLeave} id={`leave${room.room_name}`} message="leave room"/>
    {/* End Modal */}
      </Fragment>
      
    );
  }

export default RoomCard