import { Router, Request, Response, NextFunction } from "express";
import { injectable, inject, named } from 'inversify';
import Types from '../../types/enums/DITypes';
import Tags from '../../types/enums/DITags';
import Controller from '../../types/classes/Controller';
import validator from '../middlewares/schemaValidator';
import log from '../../utils/winston';
import PhraseService from "../../services/PhraseService";
import PhraseDTO from "../../types/dtos/PhraseDTO";
import {createPhraseSchema} from "../../types/schemas/phraseSchema";
import UserService from "../../services/UserService";
import {createUserSchema} from "schemas/userSchema";
import UserDTO from "dtos/UserDTO";


@injectable()
class PhraseController extends Controller {
    @inject(Types.SERVICE)
    @named(Tags.PHRASE)
    private service: PhraseService;

    public path = "/phrase";
    public router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post(
            this.path,
            validator(createPhraseSchema),
            this.createPhrase
        );
    }

    createPhrase = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const phrase = await this.service.addPhrase(
                req.body as PhraseDTO
            );
            res.status(201).send(
                `Phrase \"${phrase.phrase}\" has been added successfully.`
            );
        } catch (err) {
            log.info(
                `Caught exception in: ${this.createPhrase.name} ${module.filename}`
            );
            next(err);
        }
    };
}

export default PhraseController;