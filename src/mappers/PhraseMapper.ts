import Mapper from '../types/interfaces/Mapper';
import { Phrase } from '../models/Phrase';
import PhraseDTO from '../types/dtos/PhraseDTO';
import { injectable } from 'inversify';


@injectable()
class PhraseMapper implements Mapper<Phrase> {
    toDomain(dto: PhraseDTO): Phrase {
        const phrase = new Phrase();
        phrase.phrase = dto.phrase;
        phrase.translation = dto.translation;
        phrase.transcription = dto.transcription;
        phrase.additionalInfo = dto.additionalInfo;
        phrase.status = dto.status;
        phrase.topic = dto.topic;
        return phrase;
    }
    toDTO(domain: Phrase): PhraseDTO {
        const phraseDto = new PhraseDTO();
        phraseDto._id = domain._id;
        phraseDto.status = domain.status;
        phraseDto.phrase = domain.phrase;
        phraseDto.transcription = domain.transcription;
        phraseDto.translation = domain.translation;
        phraseDto.additionalInfo = domain.additionalInfo;
        phraseDto.topic = domain.topic;
        return phraseDto;
    }
}

export default PhraseMapper;
