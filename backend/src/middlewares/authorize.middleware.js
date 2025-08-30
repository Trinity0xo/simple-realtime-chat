import User from "../models/user.model";
import errorResponse from "./error.response";

const authrizeMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const { userId } = req.user;

      const authenticatedUser = await User.findByPk(userId);
      if (!authenticatedUser) {
        throw errorResponse(403, "forbidden");
      }

      if (!roles.includes(authenticatedUser.role)) {
        throw errorResponse(403, "forbidden");
      }

      next();
    } catch (error) {
      throw errorResponse(403, "forbidden");
    }
  };
};

export default authrizeMiddleware;
