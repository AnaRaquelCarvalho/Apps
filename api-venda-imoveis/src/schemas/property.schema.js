import Joi from "joi";

export const propertySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .required(),

  description: Joi.string()
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  type: Joi.string()
    .required(),

  address: Joi.string()
    .required(),

  bedrooms: Joi.number()
    .integer()
    .min(0),

  bathrooms: Joi.number()
    .integer()
    .min(0),

  area: Joi.number()
    .positive(),
});