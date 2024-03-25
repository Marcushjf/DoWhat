import { useState } from "react";

interface ChatBoxProps {
  onSend : (message : string) => void
}

function ChatBox(prop : ChatBoxProps) {

  const [message, setMessage] = useState("");

  function handleSend(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    prop.onSend(message);
    setMessage("");
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (message.trim() !== "") {
        prop.onSend(message);
        setMessage("");
      }
    }
  }

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Message
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Enter message ..."
        aria-label="Enter message ..."
        aria-describedby="basic-addon1"
        id="message_input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button style={{width:'20%'}} onClick={(event) => handleSend(event)} disabled={message.trim() === ""}>Send</button>
    </div>
  );
};

export default ChatBox;
