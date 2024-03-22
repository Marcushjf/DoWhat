import { Fragment } from "react/jsx-runtime";

interface ChatDisplayProps {
  messages: any[];
  user: string
}

function ChatDisplay({messages, user}: ChatDisplayProps) {

  function renderMessages() {
    return messages.map((item, i) => {
        const createdAt = new Date(item.createdAt);
        const text_col = (item.username === user)? 'primary' : 'dark'
      return (
        <div
          key={i}
          className={`row ps-1 pe-1 m-0 justify-content-between text-start text-${text_col}`}
          style={{ width: "100%" }}
        >
          <p className="col-5">{`${createdAt.getHours()}:${createdAt.getMinutes()}\u00a0\u00a0${item.username.slice(
            0,
            7
          )} : `}</p>
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
      <div className="container text-center border border-secondary h-100 w-100 pt-3 pb-3 ps-0 pe-0 m-0">
        {renderMessages()}
      </div>
    </Fragment>
  );
}

export default ChatDisplay;
