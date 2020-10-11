import bodyParser from 'body-parser';
import express from 'express';
import { Response, Request, NextFunction, Router } from 'express';
import cors from 'cors';
import log from '../utils/winston';
import boolParser from 'express-query-boolean';


const expressLoader = async (app: express.Application): Promise<void> => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(boolParser());
    //app.use(passport.initialize());
    //passportLoad();
    //app.use('/api', loadControllers());
    //app.use(errorsMiddleware);
    app.use('/', (req: Request, res: Response, next: NextFunction) =>
        res.status(404).send({ message: 'Wrong path' })
    );
    app.on('uncaughtException', error => log.error(error.stack));
    app.on('unhandledRejection', error => log.warn(error.stack));
};

export default expressLoader;