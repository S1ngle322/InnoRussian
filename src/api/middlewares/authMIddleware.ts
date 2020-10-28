import UserEnum from '../../types/enums/UserEnum';
import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import UnauthorizedError from '../../types/exceptions/UnauthorizedError';
import { JWT_ACCESS_SECRET } from '../../utils/secrets';
import TokenPayload from 'classes/TokenPayload';

function isAuthenticated(roles: UserEnum[] = null) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const bearerHeader = req.headers.authorization;

            if (!bearerHeader) {
                throw new UnauthorizedError('Please provide access token!');
            }

            const token = bearerHeader.toString();

            const data = jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;

            if (roles) {
                if (!roles.includes(data.role)) {
                    throw new UnauthorizedError(
                        'This rile have no permission to this endpoint'
                    );
                }
            }
            res.locals.token = data;
            next();
        } catch (e) {
            next(e);
        }
    };
}

export default isAuthenticated;