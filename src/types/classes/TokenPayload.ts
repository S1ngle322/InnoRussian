import UserEnum from '../enums/UserEnum';

class TokenPayload {
    userId: string;
    type: string;
    role: UserEnum;
}

export default TokenPayload;
