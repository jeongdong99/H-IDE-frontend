import React, { useState } from "react";
import { Link } from "react-router-dom";
import sungbae_logo from "../../assets/sungbae_logo.svg";

import NavItem from "./Sections/NavItem";

const Navbar = () => {
  const userID = "testID";
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header
      className="bg-customGreen text-white p-4 flex items-center border-b border-gray-300"
      style={{ backgroundColor: "#FAFFF9" }}
    >
      {/* 로고 버튼 */}
      <div className="logo w-16">
        <div>
          <Link to="/">
            <img src={sungbae_logo} alt="logo" className="w-full h-auto" />
          </Link>
        </div>
      </div>

      {/* 메뉴 버튼 */}
      <div>
        <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
      </div>

      {/* big screen nav-items */}
      <div className="hidden sm:block ml-auto">
        <NavItem userID={userID} />
      </div>

      {/* mobile nav-item */}
      <div className={`block sm:hidden ${menu ? "block" : "hidden"} ml-auto`}>
        <NavItem userID={userID} />
      </div>
    </header>
  );
};

export default Navbar;
