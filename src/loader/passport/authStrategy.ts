import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import UserModel from '../../models/User';
import ValidationError from '../../types/exceptions/ValidationError';
import EntityNotFoundError from '../../types/exceptions/EntityNotFoundError';
import log from "../../utils/winston";
import NotImplementedError from "../../types/exceptions/NotImplementedError";

passport.serializeUser<any, any>((user, cb) => {
    cb(undefined, user._id);
});

passport.deserializeUser((id, cb) => {
    UserModel.findById(id, (err: any, user: {}) => {
        cb(err, user);
    });
});

const auth = async () => {
    /**
     * Sign in using username and Password.
     */
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            async (email, password, cb) => {

                try {
                    const user = await UserModel.findOne({
                        email: email.toLowerCase()
                    }).exec();

                    if (!user) {
                        return cb(null, new EntityNotFoundError(
                            "User does not exist in the database"
                        ));
                    } else {
                        if (!user.isVerified) {
                            return cb (null, new EntityNotFoundError(
                                'User is not verified!'
                            ));
                        }
                        user.comparePassword(
                            password,
                            (err: Error, isMatch: boolean) => {
                                if (err) {
                                    return cb (
                                        new Error(err.message)
                                    );
                                }
                                if (isMatch) {
                                    return cb(
                                        null,
                                        user.toObject());
                                }
                                return cb(
                                    null,
                                    new ValidationError('Wrong Password!')
                                );
                            }
                        );
                        return cb(null, user);
                    }
                } catch (e) {
                    return cb(e);
                }
            }
        )
    );
};

export default auth;