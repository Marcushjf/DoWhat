import { Fragment } from "react/jsx-runtime";
import ChatBox from "./ChatBox";
import ChatDisplay from "./ChatDisplay";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import Game from "./Game";

interface RoomProps {
  socket: Socket;
  user: string;
  room: string;
}

function Room({ socket, user, room }: RoomProps) {
  const [messages, setMessages] = useState<
    { message: string; room: string; user: string; time: string }[]
  >([]);

  function handleSend(message: string) {
    socket.emit("send_message", {
      message: message,
      room: room,
      user: user,
      time:
        new Date(Date.now()).getHours().toString().padStart(2, '0') +
        ":" +
        new Date(Date.now()).getMinutes().toString().padStart(2, '0'),
    });    
  }

  useEffect(() => {
    socket.on("alert", (alert_msg: string) => {
      console.log(alert_msg);
    });
  }, []);

  useEffect(() => {
    socket.off("chat_message").on("chat_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  return (
    <Fragment>
      <div className="row d-flex flex-row justify-content-center p-3">
        <div className="col-9">
          <Game />
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
