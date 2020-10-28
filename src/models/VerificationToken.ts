import mongoose from 'mongoose';
import { BaseModel } from '../types/classes/BaseModel';
import { User } from './User';

export class VerificationToken extends BaseModel {
    user: User['_id'];
    value: string;
}

export const verificationTokenSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        value: { type: String, default: '', required: true }
    },
    { timestamps: true }
);

const VerificationTokenModel = mongoose.model<
    VerificationToken & mongoose.Document
    >('VerificationToken', verificationTokenSchema);

export default VerificationTokenModel;
