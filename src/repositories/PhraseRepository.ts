import { injectable } from 'inversify';
import BaseRepository from './BaseRepository';
import { Phrase } from '../models/Phrase';

@injectable()
class PhraseRepository extends BaseRepository<Phrase> {
    constructor() {
        super('Phrase');
    }
}

export default PhraseRepository;