import mongoose from "mongoose";
import { Db } from "mongodb";
import log from "../utils/winston";
import requireDir from "require-dir";

async function initializeModels(): Promise<void> {
    log.info("Start loading models...");
    requireDir("../models", {
        mapKey(value: string, baseName: string) {
            log.info(`Model ${baseName} initialized`);
        },
        recurse: true,
    });
}

export default async (): Promise<Db> => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoCreate: true,
        });
        await initializeModels();
        return connection.connection.db;
    } catch (err) {
        log.error("Error while starting Mongo", err);
    }
};
