import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface HomeProps {
  join: (params: { username: string; room_id: string }) => void;
}

function Home({ join }: HomeProps) {
  const [username, setUsername] = useState("");
  const [room_id, setRoom_id] = useState("");

  const handleJoin = () => {
    // Call the join function with the appropriate parameters
    join({
      username: username,
      room_id: room_id,
    });
  };

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
      <Link to={`/room/${room_id}`}>
        <a>
            <button onClick={handleJoin}>Join</button>
        </a>
      </Link>
    </Fragment>
  );
}

export default Home;
