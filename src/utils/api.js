import axiosInstance from "./axios";

// 아이디 중복 확인 함수
export const checkUserid = async (userid) => {
  try {
    const response = await axiosInstance.post("/check-userid", userid, {
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
    const response = await axiosInstance.post("/check-nickname", nickname, {
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
    const response = await axiosInstance.post("/email-authentication", email, {
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
    const response = await axiosInstance.post(`/sign-up`, {
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

// 파일 관련 API
export const getUserById = async (usersId) => {
  try {
    const response = await axiosInstance.get(`/users/${usersId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

export const createFile = async (usersId, fileName, fileType) => {
  try {
    const response = await axiosInstance.post(
      `/projects/${usersId}/files`,
      null,
      {
        params: {
          file_name: fileName,
          file_type: fileType,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
};

export const getFileByIdAndProjectId = async (usersId, fileId) => {
  try {
    const response = await axiosInstance.get(
      `/projects/${usersId}/files/${fileId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting file by ID and project ID:", error);
    throw error;
  }
};

export const getFilesByProjectId = async (usersId) => {
  try {
    const response = await axiosInstance.get(`/projects/${usersId}/files`);
    return response.data;
  } catch (error) {
    console.error("Error getting files by project ID:", error);
    throw error;
  }
};

export const updateFile = async (usersId, fileId, fileDto) => {
  try {
    const response = await axiosInstance.put(
      `/projects/${usersId}/files/${fileId}`,
      fileDto
    );
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

export const deleteFile = async (usersId, fileId) => {
  try {
    await axiosInstance.delete(`/projects/${usersId}/files/${fileId}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const executeFile = async (usersId, fileId) => {
  try {
    const response = await axiosInstance.post(
      `/projects/${usersId}/files/${fileId}/run`
    );
    return response.data;
  } catch (error) {
    console.error("Error executing file:", error);
    throw error;
  }
};

//채팅

// 메시지 검색 API 호출
export const search = async (content) => {
  try {
    // 세션 스토리지에서 토큰 가져오기
    const token = sessionStorage.getItem("token");

    const response = await axiosInstance.get("/chat/search", {
      params: { content },
      headers: {
        Authorization: `${token}`, // 헤더에 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`검색 요청 실패: ${error.message}`);
  }
};
