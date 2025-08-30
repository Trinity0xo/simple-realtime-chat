import { io } from "socket.io-client";
import { setOnlineUsers } from "../slices/authSlice";
import { setMessages } from "../slices/chatSlice";
import { API_URL } from "./axios";

let socket = null;

export const connectSocket = (userId, dispatch) => {
  if (socket && socket.connected) {
    return;
  }

  socket = io(API_URL, {
    query: { userId },
  });

  socket.on("getOnlineUsers", (userIds) => {
    dispatch(setOnlineUsers(userIds));
  });
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToMessage = (selectedUserId, dispatch) => {
  if (!selectedUserId || !socket) {
    return;
  }

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId != selectedUserId) {
      return;
    }

    dispatch(setMessages(newMessage));
  });
};

export const unSubscribeToMessage = () => {
  if (!socket) return;
  socket.off("newMessage");
};

export const getSocket = () => socket;
