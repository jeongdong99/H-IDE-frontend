// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux"; // useSelector import 추가
// import basic_profile from "../../assets/basic_profile.svg";
// import {
//   setUser,
//   updateUserNickname,
//   updateUserEmail,
//   updateUserPassword,
// } from "../../store/userSlice";
// import axiosInstance, { getUserInfo } from "../../utils/axios";

// const MyPage = () => {
//   const user = useSelector((state) => state.user.userData);
//   const [activeTab, setActiveTab] = useState("userInfo");
//   const [notificationPeriod, setNotificationPeriod] = useState("30");
//   const [customPeriod, setCustomPeriod] = useState("");
//   const [userInfo, setUserInfo] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const userInfo = await getUserInfo();
//         setUserInfo(userInfo); // 상태 업데이트
//         dispatch(setUser(userInfo)); // Redux 스토어에 사용자 정보 업데이트
//         console.log("사용자 정보:", userInfo);
//       } catch (error) {
//         console.error("사용자 정보 가져오기 실패:", error.message);
//       }
//     };

//     fetchUserInfo();
//   }, [dispatch]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleNicknameChange = () => {
//     window.location.href = "/change-nick";
//   };

//   const handleEmailChange = () => {
//     window.location.href = "/change-email";
//   };

//   const handlePasswordChange = () => {
//     window.location.href = "/change-pw";
//   };

//   const handleNotificationChange = () => {
//     const period =
//       notificationPeriod === "custom" ? customPeriod : notificationPeriod;
//     if (period) {
//       // dispatch(updateNotificationPeriod(period)); // 알림 주기를 변경하는 액션을 디스패치하는 로직
//       console.log(`알림 주기 변경: ${period}분`);
//     }
//   };

