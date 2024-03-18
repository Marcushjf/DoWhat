import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import RoomCard from "./RoomCard";
import Notification from "./Notification";
import CreateRoomModal from "./CreateModal";
import JoinRoomModal from "./JoinModal";

interface HomeProps {
  userid: string;
  socket: Socket;
}

interface Room {
  room_name: string;
  size: number;
}


function Home({ userid, socket }: HomeProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState("");
  const [notif, setNotif] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleJoinRoom = () => {
    // Handle joining room logic
    setShowJoinModal(true);
  };

  const handleCloseJoinModal = () => {
    setShowJoinModal(false);
  };

  const handleCreateRoom = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleJoinModal = (roomName: string, password: string) => {
    fetch("http://localhost:3001/api/room/join", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_name: roomName, password: password, userid: userid }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //room does not exist
        if(data.message === "Room does not exist."){
          setNotif(data.message);
          setShowNotif(true);
          return
        }
        //password incorrect
        if(data.message === "Password Incorrect."){
          setNotif(data.message);
          setShowNotif(true);
          return
        }
        setNotif("Successfully joined room");
        setShowNotif(true);
        socket.emit("join", {username:userid, room_name:roomName});
        console.log(data);
      })
      .catch((error) => {
        // Handle login error
        setNotif(error.message);
        setShowNotif(true);
        setError(error.message);
      });
    setShowJoinModal(false);
  }

  const handleSubmitModal = (roomName: string, password: string) => {
    // Handle creating room logic
    fetch("http://localhost:3001/api/room/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_name: roomName, password: password, userid: userid }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.message === "Room already exists."){
          setNotif(data.message);
          setShowNotif(true);
          return
        }
        setNotif("Successfully created room");
        setShowNotif(true);
        socket.emit("join", {username:userid, room_name:roomName});
        console.log(data);
      })
      .catch((error) => {
        // Handle login error
        setNotif(error.message);
        setShowNotif(true);
        setError(error.message);
      });
    setShowModal(false);
  };


  useEffect(() => {
    socket.emit("req_rooms");
    socket.off("res_rooms").on("res_rooms", () => {
      fetch(`http://localhost:3001/api/occupant/${userid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Rooms");
          }
          return response.json();
        })
        .then((data) => {
          setRooms(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
    socket.off("init").on("init", () => {
      fetch(`http://localhost:3001/api/occupant/${userid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Rooms");
          }
          return response.json();
        })
        .then((data) => {
          setRooms(data);
          const roomNames = data.map((item:Room) => item.room_name);
          socket.emit('socket_connect',roomNames)
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }, [socket]);
  
  return (
    <Fragment>
      <div className="container mt-5">
        <h1>{`Welcome back ${userid}`}</h1>
        <form>
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
      <CreateRoomModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
      <JoinRoomModal
        show={showJoinModal}
        onClose={handleCloseJoinModal}
        onSubmit={handleJoinModal}
      />
      {showNotif && <Notification message={notif} onClose={() => setShowNotif(false)} />}
    </Fragment>
  );
}


export default Home;
