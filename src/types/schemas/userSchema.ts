import Joi from 'joi';
import Constants from '../../utils/Constants';
import UserEnum from '../enums/UserEnum';

const user = UserEnum.USER;
const admin = UserEnum.ADMIN;
const superAdmin= UserEnum.SUPER_ADMIN;

export const createUserSchema = Joi.object().keys({
    username: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .regex(Constants.PASSWORD_REGEX)
        .required(),
    type: Joi.string()
        .valid(user, admin, superAdmin)
        .required()
});

export const updateUserSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().regex(Constants.PASSWORD_REGEX)
});
