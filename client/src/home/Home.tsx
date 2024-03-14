import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

interface HomeProps {
  userid: string;
  socket: Socket;
}

interface Room {
  room_name: string;
  size: number;
}

interface RoomCardProps {
  room: Room,
  socket: Socket,
  userid: string
}


function Home({ userid, socket }: HomeProps) {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate()

  const handleJoinRoom = () => {
    // Handle joining room logic
  };

  const handleCreateRoom = () => {

    if (roomName.length < 3) {
      setNameError('Room name must be at least 3 characters long.');
      return;
    }

    fetch("http://localhost:3001/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_name: roomName, userid: userid }),
    })
      .then((response) => {
        if (!response.ok) {
          setNameError("Room already exists");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login
        socket.emit("req_rooms");
        navigate(`/room/${roomName}`)
        console.log(data);
      })
      .catch((error) => {
        // Handle login error
        setError(error.message);
      });
  };

  useEffect(() => {
    socket.emit("req_rooms");
    socket.on("res_rooms", () => {
      fetch(`http://localhost:3001/api/occupant/${userid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Rooms");
          }
          return response.json();
        })
        .then((data) => {
          // Handle successful login
          setRooms(data);
          console.log(data);
        })
        .catch((error) => {
          // Handle login error
          setError(error.message);
        });
    });
  }, [socket]);

  return (
    <Fragment>
      <div className="container mt-5">
        <h1>{`Welcome back ${userid}`}</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="roomName" className="form-label">
              Room Name<span className="text-danger">*</span>
            </label>
            
            <input
              type="text"
              className="form-control"
              id="roomName"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              required 
            />
          </div>
          {nameError && <div className="alert alert-danger">{nameError}</div>}
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </form>
        <div className="mt-4">
          <h2>Your Rooms</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {rooms.map((room, index) => (
              <div key={index} className="col">
                <RoomCard room={room} socket={socket} userid={userid}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}


function RoomCard({ room, socket, userid }: RoomCardProps) {
  const [showModal, setShowModal] = useState(false);

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
        socket.emit("req_rooms");
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
    socket.emit("req_rooms");
    setShowModal(false);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{room.room_name}</h5>
        <button type="button" className="btn btn-danger" onClick={leaveRoom}>
          Leave Room
        </button>
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



export default Home;
