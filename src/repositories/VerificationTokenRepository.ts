import {injectable} from "inversify";
import BaseRepository from "./BaseRepository";
import {VerificationToken} from "../models/VerificationToken";


@injectable()
class VerificationTokenRepository extends BaseRepository<VerificationToken> {
    constructor() {
        super('VerificationToken');
    }
}

export default VerificationTokenRepository;