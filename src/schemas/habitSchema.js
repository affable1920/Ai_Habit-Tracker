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

export const step3 = Joi.object({
  reminder: Joi.boolean().truthy("yes").falsy("no").allow(null, "").optional(),

  reminderTimes: Joi.when("reminder", {
    is: true,
    then: Joi.date().min("now").allow(""),
  }),
});

export default { step1, step2, step3 };
