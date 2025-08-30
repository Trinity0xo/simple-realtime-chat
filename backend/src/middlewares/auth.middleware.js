import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import env from "../configs/env.js";
import errorResponse from "../responses/error.response.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      throw errorResponse(401, "unauthorized");
    }

    const decode = jwt.verify(token, env.JWT_SECRET_KEY);
    if (!decode) {
      throw errorResponse(401, "unauthorized");
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      throw errorResponse(401, "unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    throw errorResponse(401, "unauthorized");
  }
};

export default authMiddleware;
