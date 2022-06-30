import Joi from 'joi';

const id = Joi.string().required();
const name = Joi.string().required();
const email = Joi.string().email().required();

export const findUserById = Joi.object({
  id,
});

export const createUser = Joi.object({
  name,
  email,
});

export const updateUser = Joi.object({
  name,
  email,
});
