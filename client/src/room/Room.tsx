import { Fragment } from "react/jsx-runtime";
import ChatBox from "./ChatBox";
import ChatDisplay from "./ChatDisplay";

function Room() {
  return (
    <Fragment>
      <div className="p-3" style={{height:'100vh'}}>
        <div className="h-50 mb-3">
          <ChatDisplay />
        </div>
        <div>
          <ChatBox />
        </div>
      </div>
    </Fragment>
  );
}

export default Room;
