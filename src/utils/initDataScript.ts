import requireDir from "require-dir";
import UserEnum from "../types/enums/UserEnum";
import UserModel from "../models/User";
import log from "./winston";
import mongooseLoader from "../loader/mongooseLoader";

const initJson = requireDir("../../data/init");

const loadUsers = async (): Promise<void> => {
    initJson.users.map((user: { type: UserEnum }) => {

        if (user.type === UserEnum.CLIENT)
            new UserModel(user).save();
    });
};

const initData = async (): Promise<void> => {
    await loadUsers();
    log.info("Finished loading init data");
};

const loadInitData = async (): Promise<void> => {
  await mongooseLoader();
    log.info("MongoDb loaded");
    log.info("Start loading init data");
    await initData();
};

loadInitData();