//   const UserInfoContent = () => {
//     return (
//       <div className="w-full flex flex-col items-center justify-center  h-full">
//         <h2 className="text-2xl font-bold mb-4">회원 정보</h2>
//         <div className="w-5/6 space-y-10">
//           <div className="flex justify-between items-center">
//             <p>아이디: {user.userId}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p>이름: {user.userName}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p>닉네임: {user.nickname}</p>
//             <button
//               className="bg-[#457D61] text-white px-10 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200"
//               onClick={handleNicknameChange}
//             >
//               닉네임 변경
//             </button>
//           </div>
//           <div className="flex justify-between items-center">
//             <p>이메일: {user.email}</p>
//             <button
//               className="bg-[#457D61] text-white px-10 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200"
//               onClick={handleEmailChange}
//             >
//               이메일 변경
//             </button>
//           </div>
//           <div className="flex justify-between items-center">
//             <p>비밀번호: ***** </p>
//             <button
//               className="bg-[#457D61] text-white px-10 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200"
//               onClick={handlePasswordChange}
//             >
//               비밀번호 변경
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const StretchingRankingContent = () => {
//     return (
//       <div className="w-full flex flex-col items-center justify-center h-full ">
//         <h2 className="text-2xl font-bold mb-4">스트레칭 랭킹</h2>
//         <div className="w-5/6 space-y-10 ">
//           <div className="flex justify-between items-center">
//             <p className="text-red-500">현재 랭크: 10위</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p>스트레칭 인증 횟수: 80회</p>
//           </div>
//           <div className="flex flex-wrap items-center space-x-4 ">
//             <p>스트레칭 알림 주기:</p>
//             <div className="flex items-center space-x-4">
//               <label className="mr-2">
//                 <input
//                   type="radio"
//                   value="30"
//                   checked={notificationPeriod === "30"}
//                   onChange={(e) => setNotificationPeriod(e.target.value)}
//                 />{" "}
//                 30분
//               </label>
//               <label className="mr-2">
//                 <input
//                   type="radio"
//                   value="50"
//                   checked={notificationPeriod === "50"}
//                   onChange={(e) => setNotificationPeriod(e.target.value)}
//                 />{" "}
//                 50분
//               </label>
//               <label className="mr-2">
//                 <input
//                   type="radio"
//                   value="60"
//                   checked={notificationPeriod === "60"}
//                   onChange={(e) => setNotificationPeriod(e.target.value)}
//                 />{" "}
//                 60분
//               </label>
//               <label className="mr-2">
//                 <input
//                   type="radio"
//                   value="120"
//                   checked={notificationPeriod === "120"}
//                   onChange={(e) => setNotificationPeriod(e.target.value)}
//                 />{" "}
//                 120분
//               </label>
//             </div>
//             <div className="flex items-center ">
//               <div className="flex items-center mr-auto">
//                 <label className="mr-5">
//                   <input
//                     type="radio"
//                     value="custom"
//                     checked={notificationPeriod === "custom"}
//                     onChange={(e) => setNotificationPeriod(e.target.value)}
//                   />{" "}
//                   사용자 지정
//                 </label>

//                 {notificationPeriod === "custom" && (
//                   <input
//                     type="number"
//                     value={customPeriod}
//                     onChange={(e) => setCustomPeriod(e.target.value)}
//                     placeholder="분"
//                     className="border rounded-md px-2 py-1 w-20"
//                   />
//                 )}
//               </div>

//               <div className="ml-auto">
//                 <button
//                   className="bg-[#457D61] text-sm text-white px-4 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200 ml-1"
//                   onClick={handleNotificationChange}
//                 >
//                   알림 주기 변경 완료
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   MyPage.js;

//   return (
//     <div className="flex h-screen">
//       <aside className="w-64 h-full bg-[#89A898] text-white flex flex-col">
//         <div className="flex justify-center items-center mt-8">
//           <img
//             src={basic_profile}
//             alt="Profile"
//             className="w-24 h-24 rounded-full"
//           />
//         </div>
//         <div className="text-center text-3xl font-bold mt-4">{user.userId}</div>
//         <div className="flex-1 mt-8 bg-[#89A898] text-[#3F4541]">
//           <div
//             className={`px-4 py-2 text-1xl font-bold hover:bg-[#F5FBF4] cursor-pointer duration-200
//                              ${activeTab === "userInfo" ? "bg-[#F5FBF4]" : ""}`}
//             onClick={() => handleTabClick("userInfo")}
//           >
//             회원 정보 확인
//           </div>
//           <div
//             className={`px-4 py-2 text-1xl font-bold hover:bg-[#F5FBF4] cursor-pointer duration-200
//                             ${
//                               activeTab === "stretchingRanking"
//                                 ? "bg-[#F5FBF4]"
//                                 : ""
//                             }`}
//             onClick={() => handleTabClick("stretchingRanking")}
//           >
//             스트레칭 랭킹 확인
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 bg-[#F5FBF4] flex items-center justify-center">
//         {activeTab === "userInfo" ? (
//           <UserInfoContent />
//         ) : (
//           <StretchingRankingContent />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyPage;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import basic_profile from "../../assets/basic_profile.svg";
import {
  setUser,
  updateUserNickname,
  updateUserEmail,
  updateUserPassword,
} from "../../store/userSlice";
import axiosInstance, { getUserInfo } from "../../utils/axios";

const MyPage = () => {
  const user = useSelector((state) => state.user.userData);
  const [activeTab, setActiveTab] = useState("userInfo");
  const [notificationPeriod, setNotificationPeriod] = useState("30");
  const [customPeriod, setCustomPeriod] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo); // 상태 업데이트
        dispatch(setUser(userInfo)); // Redux 스토어에 사용자 정보 업데이트
        console.log("사용자 정보:", userInfo);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error.message);
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNicknameChange = () => {
    window.location.href = "/change-nick";
  };

  const handleEmailChange = () => {
    window.location.href = "/change-email";
  };

  const handlePasswordChange = () => {
    window.location.href = "/change-pw";
  };

  const handleNotificationChange = () => {
    const period =
      notificationPeriod === "custom" ? customPeriod : notificationPeriod;
    if (period) {
      console.log(`알림 주기 변경: ${period}분`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 로컬스토리지에서 토큰 삭제
    navigate("/login"); // 로그인 페이지로 리다이렉트
  };

  const UserInfoContent = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center  h-full">
        <h2 className="text-2xl font-bold mb-4">회원 정보</h2>
        <div className="w-5/6 space-y-10">
          <div className="flex justify-between items-center">
            <p>아이디: {user.userId}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>이름: {user.userName}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>닉네임: {user.nickname}</p>
            <button
              className="bg-[#457D61] text-white px-10 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200"
              onClick={handleNicknameChange}
            >
              닉네임 변경
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>이메일: {user.email}</p>
            <button
              className="bg-[#457D61] text-white px-10 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200"
              onClick={handleEmailChange}
            >
              이메일 변경
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>비밀번호: ***** </p>
            <button
              className="bg-[#457D61] text-white px-10 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200"
              onClick={handlePasswordChange}
            >
              비밀번호 변경
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 text-white px-10 py-1 font-md rounded-md hover:bg-red-700 duration-200"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StretchingRankingContent = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center h-full ">
        <h2 className="text-2xl font-bold mb-4">스트레칭 랭킹</h2>
        <div className="w-5/6 space-y-10 ">
          <div className="flex justify-between items-center">
            <p className="text-red-500">현재 랭크: 10위</p>
          </div>
          <div className="flex justify-between items-center">
            <p>스트레칭 인증 횟수: 80회</p>
          </div>
          <div className="flex flex-wrap items-center space-x-4 ">
            <p>스트레칭 알림 주기:</p>
            <div className="flex items-center space-x-4">
              <label className="mr-2">
                <input
                  type="radio"
                  value="30"
                  checked={notificationPeriod === "30"}
                  onChange={(e) => setNotificationPeriod(e.target.value)}
                />{" "}
                30분
              </label>
              <label className="mr-2">
                <input
                  type="radio"
                  value="50"
                  checked={notificationPeriod === "50"}
                  onChange={(e) => setNotificationPeriod(e.target.value)}
                />{" "}
                50분
              </label>
              <label className="mr-2">
                <input
                  type="radio"
                  value="60"
                  checked={notificationPeriod === "60"}
                  onChange={(e) => setNotificationPeriod(e.target.value)}
                />{" "}
                60분
              </label>
              <label className="mr-2">
                <input
                  type="radio"
                  value="120"
                  checked={notificationPeriod === "120"}
                  onChange={(e) => setNotificationPeriod(e.target.value)}
                />{" "}
                120분
              </label>
            </div>
            <div className="flex items-center ">
              <div className="flex items-center mr-auto">
                <label className="mr-5">
                  <input
                    type="radio"
                    value="custom"
                    checked={notificationPeriod === "custom"}
                    onChange={(e) => setNotificationPeriod(e.target.value)}
                  />{" "}
                  사용자 지정
                </label>

                {notificationPeriod === "custom" && (
                  <input
                    type="number"
                    value={customPeriod}
                    onChange={(e) => setCustomPeriod(e.target.value)}
                    placeholder="분"
                    className="border rounded-md px-2 py-1 w-20"
                  />
                )}
              </div>

              <div className="ml-auto">
                <button
                  className="bg-[#457D61] text-sm text-white px-4 py-1 font-md rounded-md hover:bg-[#2E5341] duration-200 ml-1"
                  onClick={handleNotificationChange}
                >
                  알림 주기 변경 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  MyPage.js;

  return (
    <div className="flex h-screen">
      <aside className="w-64 h-full bg-[#89A898] text-white flex flex-col">
        <div className="flex justify-center items-center mt-8">
          <img
            src={basic_profile}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="text-center text-3xl font-bold mt-4">{user.userId}</div>
        <div className="flex-1 mt-8 bg-[#89A898] text-[#3F4541]">
          <div
            className={`px-4 py-2 text-1xl font-bold hover:bg-[#F5FBF4] cursor-pointer duration-200
                             ${activeTab === "userInfo" ? "bg-[#F5FBF4]" : ""}`}
            onClick={() => handleTabClick("userInfo")}
          >
            회원 정보 확인
          </div>
          <div
            className={`px-4 py-2 text-1xl font-bold hover:bg-[#F5FBF4] cursor-pointer duration-200 
                            ${
                              activeTab === "stretchingRanking"
                                ? "bg-[#F5FBF4]"
                                : ""
                            }`}
            onClick={() => handleTabClick("stretchingRanking")}
          >
            스트레칭 랭킹 확인
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-[#F5FBF4] flex items-center justify-center">
        {activeTab === "userInfo" ? (
          <UserInfoContent />
        ) : (
          <StretchingRankingContent />
        )}
      </main>
    </div>
  );
};

export default MyPage;
