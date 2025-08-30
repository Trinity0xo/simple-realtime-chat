import dotenv from "dotenv";

dotenv.config();

const env = {
  SERVER_HOST: process.env.SERVER_HOST || "localhost",
  SERVER_PORT: process.env.SERVER_PORT || 8080,

  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/simple-realtime-chat",

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "123456",
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || "1d",

  NODE_ENV: process.env.NODE_ENV || "development",
  UPLOAD_PATH: process.env.UPLOAD_PATH || "D:/simple-realtime-chat/uploads",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

export default env;
