import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import { Response, Request, NextFunction, Router } from 'express';
import cors from 'cors';
import log from '../utils/winston';
// @ts-ignore
import boolParser from 'express-query-boolean';
import Controller from "../types/classes/Controller";
import container from "../utils/containerCI";
import Types from "../types/enums/DITypes";
import errorsMiddleware from "../api/middlewares/errorsHandler";
import auth from "./authStrategy";


function loadControllers(): Router {
    const router = Router();
    const controllers = container.getAll<Controller>(Types.CONTROLLER);
    log.info('Load controllers');
    controllers.forEach(controller => {
        log.info(controller.constructor.name.toString());
        router.use('/', controller.getRouter());
    });
    log.info('Controllers loaded');
    return router;
}


const expressLoader = async (app: express.Application): Promise<void> => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(boolParser());
    app.use(passport.initialize());
    await auth();
    app.use('/api', loadControllers());
    app.use(errorsMiddleware);
    app.use('/', (req: Request, res: Response, next: NextFunction) =>
        res.status(404).send({ message: 'Wrong path' })
    );
    app.on('uncaughtException', error => log.error(error.stack));
    app.on('unhandledRejection', error => log.warn(error.stack));
};

export default expressLoader;