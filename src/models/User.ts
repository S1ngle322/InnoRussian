import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import uniqueValidator from "mongoose-unique-validator";
import UserType from "../types/enums/UserEnum";
import { BaseModel } from "../types/classes/BaseModel";
import Authorizable from "../types/interfaces/Authorizable";

type comparePasswordFunction = (
    candidatePassword: string,
    cb: (err: mongoose.Error, isMatch: boolean) => void
) => void;

export class User extends BaseModel implements Authorizable {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isRejected: boolean;
    phone: string;
    type: UserType;
    comparePassword: comparePasswordFunction;
}

export const userSchema = new mongoose.Schema(
    {
        username: { type: String, default: "", unique: true },
        email: { type: String, default: "" },
        password: { type: String },
        isVerified: { type: Boolean, default: false },
        isRejected: { type: Boolean, default: false },
        phone: { type: String, default: "" },
        type: { type: String, required: true, immutable: true },
    },
    { discriminatorKey: "type", timestamps: true }
);
userSchema.plugin(uniqueValidator);

/**
 * Password hash middleware
 */
userSchema.pre("save", function save(next) {
    const user = this as User & mongoose.Document;
    if (!user.isModified("password")) {
        return next();
    }

    if (!user.password) {
        return next();
    }

    bcrypt.genSalt(10, (err: mongoose.Error, salt: any) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(
            user.password,
            salt,
            null,
            (err: mongoose.Error, hash: string) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            }
        );
    });
});

const comparePassword: comparePasswordFunction = function(
    candidatePassword,
    cb
) {
    bcrypt.compare(
        candidatePassword,
        this.password,
        (err: mongoose.Error, isMatch: boolean) => {
            cb(err, isMatch);
        }
    );
};

userSchema.methods.comparePassword = comparePassword;

const UserModel = mongoose.model<User & mongoose.Document>("User", userSchema);
export default UserModel;