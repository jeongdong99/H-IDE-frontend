import React, { useState, useRef } from "react";
import searchIcon from "../assets/search.svg";
import deleteIcon from "../assets/Vector 25.svg";

function ChatContainer({ UserName, messageList, toggleChat }) {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

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

  // 검색 실행 함수
  const performSearch = () => {
    // 검색어가 변경될 때 실행될 로직
    if (scrollRef.current && searchTerm) {
      // messageList에서 검색어와 일치하는 첫 번째 메시지의 인덱스를 찾기
      const index = messageList.findIndex((message) =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // 인덱스가 유효하면 해당 메시지로 스크롤
      if (index !== -1) {
        const messageElement = scrollRef.current.children[index];
        messageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
          messageList.map((message, index) =>
            UserName === message.user.userId ? (
              <div key={index} className="flex justify-end">
                <div
                  className="mr-1 mt-4 text-right"
                  style={{ color: "#3F4541", fontSize: "10px" }}
                >
                  {formatTime(message.timestamp)}
                </div>
                <div
                  className="mb-5 p-1 rounded shadow break-words max-w-1/2"
                  style={{ width: "max-content", backgroundColor: "#F5FBF4" }}
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
                      backgroundColor: "#F5FBF4",
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
            )
          )
        )}
      </div>
    </div>
  );
}

export default React.memo(ChatContainer);
