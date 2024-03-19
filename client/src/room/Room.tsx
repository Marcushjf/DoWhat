import { Fragment } from "react/jsx-runtime";
import ChatBox from "./ChatBox";
import ChatDisplay from "./ChatDisplay";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import TODO from "./TODO";

interface RoomProps {
  socket: Socket;
  user: string;
  room: string;
}

function Room({ socket, user, room }: RoomProps) {
  const [messages, setMessages] = useState([])
  const [segments, setSegments] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [error, setError] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    socket.emit("req_segments");
    socket.off("res_segments").on("res_segments", () => {
      fetch(`http://localhost:3001/api/segment/${room}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Rooms");
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
      fetch(`http://localhost:3001/api/task/get/${room}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Rooms");
          }
          return response.json();
        })
        .then((data) => {
          setTasks(data);
          console.log(data)
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  },[socket])

  function handleSend(message: string) {
    
  }

  

  return (
    <Fragment>
      <div>{`${room}`}</div>
      <div className="row d-flex flex-row justify-content-center p-3">
        <div className="col-9" style={{height:'85vh'}}>
          <TODO segments={segments} socket={socket} tasks={tasks} room={room}/>
        </div>
        <div
          className="p-3 col-3 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="h-50 mb-3 w-100">
            <ChatDisplay messages={messages} user={user}/>
          </div>
          <div>
            <ChatBox onSend={handleSend} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Room;
