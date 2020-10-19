import {BaseModel} from "../types/classes/BaseModel";
import Status from "../types/enums/WordsStatus";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export class Phrase extends BaseModel {
    phrase: string;
    translation: string;
    transcription: string;
    additionalInfo: string;
    status: Status;
    //TODO add TOPIC and RELATED_WORDS classes
}

export const phraseSchema = new mongoose.Schema(
    {
        phrase: { type: String, default: "", unique: true },
        translation: { type: String, default: "", unique: false },
        transcription: { type: String, default: "", unique: false },
        additionalInfo: { type: String, default: "" },
        status: {type: String, default: "INACTIVE"},
    }
);

phraseSchema.plugin(uniqueValidator);

const PhraseModel = mongoose.model<Phrase & mongoose.Document>("Phrase", phraseSchema);
export default PhraseModel;