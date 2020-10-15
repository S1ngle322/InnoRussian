import mongoose from "mongoose";
import UserType from "../types/enums/UserEnum";
import UserModel from "../models/User";
import { User } from "../models/User";
import Permission from "../types/enums/Permission";

export class Admin extends User {
    permission: Permission;
}

const adminSchema = new mongoose.Schema({
   permission : {type: String, required: true},
});

const AdminModel = UserModel.discriminator<Admin & mongoose.Document>(UserType.ADMIN, adminSchema);

export default AdminModel;