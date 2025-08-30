import express from "express";
import messageController from "../controllers/message.controller.js";
import messageValidation from "../validations/message.validation.js";
import validatorMiddleware from "../middlewares/validator.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multerMiddleware from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/users-to-chat", authMiddleware, messageController.getUsersToChat);

router.get(
  "/:id",
  authMiddleware,
  validatorMiddleware(messageValidation.messageIdSchema, "params"),
  messageController.getChatMessages
);

router.post(
  "/send/:id",
  authMiddleware,
  multerMiddleware.array("images", 10),
  validatorMiddleware(messageValidation.messageIdSchema, "params"),
  validatorMiddleware(messageValidation.sendMessageSchema, "body"),
  messageController.sendChatMessage
);

export default router;
