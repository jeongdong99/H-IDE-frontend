import React from "react";
import sendIcon from "../assets/Group 136.svg";

function ChatInputField({ message, setMessage, sendMessage }) {
  return (
    <div>
      <form onSubmit={sendMessage} className="flex pt-1">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-3/4 px-4 py-1  ml-4    border rounded-[10px] shadow"
          style={{ backgroundColor: "F5FBF4" }}
          placeholder="보낼 메세지를 입력하세요"
        />

        <button
          type="submit"
          className=" mr-2 ml-3 p-1 pr-2 pl-2  rounded text-white hover:text-black hover:bg-gray-300  "
          style={{ backgroundColor: "#457D61" }}
        >
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatInputField;
