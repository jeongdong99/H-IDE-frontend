import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  findPassword,
  findIdUser,
} from "./thunkFunctions";
import { toast } from "react-toastify";
//userSlice.js 파일에서는 회원가입이 완료되었을 때
//userData와 isAuth를 업데이트되어야함

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    nickname: "",
    role: 0,
    // image : '',
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    updateUserNickname: (state, action) => {
      state.userData.nickname = action.payload;
    },
    updateUserEmail: (state, action) => {
      state.userData.email = action.payload;
    },
    updateUserPassword: (state, action) => {
      // 비밀번호 변경 로직 추가
      state.userData.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        //2024.06.24
        state.userData = action.payload;
        state.isAuth = true;
        toast.info("회원가입을 성공했습니다.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        //로그인이 성공하면 바로 페이지 이동을 해주자
        state.userData = action.payload;
        state.isAuth = true; //현재 로그인 성공한 상태
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(findPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.info("비밀번호 재설정 이메일을 보냈습니다.");
      })
      .addCase(findPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(findIdUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findIdUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // findIdUser가 성공하면 여기에서 원하는 동작을 추가할 수 있습니다.
        // 예를 들어, 인증 코드를 보낸 후에 다음 화면으로 넘어가는 등의 처리를 할 수 있습니다.
      })
      .addCase(findIdUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  setUser,
  updateUserNickname,
  updateUserEmail,
  updateUserPassword,
} = userSlice.actions;

export default userSlice.reducer;
//reducer를 사용해서 redux 스토어를 생성해준다

userSlice.js;
