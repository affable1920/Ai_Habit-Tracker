import Joi from "joi";

export const step1 = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional().allow(""),
});

export const step2 = Joi.object({
  category: Joi.string().optional().allow(""),
  priority: Joi.number().optional().allow(null, ""),
  frequency: Joi.string().optional().allow("", null),
  target: Joi.number().min(1).optional().allow(null, ""),
});

const habitSchema = step1.concat(step2);
export default habitSchema;
