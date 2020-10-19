import { inject, injectable, named } from "inversify";
import { RefreshToken } from "../models/RefreshToken";
import RefreshTokenRepository from "../repositories/RefreshTokenRepository";
import Tags from "../types/enums/DITags";
import Types from "../types/enums/DITypes";

@injectable()
class RefreshTokenService {
    @inject(Types.REPOSITORY)
    @named(Tags.REFRESH_TOKEN)
    private refreshTokenRepository: RefreshTokenRepository;

    public async createUserRefreshToken(
        user: string,
        token: string,
    ): Promise<RefreshToken> {
        let newToken: RefreshToken = new RefreshToken();
        newToken.user = user;
        newToken.value = token;
        newToken = await this.refreshTokenRepository.create(newToken);

        return newToken;
    }

    public async deleteUserRefreshToken(
        userID: string,
    ): Promise<RefreshToken[]> {
        return await this.refreshTokenRepository.delete({
            user: userID,
        } as RefreshToken);
    }
}

export default RefreshTokenService;
