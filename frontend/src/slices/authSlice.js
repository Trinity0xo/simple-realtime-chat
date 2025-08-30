import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstant } from "../lib/axios";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstant.get("/auth/check");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong during checking auth";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstant.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong during signup";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstant.post("/auth/login", data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong during login";
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstant.post("/auth/logout");
      return response.data;
    } catch (error) {
      error.response?.data?.message || "Something went wrong during logout";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstant.put("/account/update-profile", data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong during updating profile";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // check auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload.data;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload.data;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })

      // logout
      .addCase(logout.pending, (state) => {})
      .addCase(logout.fulfilled, (state, action) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {})

      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload.data;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
