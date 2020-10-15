import mongoose from "mongoose";
import UserType from "../types/enums/UserEnum";
import UserModel from "../models/User";
import { User } from "../models/User";

export class SuperAdmin extends User {
}

const superAdminSchema = new mongoose.Schema({

});

const SuperAdminModel = UserModel.discriminator<SuperAdmin & mongoose.Document>(UserType.SUPER_ADMIN, superAdminSchema);

export default SuperAdminModel;