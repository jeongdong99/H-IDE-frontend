// import { Outlet, Route, Routes, useLocation, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./App.css";
// import LandingPage from "./pages/LandingPage/index";
// import LoginPage from "./pages/LoginPage/index";
// import RegisterPage from "./pages/RegisterPage/index";
// import Navbar from "./layout/NavBar/index";
// import Footer from "./layout/Footer/index";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import FindId from "./pages/FindId/index";
// import FindPw from "./pages/FindPw/index";
// import ChangeNick from "./pages/ChangeNick/index";
// import ChangeEmail from "./pages/ChangeEmail/index";
// import MainPage from "./pages/MainPage/index";
// import MyPage from "./pages/MyPage/index";
// import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute 컴포넌트 가져오기

// function Layout({ toggleChat }) {
//   return (
//     <div className="flex flex-col h-screen justify-between">
//       <ToastContainer
//         position="bottom-right"
//         theme="light"
//         pauseOnHover
//         autoClose={1500}
//       />
//       <Navbar toggleChat={toggleChat} />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   const [isChatOpen, setIsChatOpen] = useState(false); // 채팅창 상태 관리
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 관리
//   const [initialPath, setInitialPath] = useState(null); // 초기 경로 설정

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const showChat = queryParams.get("showChat") === "true";

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//       setInitialPath("/mainPage");
//     } else {
//       setInitialPath("/login");
//     }
//   }, []);

//   if (initialPath === null) {
//     return <div>Loading...</div>; // 초기 경로를 결정하는 동안 로딩 화면을 표시합니다.
//   }

//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to={initialPath} replace />} />
//       <Route path="/" element={<Layout toggleChat={toggleChat} />}>
//         {/* 로그인과 상관없이 갈 수 있는 경로 */}
//         <Route index element={<LoginPage />} />
//         <Route
//           path="/login"
//           element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
//         />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/findId" element={<FindId />} />
//         <Route path="/findPw" element={<FindPw />} />
//         <Route path="/change-nick" element={<ChangeNick />} />
//         <Route path="/change-email" element={<ChangeEmail />} />

//         {/* 로그인 상태에서만 접근 가능한 경로 */}
//         <Route
//           path="/mainPage"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <MainPage
//                 showChat={isChatOpen || showChat}
//                 toggleChat={toggleChat}
//                 isChatOpen={isChatOpen} // 채팅창 열림 상태 전달
//               />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/mypage"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <MyPage />
//             </PrivateRoute>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Outlet, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/index";
import LoginPage from "./pages/LoginPage/index";
import RegisterPage from "./pages/RegisterPage/index";
import Navbar from "./layout/NavBar/index";
import Footer from "./layout/Footer/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FindId from "./pages/FindId/index";
import FindPw from "./pages/FindPw/index";
import ChangeNick from "./pages/ChangeNick/index";
import ChangeEmail from "./pages/ChangeEmail/index";
import MainPage from "./pages/MainPage/index";
import MyPage from "./pages/MyPage/index";
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute 컴포넌트 가져오기

function Layout({ toggleChat }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Navbar toggleChat={toggleChat} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // 채팅창 상태 관리
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 관리
  const [initialPath, setInitialPath] = useState(null); // 초기 경로 설정

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showChat = queryParams.get("showChat") === "true";

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      setInitialPath("/mainPage");
    } else {
      setInitialPath("/login");
    }
  }, []);

  if (initialPath === null) {
    return <div>Loading...</div>; // 초기 경로를 결정하는 동안 로딩 화면을 표시합니다.
  }

  return (
    <Routes>
      <Route path="/" element={<Layout toggleChat={toggleChat} />}>
        <Route index element={<Navigate to={initialPath} replace />} />
        <Route path="/landing" element={<LandingPage />} />
        {/* 로그인과 상관없이 갈 수 있는 경로 */}
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/change-nick" element={<ChangeNick />} />
        <Route path="/change-email" element={<ChangeEmail />} />

        {/* 로그인 상태에서만 접근 가능한 경로 */}
        <Route
          path="/mainPage"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainPage
                showChat={isChatOpen || showChat}
                toggleChat={toggleChat}
                isChatOpen={isChatOpen} // 채팅창 열림 상태 전달
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Route>
      {/* 초기 경로로 리다이렉트 */}
      <Route path="*" element={<Navigate to={initialPath} replace />} />
    </Routes>
  );
}

export default App;
