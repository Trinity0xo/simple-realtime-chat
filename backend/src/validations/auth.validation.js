import Joi from "./joi.js";

const passwordSchema = Joi.string().min(6).required();
const emailSchema = Joi.string().email().required();
const firstNameSchema = Joi.string().min(2).max(255).required();
const lastNameSchema = Joi.string().min(2).max(255).required();

const signupSchema = Joi.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export default {
  signupSchema,
  loginSchema,
  emailSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
};
