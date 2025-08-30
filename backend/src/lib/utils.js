import jwt from "jsonwebtoken";
import env from "../configs/env.js";
import fs from "fs";
import path from "path";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET_KEY, {
    expiresIn: env.JWT_EXPIRE_TIME,
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV !== "development",
  });

  return token;
};

const deleteFile = (fileName) => {
  if (!fileName) return;

  const filePath = path.join(env.UPLOAD_PATH, fileName);

  fs.unlink(filePath, (error) => {
    if (error) {
      if (error.code === "ENOENT") {
        console.log("File not found:", filePath);
      } else {
        console.log("Error deleting file:", error);
      }
    } else {
      console.log("Deleted file:", filePath);
    }
  });
};

export default {
  generateToken,
  deleteFile,
};
