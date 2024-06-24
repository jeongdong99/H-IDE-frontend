// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import sungbae_logo from "../../assets/sungbae_logo.svg";
// import NavItem from "./Sections/NavItem";
// import { useSelector } from "react-redux";

// const Navbar = ({ toggleChat }) => {
//   const user = useSelector((state) => state.user.userData);
//   const [menu, setMenu] = useState(false);
//   const navigate = useNavigate(); // useNavigate 훅 사용

//   const handleMenu = () => {
//     setMenu(!menu);
//   };

//   const handleLogoClick = () => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       navigate("/mainPage");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <header
//       className="bg-customGreen text-white p-4 flex items-center border-b border-gray-300"
//       style={{ backgroundColor: "#FAFFF9" }}
//     >
//       {/* 로고 버튼 */}
//       <div className="logo w-16">
//         <div>
//           <img
//             src={sungbae_logo}
//             alt="logo"
//             className="w-full h-auto cursor-pointer"
//             onClick={handleLogoClick}
//           />
//         </div>
//       </div>

//       {/* 메뉴 버튼 */}
//       <div>
//         <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
//       </div>

//       {/* big screen nav-items */}
//       <div className="hidden sm:block ml-auto">
//         <NavItem userID={user.userId} toggleChat={toggleChat} />
//       </div>

//       {/* mobile nav-item */}
//       <div className={`block sm:hidden ${menu ? "block" : "hidden"} ml-auto`}>
//         <NavItem userID={user.userId} toggleChat={toggleChat} />
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import sungbae_logo from "../../assets/sungbae_logo.svg";
import NavItem from "./Sections/NavItem";
import axiosInstance, { getUserInfo } from "../../utils/axios"; // API 호출 함수 import

const Navbar = ({ toggleChat }) => {
  const [menu, setMenu] = useState(false);
  const [userId, setUserId] = useState("H-IDE"); // 기본값 설정
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const userInfo = await getUserInfo();
          setUserId(userInfo.userId); // API 응답에서 userId 설정
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error.message);
      }
    };

    fetchUserId();
  }, []);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleLogoClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/mainPage");
    } else {
      navigate("/login");
    }
  };

  return (
    <header
      className="bg-customGreen text-white p-4 flex items-center border-b border-gray-300"
      style={{ backgroundColor: "#FAFFF9" }}
    >
      {/* 로고 버튼 */}
      <div className="logo w-16">
        <div>
          <img
            src={sungbae_logo}
            alt="logo"
            className="w-full h-auto cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
      </div>

      {/* 메뉴 버튼 */}
      <div>
        <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
      </div>

      {/* big screen nav-items */}
      <div className="hidden sm:block ml-auto">
        <NavItem userID={userId} toggleChat={toggleChat} />
      </div>

      {/* mobile nav-item */}
      <div className={`block sm:hidden ${menu ? "block" : "hidden"} ml-auto`}>
        <NavItem userID={userId} toggleChat={toggleChat} />
      </div>
    </header>
  );
};

export default Navbar;
