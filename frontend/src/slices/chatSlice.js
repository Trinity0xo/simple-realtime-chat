import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstant } from "../lib/axios";

export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstant.get("/message/users-to-chat");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong during get users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const selectedUser = state.chat.selectedUser;

      const response = await axiosInstant.get(`/message/${selectedUser._id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong during get chat messages";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const selectedUser = state.chat.selectedUser;

      const response = await axiosInstant.post(
        `/message/send/${selectedUser._id}`,
        data
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong during send message";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
        state.users = [];
      })

      .addCase(getChatMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload.data;
      })
      .addCase(getChatMessages.rejected, (state) => {
        state.isMessagesLoading = false;
        state.messages = [];
      })

      .addCase(sendMessage.pending, (state) => {})
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload.data];
      })
      .addCase(sendMessage.rejected, (state) => {});
  },
});

export const { setSelectedUser, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
