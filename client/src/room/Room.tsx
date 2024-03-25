import { Fragment } from "react/jsx-runtime";
import ChatBox from "./ChatBox";
import ChatDisplay from "./ChatDisplay";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TODO from "./TODO";

interface RoomProps {
  socket: Socket;
  user: string;
  room: string;
}

function Room({ socket, user, room }: RoomProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [segments, setSegments] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  useEffect(() => {
    socket.emit("req_segments");
    socket.off("res_segments").on("res_segments", () => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/segment/${room}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Segments");
          }
          return response.json();
        })
        .then((data) => {
          setSegments(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
    socket.off("res_tasks").on("res_tasks", () => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/get/${room}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Tasks");
          }
          return response.json();
        })
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
    socket.off("res_chats").on("res_chats", () => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${room}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Chats");
          }
          return response.json();
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
    socket.off("res_users").on("res_users", () => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/room/users/${room}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Users");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          console.log(data)
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }, [socket])

  function handleSend(message: string) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${room}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        username: user,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error sending chat.");
        }
        return response.json();
      })
      .then((data) => {
        socket.emit("add_chat", { room_name: room });
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      });
  }



  return (
    <Fragment>
      <div className="row d-flex flex-row justify-content-center p-3 m-0">
        <h1 className="d-flex justify-content-center">{`${room}`}</h1>
        <div className="" style={{ height: '85vh', width:'70vw' }}>
          <TODO segments={segments} socket={socket} tasks={tasks} room={room} />
        </div>
        <div
          className="p-0 col-3 d-flex flex-column align-items-center "
          style={{ height: "85vh" }}
        >
          <div className="overflow-hidden text-start w-100 mb-5" style={{ height: '25%' }}>
            <ul className="list-group overflow-auto" style={{ border: 'none', height: '100%' }}>
              <div className="card-header text-center">
                Users
              </div>
              {users.map((user, index) => (
                <li key={index} className="list-group-item">{user.name}</li>
              ))}
            </ul>
          </div>



          <div className="hmb-3 w-100 ms-0" style={{ height: '65%' }}>
            <ChatDisplay messages={messages} user={user} />
          </div>
          <div className="w-100">
            <ChatBox onSend={handleSend} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Room;
