import {NextFunction, Router} from "express";
import {inject, injectable, named} from "inversify";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import AuthService from "../../services/AuthService";
import {BaseModel} from "../../types/classes/BaseModel";
import Controller from "../../types/classes/Controller";
import Tags from "../../types/enums/DITags";
import Types from "../../types/enums/DITypes";
import NotImplementedError from "../../types/exceptions/NotImplementedError";
import ValidationError from "../../types/exceptions/ValidationError";
import Authorizable from "../../types/interfaces/Authorizable";
import log from "../../utils/winston";

@injectable()
class AuthController extends Controller {

    public router = Router();
    public path = "/auth";
    @inject(Types.SERVICE)
    @named(Tags.AUTH)
    private authService: AuthService;

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        // @ts-ignore
        this.router.post(this.path, this.localAuth);
    }

    public localAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            log.info(req.body.password);
            passport.authenticate("local", { session: false },
                async (
                    err: Error,
                    eClient: Authorizable & BaseModel,
                    info: IVerifyOptions,
                ) => {
                    try {
                        log.info(eClient.type);
                        log.info(req.body);
                        if (err) {
                            return next(err);
                        }

                        if (!eClient) {
                            throw new ValidationError("Can't find user");
                        }

                        // @ts-ignore
                        req.logIn(eClient, { session: false }, async () => {
                            if (err) {
                                throw new NotImplementedError(
                                    "Not implemented error!",
                                );
                            }

                            if (!eClient) {
                                return next(err);
                            }

                            const session = await this.authService.generateToken(
                                this.getPayload(eClient),
                            );

                            // @ts-ignore
                            return res.json(session);
                        });
                    } catch (e) {
                        return next(e);
                    }
                },
            )(req, res, next);
        } catch (e) {
            return next(e);
        }
    }

    private getPayload(user: Authorizable & BaseModel) {
        return {
            userId: user._id,
            type: "",
            role: user.type,
        };
    }
}

export default AuthController;
