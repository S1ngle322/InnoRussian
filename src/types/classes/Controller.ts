import { Router, Request } from 'express';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import UnauthorizedError from '../../types/exceptions/UnauthorizedError';

@injectable()
abstract class Controller {
    public router: Router;

    abstract initializeRoutes(): void;

    public getRouter = (): Router => {
        return this.router;
    };

    isValidIdInToken = (id: string, req: Request): boolean => {
        const bearerHeader = req.headers.authorization;

        if (!bearerHeader) {
            throw new UnauthorizedError('Please provide access token!');
        }

        const token = bearerHeader.toString();
        const decoded = jwt.decode(token, { complete: true });
        // @ts-ignore
        return id === decoded.payload.userId;
    };
}

export default Controller;
