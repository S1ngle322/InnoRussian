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

    async findAllPhrases(): Promise<PhraseDTO[]> {
        const phrases = await this.phraseRepository.getAll();
        return phrases.map(phrase => this.phraseMapper.toDTO(phrase));
    }

    async findPhraseById(id: string): Promise<PhraseDTO> {
        const phrase = await this.phraseRepository.findById(id);
        return this.phraseMapper.toDTO(phrase);
    }

    async findPhrase(myPhrase: string): Promise<PhraseDTO> {
        const phraseObj = await this.phraseRepository.findOne({
            phrase: myPhrase
        } as Phrase);
        return this.phraseMapper.toDTO(phraseObj);
    }

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

    async updatePhrase(
        id: string,
        dto: PhraseDTO
    ): Promise<PhraseDTO> {
        const phrase = await this.phraseRepository.update(
            id,
            this.phraseMapper.toDomain(dto)
        );
        return this.phraseMapper.toDTO(phrase);
    }

    async removePhrase(id: string): Promise<void> {
        await this.phraseRepository.delete({ _id: id } as Phrase);
    }
}

export default PhraseService;