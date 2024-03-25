import { Fragment } from "react/jsx-runtime";

interface ChatDisplayProps {
  messages: any[];
  user: string;
}

function ChatDisplay({ messages, user }: ChatDisplayProps) {
  function renderMessages() {
    return messages.slice().reverse().map((item, i) => { // Reverse the array of messages
      const createdAt = new Date(item.createdAt);
      const text_col = item.username === user ? "primary" : "light";
      return (
        <div
          key={i}
          className={`row ps-1 pe-1 m-0 justify-content-between text-start text-${text_col}`}
          style={{ width: "100%" }}
        >
          <p className="col-5">{`${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}\u00a0\u00a0${item.username.slice(0, 6)} : `}</p>
          <p
            className="col-7"
            style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
          >
            {item.message}
          </p>
        </div>
      );
    });
  }

  return (
    <Fragment>
      <div
        className="container text-center border border-secondary h-100 w-100 pt-3 pb-3 ps-0 pe-0 m-0"
        style={{ overflowY: "auto", display: "flex", flexDirection: "column-reverse" }} // Set display to flex and reverse flex direction
      >
        {renderMessages()}
      </div>
    </Fragment>
  );
}

export default ChatDisplay;
