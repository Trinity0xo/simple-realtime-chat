import express from "express";
import authController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";
import validatorMiddleware from "../middlewares/validator.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  validatorMiddleware(authValidation.signupSchema, "body"),
  authController.signup
);

router.post(
  "/login",
  validatorMiddleware(authValidation.loginSchema, "body"),
  authController.login
);

router.post("/logout", authController.logout);

router.get("/check", authMiddleware, authController.checkAuth);

export default router;
