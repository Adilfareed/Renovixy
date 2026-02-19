
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CONFIG, getAuthToken, setAuthToken } from "@/app/config/api";

// helper: set token header for axios
const setupAxiosAuth = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Set base URL for all axios requests
axios.defaults.baseURL = API_CONFIG.BASE_URL;

// -------------------- Thunks --------------------

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { 
      username, 
      email, 
      password, 
      phoneNumber, 
      address, 
      role, 
      profilePic 
    }: { 
      username: string;
      email: string; 
      password: string;
      phoneNumber?: string;
      address?: string;
      role?: string;
      profilePic?: File;
    },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (phoneNumber) formData.append('phoneNumber', phoneNumber);
      if (address) formData.append('address', address);
      if (role) formData.append('role', role);
      if (profilePic) formData.append('profilePic', profilePic);

      const res = await axios.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { token, user } = res.data;
      if (token) {
        setAuthToken(token);
        setupAxiosAuth(token);
      }
      return user;
    } catch (err: any) {
      console.log("error in signup", err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      console.log(password);
      console.log(email);
      
      const res = await axios.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });
      console.log(res.data);
      
      const { token, user } = res.data;
      console.log("user", user);
      
      if (token) {
        setAuthToken(token);
        setupAxiosAuth(token);
      }
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Load user from token (on app start)
export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Set up axios timeout and headers
        const source = axios.CancelToken.source();
        const timeout = 10000; // 10 seconds timeout
        
        const res = await axios.get(API_CONFIG.ENDPOINTS.AUTH.GET_USER, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: timeout,
          cancelToken: source.token
        });
        return res.data.data; // Extract user data from nested data object
      }
    }
    return null;
  } catch (err: any) {
    // Handle different types of errors
    if (axios.isCancel(err)) {
      return thunkAPI.rejectWithValue('Request cancelled');
    }
    
    if (err.code === 'ECONNABORTED') {
      return thunkAPI.rejectWithValue('Request timeout');
    }
    
    if (err.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      return thunkAPI.rejectWithValue('Invalid or expired token');
    }
    
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 
      err.message || 
      'Failed to load user'
    );
  }
});
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
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  setAuthToken(null);
  setupAxiosAuth(null);
  return true;
});

// Check username availability
export const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async (username: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_CONFIG.ENDPOINTS.AUTH.CHECK_USERNAME}?username=${username}`);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Username check failed");
    }
  }
);

// Check email availability
export const checkEmail = createAsyncThunk(
  "auth/checkEmail",
  async (email: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_CONFIG.ENDPOINTS.AUTH.CHECK_EMAIL}?email=${email}`);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Email check failed");
    }
  }
);

// Delete account
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      const token = getAuthToken();
      const res = await axios.delete(API_CONFIG.ENDPOINTS.AUTH.DELETE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuthToken(null);
      setupAxiosAuth(null);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Account deletion failed");
    }
  }
);

// -------------------- Slice --------------------

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  usernameAvailable: boolean | null;
  emailAvailable: boolean | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  usernameAvailable: null,
  emailAvailable: null,
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

    // load user
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action: any) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      // only set error if it's meaningful
      if (action.payload && action.payload !== "No token") state.error = action.payload;
    });

    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // check username
    builder.addCase(checkUsername.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkUsername.fulfilled, (state, action) => {
      state.loading = false;
      state.usernameAvailable = action.payload.available;
    });
    builder.addCase(checkUsername.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // check email
    builder.addCase(checkEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.emailAvailable = action.payload.available;
    });
    builder.addCase(checkEmail.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete account
    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(deleteAccount.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
