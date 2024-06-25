import axios from "axios";

const axioss = axios.create({
  baseURL: "https://kb9332ceeaf93a.user-app.krampoline.com:8080", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 아이디 중복 확인 함수
export const checkUserid = async (userid) => {
  try {
    const response = await axioss.post("/check-userid", userid, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return "아이디 중복 확인 중 오류가 발생했습니다.";
    }
  }
};

// 닉네임 중복 확인 함수
export const checkNickname = async (nickname) => {
  try {
    const response = await axioss.post("/check-nickname", nickname, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return "닉네임 중복 확인 중 오류가 발생했습니다.";
    }
  }
};

// 이메일 코드 전송 API 호출
export const sendEmailCode = async (email) => {
  try {
    const response = await axioss.post("/email-authentication", email, {
      headers: {
        "Content-Type": "text/plain",
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("이메일 코드 전송 실패");
    }
  } catch (error) {
    throw new Error(`이메일 코드 전송 요청 실패: ${error.message}`);
  }
};

// 회원가입 API 호출
export const signUpUser = async (userData) => {
  try {
    const response = await axioss.post(`/sign-up`, {
      userid: userData.id,
      username: userData.name,
      nickname: userData.nickname,
      password: userData.password,
      checkPassword: userData.checkPassword,
      email: userData.email,
      code: userData.auth,
    });

    return response.data;
  } catch (error) {
    throw new Error(`회원가입 요청 실패: ${error.message}`);
  }
};

// 아이디 찾기 API 호출
export const findUserid = async (userData) => {
  try {
    const response = await axios.post(
      "/find-userid",
      {
        username: userData.name,
        email: userData.email,
        code: userData.auth,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    throw new Error(`아이디 찾기 요청 실패: ${error.message}`);
  }
};

// 비밀번호 찾기 API 호출
export const findPassword = async (userData) => {
  try {
    const response = await axios.post(
      "/find-password",
      {
        username: userData.name,
        userId: userData.id,
        email: userData.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    throw new Error(`비밀번호 찾기 요청 실패: ${error.message}`);
  }
};
