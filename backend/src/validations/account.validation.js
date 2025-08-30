import Joi from "./joi.js";
import authValidation from "./auth.validation.js";

const updateProfileSchema = Joi.object({
  firstName: authValidation.firstNameSchema,
  lastName: authValidation.lastNameSchema,
}).unknown(true);

export default { updateProfileSchema };
