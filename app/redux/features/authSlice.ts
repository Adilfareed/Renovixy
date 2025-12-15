// app/store/features/authSlice.ts
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

// helper: set token header for axios
const setAuthToken = (token: string | null) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

// -------------------- Thunks --------------------

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { username, email, password }: { username: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
      // expected: { success: true, token, user }
      const { token, user } = res.data;
      if (typeof window !== "undefined" && token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }
      return user;
    } catch (err: any) {
        console.log("error in signup",err)
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
        console.log(password)
        console.log(email )
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
       console.log(res.data)
      const { token, user, } = res.data;
      console.log("user", user)
      
      if (typeof window !== "undefined" && token) {
        localStorage.setItem("token", token  );
       
        setAuthToken(token);
      }
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Load user from token (on app start)
// export const loadUser = createAsyncThunk("/api/auth/loadUser", async (_, thunkAPI) => {
//   try {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (!token) return thunkAPI.rejectWithValue("No token");
//       setAuthToken(token);
//       const res = await axios.get(`${API_URL}/me`); // backend route to return current user
//       return res.data.user;
//     }
//     return thunkAPI.rejectWithValue("No window");
//   } catch (err: any) {
//     // invalid token -> remove
//     if (typeof window !== "undefined") localStorage.removeItem("token");
//     setAuthToken(null);
//     return thunkAPI.rejectWithValue(err.response?.data?.message || "Could not load user");
//   }
// });

// Logout
export const logoutUser = createAsyncThunk("/api/auth/logoutUser", async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    setAuthToken(null);
  }
  return true;
});

// -------------------- Slice --------------------

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // optional local reducer if needed
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // // load user
    // builder.addCase(loadUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(loadUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    //   state.isAuthenticated = true;
    // });
    // builder.addCase(loadUser.rejected, (state, action: any) => {
    //   state.loading = false;
    //   state.user = null;
    //   state.isAuthenticated = false;
    //   // only set error if it's meaningful
    //   if (action.payload && action.payload !== "No token") state.error = action.payload;
    // });

    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
