import express from "express";
import accountController from "../controllers/account.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multerMiddleware from "../middlewares/multer.middleware.js";
import accountValidation from "../validations/account.validation.js";
import validatorMiddleware from "../middlewares/validator.middleware.js";

const router = express.Router();

router.put(
  "/update-profile",
  authMiddleware,
  multerMiddleware.single("avatar"),
  validatorMiddleware(accountValidation.updateProfileSchema, "body"),
  accountController.updateProfile
);

export default router;
