import "reflect-metadata";
import { Container } from "inversify";
import UserRepository from "../repositories/UserRepositiry";
import Types from "../types/enums/DITypes";
import Tags from "../types/enums/DITags";
import PhraseRepository from "../repositories/PhraseRepository";
import RefreshTokenRepository from "../repositories/RefreshTokenRepository";
import AuthService from "../services/AuthService";
import AuthController from "../api/controllers/AuthController";
import RefreshTokenService from "../services/RefreshTokenService";

const container = new Container();

//controllers

container
    .bind<AuthController>(Types.CONTROLLER)
    .to(AuthController)
    .whenTargetNamed(Tags.AUTH);

//repositories

container
    .bind<RefreshTokenRepository>(Types.REPOSITORY)
    .to(RefreshTokenRepository)
    .whenTargetNamed(Tags.REFRESH_TOKEN);

container
    .bind<UserRepository>(Types.REPOSITORY)
    .to(UserRepository)
    .whenTargetNamed(Tags.USER);

container
    .bind<PhraseRepository>(Types.REPOSITORY)
    .to(PhraseRepository)
    .whenTargetNamed(Tags.PHRASE);


//services

container
    .bind<AuthService>(Types.SERVICE)
    .to(AuthService)
    .whenTargetNamed(Tags.AUTH);

container
    .bind<RefreshTokenService>(Types.SERVICE)
    .to(RefreshTokenService)
    .whenTargetNamed(Tags.REFRESH_TOKEN);

//mappers

export default container;