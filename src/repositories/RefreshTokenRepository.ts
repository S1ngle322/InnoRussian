import { injectable } from "inversify";
import { RefreshToken } from "../models/RefreshToken";
import BaseRepository from "./BaseRepository";

@injectable()
class RefreshTokenRepository extends BaseRepository<RefreshToken> {
    public constructor() {
        super("RefreshToken");
    }
}

export default RefreshTokenRepository;
