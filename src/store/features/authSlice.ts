import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store";
import { API_URL } from "../../constants/index";
import api from "../../config/axios";

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  globalLoading: boolean;
  isAuthenticated: boolean;
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
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: Cookies.get("token") || null,
  status: "idle",
  error: null,
  globalLoading: false,
  isAuthenticated: !!Cookies.get("token"),
};

export const login = createAsyncThunk(
  "auth/signin",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/signin`, { email, password });
      const token = response.data.token;

      if (!token) throw new Error("No token found");

      const userResponse = await api.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data.user;

      Cookies.set("token", token, { expires: 7 });

      localStorage.setItem("user", JSON.stringify(user));
      

      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await api.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { user: response.data.user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to load user");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("token");
  localStorage.removeItem("user");
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
        state.globalLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.globalLoading = false;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.globalLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.globalLoading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
         state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        state.globalLoading = false;
        Cookies.remove("token");
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        state.globalLoading = false;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectGlobalLoading = (state: RootState) => state.auth.globalLoading;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
