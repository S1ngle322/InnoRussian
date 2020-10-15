import "reflect-metadata";
import { Container } from "inversify";
import UserRepository from "../repositories/UserRepositiry";
import Types from "../types/enums/DITypes";
import Tags from "../types/enums/DITags";



const container = new Container();

//controllers

//repositories


container
    .bind<UserRepository>(Types.REPOSITORY)
    .to(UserRepository)
    .whenTargetNamed(Tags.USER);

//services

//mappers

export default container;