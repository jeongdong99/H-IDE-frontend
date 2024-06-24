import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./thunkFunctions"
import { toast } from 'react-toastify';


const initialState = {

    userData : {
        id:'',
        email : '',
        name : '',
        role : 0,
        image : '',
    },  
    isAuth : false,
    isLoading: false,
    error: ''   
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state)=>{
            state.isLoading = false;
            toast.info('회원가입을 성공했습니다.');
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            //로그인이 성공하면 바로 페이지 이동을 해주자
            state.userData = action.payload;
            state.isAuth = true; //현재 로그인 성공한 상태
            localStorage.setItem('accessToken', action.payload.accessToken);
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })
    }
})

export default userSlice.reducer;
//reducer를 사용해서 redux 스토어를 생성해준다