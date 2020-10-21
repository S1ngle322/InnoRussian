import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import UserModel from '../models/User';
import ValidationError from '../types/exceptions/ValidationError';
import EntityNotFoundError from '../types/exceptions/EntityNotFoundError';
import NotImplementedError from '../types/exceptions/NotImplementedError';
import log from "../utils/winston";

passport.serializeUser<any, any>((user, cb) => {
    cb(undefined, user._id);
});

passport.deserializeUser((id, cb) => {
    UserModel.findById(id, (err, user) => {
        cb(err, user);
    });
});

const auth = async () => {
    log.info('in auth()1');
    /**
     * Sign in using username and Password.
     */
    passport.use(
        new LocalStrategy(
            { emailField: 'email', passwordField: 'password' },
            async (email, password, cb) => {
                log.info('in auth()2');
                try {
                    log.info('in auth()3');
                    const eClient = await UserModel.findOne({
                        email: email.toLowerCase()
                    }).exec();

                    if (!eClient) {
                        const user = await UserModel.findOne({
                            email: email.toLowerCase()
                        }).exec();

                        if (!user) {
                            throw new ValidationError(
                                'User does not exist in the database'
                            );
                        }

                        if (!user.isVerified || user.isRejected) {
                            throw new EntityNotFoundError(
                                'User is not verified!'
                            );
                        }

                        user.comparePassword(
                            password,
                            (err: Error, isMatch: boolean) => {
                                if (err) {
                                    throw new Error(
                                        err.message
                                    );
                                }
                                if (isMatch) {
                                    return cb(null, user.toObject());
                                }
                                return cb(
                                    null,
                                    new ValidationError('Wrong Password!')
                                );
                            }
                        );
                    } else {
                        if (!eClient.isVerified) {
                            throw new EntityNotFoundError(
                                'User is not verified!'
                            );
                        }

                        eClient.comparePassword(
                            password,
                            (err: Error, isMatch: boolean) => {
                                if (err) {
                                    throw new Error(
                                        err.message
                                    );
                                }
                                if (isMatch) {
                                    return cb(null, eClient.toObject());
                                }
                                return cb(
                                    null,
                                    new ValidationError('Wrong Password!')
                                );
                            }
                        );
                        log.info('in auth()4');
                        return eClient;
                    }
                } catch (e) {
                    log.info('in auth()5');
                    return cb(e);
                }
            }
        )
    );
    log.info('in auth()6');
};

export default auth;
