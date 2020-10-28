import {inject, injectable, named} from "inversify";
import Types from "../types/enums/DITypes";
import Tags from "../types/enums/DITags";
import PhraseRepository from "../repositories/PhraseRepository";
import PhraseDTO from "../types/dtos/PhraseDTO";
import {Phrase} from "../models/Phrase";
import PhraseMapper from "../mappers/PhraseMapper";


@injectable()
class PhraseService {
    @inject(Types.REPOSITORY)
    @named(Tags.PHRASE)
    private phraseRepository: PhraseRepository;

    @inject(Types.MAPPER)
    @named(Tags.PHRASE)
    private phraseMapper: PhraseMapper;

    public async addPhrase(
        phraseDTO: PhraseDTO
    ): Promise<PhraseDTO> {
        const phraseDomain = this.phraseMapper.toDomain(
            phraseDTO
        ) as Phrase;
        const phraseDto = this.phraseMapper.toDTO(
            await this.phraseRepository.create(phraseDomain)
        );
        return phraseDto;
    }
}

export default PhraseService;