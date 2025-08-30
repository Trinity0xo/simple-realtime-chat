import multer from "multer";
import path from "path";
import fs from "fs";
import env from "../configs/env.js";

const uploadDir = env.UPLOAD_PATH;

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Upload directory created at:", uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const ext = path.extname(originalname);

    cb(null, `${fieldname}-${originalname}-${Date.now()}${ext}`);
  },
});

const ALLOW_EXT = [".png", ".jpeg", ".jpg"];
const FILE_LIMIT = 5;

const limits = {
  fileSize: FILE_LIMIT * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const { originalname } = file;
  const ext = path.extname(originalname);

  if (!ALLOW_EXT.includes(ext)) {
    return cb(new Error(`Not support ${ext}`), false);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
