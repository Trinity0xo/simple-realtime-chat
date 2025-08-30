import asyncMiddleware from "../middlewares/async.middleware.js";
import User from "../models/user.model.js";
import errorResponse from "../responses/error.response.js";
import utils from "../lib/utils.js";

const updateProfile = asyncMiddleware(async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName } = req.body;
  const newFileName = req.file?.filename;

  const user = await User.findById(_id);
  if (!user) {
    throw errorResponse(404, "User not found");
  }

  if (newFileName && user.avatar) {
    utils.deleteFile(user.avatar);
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      firstName,
      lastName,
      avatar: newFileName,
    },
    { new: true }
  );

  const updatedUserJson = updatedUser.toObject();
  delete updatedUserJson.password;

  res.status(200).json({
    success: true,
    data: updatedUserJson,
    message: "Update profile successfully",
  });
});

export default {
  updateProfile,
};
