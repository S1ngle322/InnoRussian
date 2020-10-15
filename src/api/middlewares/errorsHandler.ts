import { NextFunction, Request, Response } from 'express';
import log from '../../utils/winston';

const handledExceptions = new Map([
    ['EntityNotFoundError', 404],
    ['ValidationError', 400],
    ['UnauthorizedError', 401],
    ['NotImplementedError', 500],
    ['NoAccessError', 403]
]);

function getErrorStatus(error: Error): number {
    const errorName = error.constructor.name.toString();
    const status = handledExceptions.get(errorName);
    return !status ? handledExceptions.get(error.name) : status;
}

function errorsHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    let status = getErrorStatus(error);
    const message = error.message || 'Something went wrong';
    if (!status) {
        status = 500;
        log.warn(error.stack);
    } else {
        log.info(error.stack);
    }
    res.status(status).send({
        status,
        message
    });
}

export default errorsHandler;