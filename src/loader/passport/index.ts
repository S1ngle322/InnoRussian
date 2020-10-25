import log from "../../utils/winston";
import auth from "./authStrategy";

export default function runPassport(){
    auth();
    log.info('Passport loaded');
};