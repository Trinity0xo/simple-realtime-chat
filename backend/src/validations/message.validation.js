import Joi from "./joi.js";

const messageIdSchema = Joi.object({
  id: Joi.objectId(),
});

const sendMessageSchema = Joi.object({
  text: Joi.string().min(1).required(),
}).unknown(true);

export default {
  messageIdSchema,
  sendMessageSchema,
};
