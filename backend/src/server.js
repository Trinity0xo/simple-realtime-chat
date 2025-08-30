import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./configs/env.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import connectMongoDb from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import accountRounte from "./routes/account.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

connectMongoDb();

app.use("/files", express.static(env.UPLOAD_PATH));
app.use("/api/auth", authRoute);
app.use("/api/account", accountRounte);
app.use("/api/message", messageRoute);

app.use(errorMiddleware);

const SERVER_PORT = env.SERVER_PORT;

server.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT}`);
});
