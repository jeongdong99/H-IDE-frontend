import React from "react";
import chat from "../../../assets/chat.svg";
import basic_profile from "../../../assets/basic_profile.svg";

const NavItem = ({ userID }) => {
  return (
    <div className="flex justify-end space-x-4">
      {/* 채팅 */}
      <div className="chat">
        <img src={chat} alt="chat" className="w-8 h-8" />
      </div>

      {/* 프로필 사진 */}
      <div className="my-page flex items-center space-x-2">
        <img src={basic_profile} alt="basic_profile" className="w-8 h-8" />
        <span className="text-black">{userID}</span>
      </div>
    </div>
  );
};
{
  /*인선확인용 */
}

export default NavItem;
