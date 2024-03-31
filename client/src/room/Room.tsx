import { Fragment } from "react/jsx-runtime";
import ChatBox from "./ChatBox";
import ChatDisplay from "./ChatDisplay";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TODO from "./TODO";

interface RoomProps {
  socket: Socket;
  user: string;
}

function Room({ socket, user}: RoomProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [segments, setSegments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState([]);
  const [showColumn, setShowColumn] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const navigate = useNavigate();
  const { room_id } = useParams<{ room_id?: string }>();

  useEffect(() => {
    if (!user || !room_id) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    socket.emit("req_segments");
    socket.off("res_segments").on("res_segments", () => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/segment/${room_id}`)
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
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/get/${room_id}`)
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
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${room_id}`)
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
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/room/users/${room_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error loading Users");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          console.log(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  }, [socket, room_id]);

  // Function to toggle the visibility of the column
  const toggleColumn = () => {
    setShowColumn(!showColumn);
  };

  // Function to check if screen width is too small
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1256); // Change 768 to the desired breakpoint
  };

  // Add event listener to check screen size on mount and window resize
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  function handleSend (message: string) {

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString(); // Format as per your requirement

    setMessages((prevMessages) => [...prevMessages, { room_name: room_id, message: `${message}`, username: user, status:'loading' ,createdAt: formattedTime }]);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/${room_id}`, {
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
        socket.emit("add_chat", { room_name: room_id });
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      });
  }

  return (
    <Fragment>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            {`${room_id}'s Chat`}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Chat
            user={user}
            users={users}
            messages={messages}
            handleSend={handleSend}
            small={isSmallScreen}
          />
        </div>
      </div>

      <div className="row d-flex flex-row justify-content-center p-2">
        <h1 className="d-flex justify-content-center p-3">{`${room_id}`}</h1>
        <div className=" col-md-8  mr-5" style={{ height: "85vh" }}>
          <TODO segments={segments} socket={socket} tasks={tasks} room={room_id} />
        </div>
        {!isSmallScreen && (
          <Chat
            user={user}
            users={users}
            messages={messages}
            handleSend={handleSend}
            small={isSmallScreen}
          />
        )}
      </div>

      {isSmallScreen && (
        <button
          onClick={toggleColumn}
          className="btn btn-secondary rounded-pill position-fixed bottom-0 end-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          style={{ height: '80px', width: '120px', marginBottom: '50px', marginRight: '50px' }}
        >
          <i className="bi bi-chat-right-text-fill fs-1"></i>
        </button>
      )}
    </Fragment>
  );
}

interface ChatProp {
  user: string;
  messages: any[];
  users: any[];
  handleSend: (message: string) => void;
  small: boolean
}

function Chat({ user, users, messages, handleSend, small }: ChatProp) {
  return (
    <div
      className="p-0 d-flex flex-column align-items-center m-0"
      style={{ height: "85vh", width: "360px" }}
    >
      {/* Check for screen cutoff */}
      {!small && <div
        className="overflow-hidden text-start w-100 mb-5"
        style={{ height: "25%" }}
      >
        <ul
          className="list-group overflow-auto"
          style={{ border: "none", height: "100%" }}
        >
          <div className="card-header text-center">Users</div>
          {users.map((user, index) => (
            <li key={index} className="list-group-item">
              {user.name}
            </li>
          ))}
        </ul>
      </div>}

      <div className="hmb-3 w-100 mb-3" style={{ height: "65%" }}>
        <ChatDisplay messages={messages} user={user} />
      </div>
      <div className="w-100">
        <ChatBox onSend={handleSend} />
      </div>
    </div>
  );
}

export default Room;
