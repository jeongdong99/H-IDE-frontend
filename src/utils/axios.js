//이곳에서 axios 인스턴스를 생성한다
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    // 로그인 응답에서 토큰 추출 및 localStorage에 저장
    if (response.config.url === "/login" && response.headers.authorization) {
      const accessToken = response.headers.authorization;
      const usersId = response.headers.usersid;
      const userId = response.headers.userid;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("usersId", usersId);
      localStorage.setItem("userId", userId);

      console.log("Access Token 저장됨:", accessToken);
      console.log("usersId 저장됨:", usersId);
      console.log("usersId 저장됨:", usersId);
    }

    return response;
  },
  (error) => {
    // 오류 처리
    console.error("Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// 로그인 API 호출
export const loginUser = async (axiosInstance, loginData) => {
  try {
    const response = await axiosInstance.post("/login", loginData);
    // return response.data; // 서버에서 받은 데이터 반환
    return response.data;
  } catch (error) {
    throw new Error(`로그인 요청 실패: ${error.message}`);
  }
};

// 사용자 정보 가져오기 API 호출
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/my-page/1");
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    throw new Error(`사용자 정보 가져오기 요청 실패: ${error.message}`);
  }
};

// 닉네임 업데이트 API 호출
export const updateNickname = async (nickname) => {
  try {
    const response = await axiosInstance.post("/my-page/nickname", nickname, {
      headers: {
        "Content-Type": "text/plain", // 텍스트 형식으로 요청
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`닉네임 변경 실패: ${error.message}`);
  }
};

// 이메일 업데이트 API 호출
export const updateEmail = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/my-page/email",
      {
        email: data.email,
        code: data.auth,
      },
      {
        headers: {
          "Content-Type": "application/json", // json 형식으로 요청
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`이메일 변경 실패: ${error.message}`);
  }
};

// 비밀번호 확인 API 호출
export const checkPassword = async (password) => {
  try {
    const response = await axiosInstance.post("/check-password", password, {
      headers: {
        "Content-Type": "text/plain", // 텍스트 형식으로 요청
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return "비밀번호 확인 중 오류가 발생했습니다.";
    }
  }
};

export default axiosInstance;
