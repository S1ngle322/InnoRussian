import Joi from 'joi';
import { Request, NextFunction } from 'express';
import ValidationError from '../../types/exceptions/ValidationError';

function validator(schema: any): any {
    return (req: Request, res: Response, next: NextFunction): any => {
        const { error } = Joi.validate(req.body, schema);
        const valid = error === null;
        if (valid) {
            return next();
        }
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        return next(new ValidationError(message));
    };
}

export default validator;