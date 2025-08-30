import mongoose from "mongoose";
import env from "../configs/env.js";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("connect to mongodb successfully");
  } catch (error) {
    console.log("error connect to mongodb", error);
  }
};

export default connectMongoDb;
