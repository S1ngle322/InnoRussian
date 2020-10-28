import Joi from 'joi';
import Status from "../enums/WordsStatus";

export const createPhraseSchema = Joi.object().keys({
    phrase: Joi.string()
        .required(),
    translation: Joi.string()
        .required(),
    topic: Joi.string()
        .required(),
    transcription: Joi.string(),
    additionalInfo: Joi.string(),
   /* status: Joi.string()
        .valid(Status)
        .required()*/
});

export const updateUserSchema = Joi.object().keys({
    phrase: Joi.string(),
    topic: Joi.string(),
    translation: Joi.string(),
   /* status: Joi.string().valid(Status)*/
});
