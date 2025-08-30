import asyncMiddleware from "../middlewares/async.middleware.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import errorResponse from "../responses/error.response.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

const getUsersToChat = asyncMiddleware(async (req, res) => {
  const { _id: currentUserId } = req.user;

  const users = await User.find({ _id: { $ne: currentUserId } }).select(
    "-password"
  );

  res.status(200).json({
    success: true,
    data: users,
  });
});

const getChatMessages = asyncMiddleware(async (req, res) => {
  const { _id: currentUserId } = req.user;
  const { id: userToChatId } = req.params;

  const userToChat = await User.findById(userToChatId);
  if (!userToChat) {
    throw errorResponse(404, "User not found");
  }

  const messages = await Message.find({
    $or: [
      { senderId: currentUserId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: currentUserId },
    ],
  });

  res.status(200).json({
    success: true,
    data: messages,
  });
});

const sendChatMessage = asyncMiddleware(async (req, res) => {
  const { text } = req.body;
  const { id: receiverId } = req.params;
  const { _id: senderId } = req.user;
  const files = req.files;

  let fileNames = [];

  if (files && files.length > 0) {
    for (const file of files) {
      fileNames.push(file.filename);
    }
  }

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw errorResponse(404, "User not found");
  }

  const newMessage = Message({
    senderId,
    receiverId,
    text,
    images: fileNames,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(200).json({
    success: true,
    data: newMessage,
  });
});

export default {
  getUsersToChat,
  getChatMessages,
  sendChatMessage,
};
