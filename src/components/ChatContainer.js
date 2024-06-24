import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // 화살표 아이콘 import
import searchIcon from "../assets/search.svg";
import deleteIcon from "../assets/Vector 25.svg";

function ChatContainer({ UserName, messageList, toggleChat }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedMessageIndices, setHighlightedMessageIndices] = useState(
    []
  );
  const [currentHighlightedIndex, setCurrentHighlightedIndex] = useState(-1);
  const scrollRef = useRef(null);
  const lastMessageSenderRef = useRef(null);
  const navigate = useNavigate();

  // main으로 이동 함수
  const handleClick = () => {
    navigate("/board");
  };

  // 검색어 입력 처리 함수
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Enter key를 눌렀을 때 검색 처리
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      performSearch();
    }
  };

  // 검색 실행 함수 (아래에서 위로 검색)
  const performSearch = () => {
    if (scrollRef.current && searchTerm) {
      const indices = [];
      for (let i = messageList.length - 1; i >= 0; i--) {
        if (
          messageList[i].content
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          indices.push(i);
        }
      }

      setHighlightedMessageIndices(indices);

      if (indices.length > 0) {
        setCurrentHighlightedIndex(0);
        scrollToMessage(0);
      }
    }
  };

  // 특정 메시지로 스크롤하는 함수
  const scrollToMessage = (index) => {
    if (scrollRef.current && highlightedMessageIndices.length > 0) {
      const messageElement =
        scrollRef.current.children[highlightedMessageIndices[index]];
      messageElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrev = () => {
    if (currentHighlightedIndex > 0) {
      const newIndex = currentHighlightedIndex - 1;
      setCurrentHighlightedIndex(newIndex);
      scrollToMessage(newIndex);
    }
  };

  const handleNext = () => {
    if (currentHighlightedIndex < highlightedMessageIndices.length - 1) {
      const newIndex = currentHighlightedIndex + 1;
      setCurrentHighlightedIndex(newIndex);
      scrollToMessage(newIndex);
    }
  };

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12; // 0 시간을 12로 바꿔주기

    return `${period} ${hours}:${minutes}`;
  }

  // Scroll to bottom when current user sends a new message
  useEffect(() => {
    if (messageList.length > 0) {
      const lastMessage = messageList[messageList.length - 1];
      if (lastMessage.user.userId === UserName) {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
      lastMessageSenderRef.current = lastMessage.user.userId;
    }
  }, [messageList, UserName]);

  return (
    <div>
      <form className="flex pt-4 relative">
        <span>
          <img
            src={searchIcon}
            alt="Search"
            className="absolute ml-6 mt-2.5 h-4 w-4"
          />
        </span>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} // Handle Enter key press
          className="w-full px-7 py-4 ml-4 border rounded-[10px] shadow"
          style={{ width: "350px", height: "32px", backgroundColor: "#F5FBF4" }}
          placeholder="찾고 싶은 메세지를 검색하세요."
        />

        <button
          type="button"
          onClick={toggleChat}
          className="absolute right-0 mr-4"
        >
          <img src={deleteIcon} alt="delete" className="h-4 w-4" />
        </button>
      </form>

      <div className="border-t w-full border-white mt-3"></div>

      <div
        className="h-[480px] w-full flex flex-col overflow-auto p-2"
        ref={scrollRef}
      >
        {messageList.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">메시지가 없습니다.</p>
          </div>
        ) : (
          messageList.map((message, index) => {
            const isCurrentUser = UserName === message.user.userId;
            const isHighlighted =
              index === highlightedMessageIndices[currentHighlightedIndex];
            const messageStyle = isHighlighted
              ? { backgroundColor: "#FFFF99" }
              : { backgroundColor: "#F5FBF4" };

            return isCurrentUser ? (
              <div key={index} className="flex justify-end">
                <div
                  className="mr-1 mt-4 text-right"
                  style={{ color: "#3F4541", fontSize: "10px" }}
                >
                  {formatTime(message.timestamp)}
                </div>
                <div
                  className="mb-5 p-1 rounded shadow break-words max-w-1/2"
                  style={{ width: "max-content", ...messageStyle }}
                >
                  {message.content}
                </div>
              </div>
            ) : (
              <div key={index}>
                <div className="text-sm" style={{ color: "#3F4541" }}>
                  {message.user.nickname}
                </div>
                <div className="flex">
                  <div
                    className="mb-5 ml-1 p-1 rounded shadow break-words max-w-1/2"
                    style={{
                      width: "max-content",
                      ...messageStyle,
                      alignSelf: "flex-start",
                    }}
                  >
                    {message.content}
                  </div>
                  <div
                    className="ml-1 mt-4"
                    style={{ color: "#3F4541", fontSize: "10px" }}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {highlightedMessageIndices.length > 0 && (
        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentHighlightedIndex === 0}
            className="px-4 py-2 border rounded bg-gray-300"
          >
            <FaArrowDown />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={
              currentHighlightedIndex === highlightedMessageIndices.length - 1
            }
            className="px-4 py-2 border rounded bg-gray-300"
          >
            <FaArrowUp />
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatContainer);
