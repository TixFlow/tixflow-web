import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store"; 
import { API_URL } from "../../constants/index"; 
import api from "../../config/axios";
import axios from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string | null;
  phoneNumber?: string;
  gender?: string;
  status?: string;
  verificationCode?: string | null;
  createdAt?: string;
  updateAt?: string;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("token") || null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/signin",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/signin`, { email, password });
      const token = response.data.token;

      Cookies.set("token", token, { expires: 7 });

      if (!token) throw new Error("No token found");

       const userResponse = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data.user;
      
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
);

// export const register = createAsyncThunk(
//   "auth/signup",
//   async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${API_URL}/auth/signup`, { username, email, password });
//       return response.data;
//     } catch (error: any) {
//      return rejectWithValue(error.response?.data?.message || "Đăng ký thất bại");
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("token");
  return null; 
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token; 
        state.user = action.payload.user; 
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // .addCase(register.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(register.fulfilled, (state) => {
      //   state.status = "succeeded";
      //   state.error = null;
      // })
      // .addCase(register.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload as string;
      // })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;