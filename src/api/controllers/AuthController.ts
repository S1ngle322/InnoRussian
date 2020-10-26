import {NextFunction, Router} from "express";
import {inject, injectable, named} from "inversify";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import AuthService from "../../services/AuthService";
import {BaseModel} from "classes/BaseModel";
import Controller from "../../types/classes/Controller";
import Tags from "../../types/enums/DITags";
import Types from "../../types/enums/DITypes";
import NotImplementedError from "../../types/exceptions/NotImplementedError";
import Authorizable from "../../types/interfaces/Authorizable";
import log from "../../utils/winston";

@injectable()
class AuthController extends Controller {

    @inject(Types.SERVICE)
    @named(Tags.AUTH)
    private authService: AuthService;

    public router = Router();
    public path = "/auth";

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        // @ts-ignore
        this.router.post(this.path, this.localAuth);
    }

    localAuth = async (req: Request, res: Response, next: NextFunction) =>  {
        try {
            passport.authenticate("local",
                { session: false },
                async (
                    err: Error,
                    eClient: Authorizable & BaseModel,
                    info: IVerifyOptions,
                ) => {
                    try {
                        if (err) {
                            return next(err);
                        }

                        if (eClient) {
                            // @ts-ignore
                            req.logIn(eClient, {session: false}, async () => {
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
                        } else {
                            // @ts-ignore
                            return res.json("Cant find the user!");
                        }
                    } catch (e) {
                        return next(e);
                    }
                },
            )(req, res, next);
        } catch (e) {
            return next(e);
        }
    };

    private getPayload(user: Authorizable & BaseModel) {
        return {
            userId: user._id,
            type: "",
            role: user.type,
        };
    }
}

export default AuthController;