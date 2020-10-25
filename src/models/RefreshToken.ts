import mongoose from "mongoose";
import { BaseModel } from "../types/classes/BaseModel";
import { User } from "./User";

export class RefreshToken extends BaseModel {
    user: User["_id"];
    value: string;
}

export const refreshTokenSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        value: { type: String, default: "", required: true },
    },
    { timestamps: true },
);

const RefreshTokenModel = mongoose.model<RefreshToken & mongoose.Document>(
    "RefreshToken",
    refreshTokenSchema,
);
export default RefreshTokenModel;
