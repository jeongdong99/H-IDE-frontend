import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

// export const registerUser = createAsyncThunk(
//   "user/registerUser",  
//   async(body, thunkAPI)=>{
//     try{
//         const response = await axiosInstance.post(
//             // 위에가 백엔드에 요청을 보내는 부분이다
//         '/user/register',
//         body
//         )

//         return response.data;
//     } catch (error){
//         console.log(error);
//         return thunkAPI.rejectWithValue(error.response.data || error.message);

//     }
//     }
//     /*post메소드 사용했으니까 , app.post한 다음에
//     데이터베이스에 유저 데이터를 저장한다. 이때 user모델을 생성해놓음
//     백엔드에서 라우터들을 여러개 생성해줘도 되지만, 그러면 엔트리 파일이 너무 지저분해지므로
//     유저에 관한 요청은 유저 라우터에 저장하자
//   */
// )

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/sign-up', userData);
            return response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",  
    async(userData, thunkAPI)=>{
      try{
          const response = await axiosInstance.post('/login', userData);
          return response.data;
      } catch (error){
          console.log(error);
          return thunkAPI.rejectWithValue(error.response.data || error.message);
  
      }
    }
  )

  export const findIdUser = createAsyncThunk(
    "user/findIdUser",  
    async(userData, thunkAPI)=>{
      try{
          const response = await axiosInstance.post(
          '/users/findId',
            userData
          )
  
          return response.data;
      } catch (error){
          console.log(error);
          return thunkAPI.rejectWithValue(error.response.data || error.message);
  
      }
    }
  )