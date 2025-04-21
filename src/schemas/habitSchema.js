import Joi from "joi";

export const step1 = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional().allow(""),
});

export const step2 = Joi.object({
  category: Joi.string().optional().allow(""),
  priority: Joi.string().optional().allow(""),
  frequency: Joi.string().optional().allow(""),
  target: Joi.number().min(1).optional().allow(null, ""),
});

const habitsSchema = step1.concat(step2);
export default habitsSchema;
