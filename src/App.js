import { Outlet, Route, Routes } from "react-router-dom";
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
import MainPage from "./pages/MainPage/index";
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute 컴포넌트 가져오기

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    // 중첩 라우팅
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 로그인과 상관없이 갈 수 있는 경로 */}
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />

        {/* 로그인 상태에서만 접근 가능한 경로 */}
        <Route
          path="/mainPage"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
