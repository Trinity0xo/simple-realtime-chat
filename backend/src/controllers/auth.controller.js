import asyncMiddleware from "../middlewares/async.middleware.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorResponse from "../responses/error.response.js";
import utils from "../lib/utils.js";

const signup = asyncMiddleware(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw errorResponse(400, "Password do not match");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw errorResponse(409, "User with this email already exists");
  }

  const salt = bcryptjs.genSaltSync(12);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  utils.generateToken(newUser._id, res);
  await newUser.save();

  const userJson = newUser.toObject();
  delete userJson.password;

  res.status(201).json({
    success: true,
    data: userJson,
    message: "Signup successfully",
  });
});

const login = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw errorResponse(401, "Invalid email or password");
  }

  const isValidPassword = bcryptjs.compareSync(password, user.password);
  if (!isValidPassword) {
    throw errorResponse(401, "Invalid email or password");
  }

  utils.generateToken(user._id, res);

  const userJson = user.toObject();
  delete userJson.password;

  res.status(200).json({
    success: true,
    data: userJson,
    message: "Login successfully",
  });
});

const logout = asyncMiddleware(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

const checkAuth = asyncMiddleware(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

export default {
  signup,
  login,
  logout,
  checkAuth,
};
