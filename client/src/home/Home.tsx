import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { Socket, io } from "socket.io-client";

interface HomeProps {
  join: (params: { username: string; room_id: string }) => void;
  socket : Socket
}

function Home({ join, socket }: HomeProps) {
  const [username, setUsername] = useState("");
  const [room_id, setRoom_id] = useState("");
  const navigate = useNavigate()

  const handleJoin = () => {
    // Call the join function with the appropriate parameters
    join({
      username: username,
      room_id: room_id
    })
    socket.emit('join', { username: username, room_id: room_id });
  };

  useEffect(()=>{
    socket.on('join_status',(data)=>{
      if(data){
        navigate(`/room/${data}`)
      }
    })
  },[socket])

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room"
        onChange={(e) => setRoom_id(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </Fragment>
  );
}

export default Home;
