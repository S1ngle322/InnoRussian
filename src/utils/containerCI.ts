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
import UserController from "../api/controllers/UserController";
import VerificationTokenRepository from "../repositories/VerificationTokenRepository";
import UserService from "../services/UserService";
import EmailService from "../services/EmailService";
import UserEmailMapper from "../mappers/UserEmailMapper";
import PhraseMapper from "../mappers/PhraseMapper";
import PhraseService from "../services/PhraseService";
import PhraseController from "../api/controllers/PhraseController";

const container = new Container();

//controllers

container
    .bind<AuthController>(Types.CONTROLLER)
    .to(AuthController)
    .whenTargetNamed(Tags.AUTH);

container
    .bind<UserController>(Types.CONTROLLER)
    .to(UserController)
    .whenTargetNamed(Tags.USER);

container
    .bind<PhraseController>(Types.CONTROLLER)
    .to(PhraseController)
    .whenTargetNamed(Tags.PHRASE);

//repositories

container
    .bind<RefreshTokenRepository>(Types.REPOSITORY)
    .to(RefreshTokenRepository)
    .whenTargetNamed(Tags.REFRESH_TOKEN);

container
    .bind<VerificationTokenRepository>(Types.REPOSITORY)
    .to(VerificationTokenRepository)
    .whenTargetNamed(Tags.VERIFICATION_TOKEN);

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

container
    .bind<UserService>(Types.SERVICE)
    .to(UserService)
    .whenTargetNamed(Tags.USER);

container
    .bind<EmailService>(Types.SERVICE)
    .to(EmailService)
    .whenTargetNamed(Tags.EMAIL);

container
    .bind<PhraseService>(Types.SERVICE)
    .to(PhraseService)
    .whenTargetNamed(Tags.PHRASE);

//mappers

container
    .bind<UserEmailMapper>(Types.MAPPER)
    .to(UserEmailMapper)
    .whenTargetNamed(Tags.EMAIL);

container
    .bind<PhraseMapper>(Types.MAPPER)
    .to(PhraseMapper)
    .whenTargetNamed(Tags.PHRASE);

export default container;