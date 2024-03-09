const ChatBox = () => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Message
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <button style={{width:'20%'}}>Send</button>
    </div>
  );
};

export default ChatBox;
