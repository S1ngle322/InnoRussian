import Joi from 'joi';
import Constants from '../../utils/Constants';
import UserEnum from '../enums/UserEnum';

export const createUserSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .regex(Constants.PASSWORD_REGEX)
        .required(),
    type: Joi.string()
        .valid(UserEnum.USER)
        .required()
});

export const updateUserSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().regex(Constants.PASSWORD_REGEX)
});
