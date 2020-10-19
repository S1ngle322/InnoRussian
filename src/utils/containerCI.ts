import "reflect-metadata";
import { Container } from "inversify";
import UserRepository from "../repositories/UserRepositiry";
import Types from "../types/enums/DITypes";
import Tags from "../types/enums/DITags";
import PhraseRepository from "../repositories/PhraseRepository";



const container = new Container();

//controllers

//repositories

container
    .bind<UserRepository>(Types.REPOSITORY)
    .to(UserRepository)
    .whenTargetNamed(Tags.USER);

container
    .bind<PhraseRepository>(Types.REPOSITORY)
    .to(PhraseRepository)
    .whenTargetNamed(Tags.PHRASE);


//services

//mappers

export default container;