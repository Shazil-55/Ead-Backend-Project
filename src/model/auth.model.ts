import { PASSWORD_REGEX } from '../helpers/contants';
import Joi from 'joi';

export const joiPasswordValidation = Joi.string().required().min(8).regex(PASSWORD_REGEX);

export const RegisterUserBodySchema = Joi.object({
  name: Joi.string().required(),
  phoneNo: Joi.string().required(),
  email: Joi.string().email().required(),
  password: joiPasswordValidation,
});

export const UserLoginModelSchema = Joi.object({
  email: Joi.string().email().required(),
  password: joiPasswordValidation,
});

export interface RegisterUserBody {
  name: string;
  phoneNo: string;
  email: string;
  password: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
