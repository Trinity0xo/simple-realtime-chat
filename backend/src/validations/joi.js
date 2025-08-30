import Joi from "joi";
import mongoose from "mongoose";

const isValidObjectId = (value, helper) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helper.error("any.invalid");
  }
  return value;
};

Joi.objectId = () => Joi.custom(isValidObjectId);

export default Joi;
