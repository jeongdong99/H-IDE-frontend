import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/sign-up", userData);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/login", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const findIdUser = createAsyncThunk(
  "user/findId",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/findId", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const findPassword = createAsyncThunk(
  "user/findPw",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/findPw", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export default {
  registerUser,
  loginUser,
  findIdUser,
  findPassword,
};
