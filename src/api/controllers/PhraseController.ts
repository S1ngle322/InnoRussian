import { Router, Request, Response, NextFunction } from "express";
import { injectable, inject, named } from 'inversify';
import Types from '../../types/enums/DITypes';
import Tags from '../../types/enums/DITags';
import Controller from '../../types/classes/Controller';
import validator from '../middlewares/schemaValidator';
import log from '../../utils/winston';
import PhraseService from "../../services/PhraseService";
import PhraseDTO from "../../types/dtos/PhraseDTO";
import {createPhraseSchema, updatePhraseSchema} from "../../types/schemas/phraseSchema";

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
        this.router.get(this.path, this.getAllPhrases);
        this.router.get(`${this.path}/:id`, this.getPhraseById);
        this.router.get(`${this.path}/instance/:phrase`, this.getPhrase);
        this.router.put(
            `${this.path}/:id`,
            validator(updatePhraseSchema),
            this.updatePhrase
        );
        this.router.delete(`${this.path}/:id`, this.removePhrase);
    }

    getAllPhrases = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const phrases = await this.service.findAllPhrases();
            res.send(phrases);
        } catch (error) {
            log.info(
                `Caught an exception in: ${this.getAllPhrases.name} ${module.filename}`
            );
            next(error);
        }
    };

    getPhraseById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const phrase = await this.service.findPhraseById(
                req.params.id,
            );
            res.send(phrase);
        } catch (error) {
            log.info(
                `Caught an exception in: ${this.getPhraseById.name} ${module.filename}`
            );
            next(error);
        }
    };

    getPhrase = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const phrase = await this.service.findPhrase(
                req.params.phrase
            );
            res.send(phrase);
        } catch (error) {
            log.info(
                `Caught an exception in: ${this.getPhrase.name} ${module.filename}`
            );
            next(error);
        }
    };

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

    updatePhrase = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const phrase = await this.service.updatePhrase(
                req.params.id,
                req.body as PhraseDTO,
            );
            const updatedPhrase = await this.service.findPhraseById(req.params.id);
            res.status(200).send(updatedPhrase);
        } catch (error) {
            log.info(
                `Caught an exception in: ${this.updatePhrase.name} ${module.filename}`
            );
            next(error);
        }
    };

    removePhrase = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.service.removePhrase(req.params.id);
            res.sendStatus(200);
        } catch (error) {
            log.info(
                `Caught an exception in: ${this.removePhrase.name} ${module.filename}`
            );
            next(error);
        }
    };
}

export default PhraseController;