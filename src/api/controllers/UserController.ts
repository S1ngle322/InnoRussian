import { Router, Request, Response, NextFunction } from "express";
import { injectable, inject, named } from 'inversify';
import Types from '../../types/enums/DITypes';
import Tags from '../../types/enums/DITags';
import Controller from '../../types/classes/Controller';
import validator from '../middlewares/schemaValidator';
import log from '../../utils/winston';
import UserService from "../../services/UserService";
import UserDTO from "../../types/dtos/UserDTO";
import {createUserSchema} from "../../types/schemas/userSchema";

@injectable()
class UserController extends Controller {
    @inject(Types.SERVICE)
    @named(Tags.USER)
    private service: UserService;

    public path = "/register";
    public verificationPath = "/verify";
    public router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post(
            this.path,
            validator(createUserSchema),
            this.createClient
        );
        this.router.get(
            `${this.path + this.verificationPath}/:token`,
            this.verifyClient
        );
    }

    createClient = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const client = await this.service.registerClient(
                req.body as UserDTO,
                `${req.protocol}://${req.headers.host}/api${this.path}${this.verificationPath}/`
            );
            res.status(201).send(
                `A verification email has been sent to ${client.email}.`
            );
        } catch (err) {
            log.info(
                `Caught exception in: ${this.createClient.name} ${module.filename}`
            );
            next(err);
        }
    };

    verifyClient = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.service.verifyClient(req.params.token);
            res.status(200).send('The account has been verified.');
        } catch (err) {
            log.info(
                `Caught exception in: ${this.verifyClient.name} ${module.filename}`
            );
            next(err);
        }
    };

}

export default UserController;