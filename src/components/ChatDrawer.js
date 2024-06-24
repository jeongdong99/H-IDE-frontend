import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatInputField from "./ChatInputField";
import ChatContainer from "./ChatContainer";

const host = "http://localhost:8080";

const connectWebSocket = (
  token,
  setMessageList,
  setStompClient,
  setUserName
) => {
  const headers = {
    Authorization: token,
  };

  const socket = new SockJS(host + "/ws", null, { headers });
  const client = new Client({
    webSocketFactory: () => socket,
    debug: (str) => {
      console.log("[STOMP] " + str);
    },
    reconnectDelay: 5000, // 5초 후 재연결 시도
    heartbeatIncoming: 4000, // 서버에서 클라이언트로 4초마다 하트비트
    heartbeatOutgoing: 4000, // 클라이언트에서 서버로 4초마다 하트비트
    connectHeaders: {
      Authorization: token,
    },
    onConnect: (frame) => {
      console.log("[STOMP] Connected: " + frame);
      var headers = frame.headers;
      if (headers && headers["user-name"]) {
        const userName = headers["user-name"];
        setUserName(userName);
      }

      client.subscribe("/sub/chat", (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
        console.log("Received message from server:", message);
        setMessageList((prevMessages) => [
          ...prevMessages,
          {
            content: message.content,
            user: message.user,
            timestamp: message.timestamp,
          },
        ]);
      });
      setStompClient(client);
    },
    onStompError: (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
  });

  client.activate();

  return () => {
    if (client) {
      client.deactivate();
      console.log("Disconnected from WebSocket");
    }
  };
};

const ChatDrawer = ({ toggleChat }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [token, setToken] = useState("");
  const [UserName, setUserName] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      console.error("Message is empty. Not sending.");
      return;
    }
    if (stompClient && message.trim() !== "" && stompClient.connected) {
      console.log("Sending message:", message);
      stompClient.publish({
        destination: "/pub/chat.sendMessage",
        body: JSON.stringify({ content: message }),
      });
      setMessage(""); // 메시지 전송 후 입력 필드 초기화
    } else {
      console.error("StompClient is not connected or is null.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setToken(token);
      const disconnect = connectWebSocket(
        token,
        setMessageList,
        setStompClient,
        setUserName
      );
      return () => {
        disconnect();
      };
    } else {
      console.error("Token not found in sessionStorage.");
    }
  }, []);

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{ backgroundColor: "#CED9CC" }}
    >
      <ChatContainer
        UserName={UserName}
        messageList={messageList}
        toggleChat={toggleChat}
      />
      <ChatInputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatDrawer;
