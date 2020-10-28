import DTO from '../classes/BaseDTO';
import Status from '../../types/enums/WordsStatus';

class PhraseDTO extends DTO {
    phrase: string;
    translation: string;
    transcription: string;
    additionalInfo: string;
    status: Status;
    topic: string;
}

export default PhraseDTO;
