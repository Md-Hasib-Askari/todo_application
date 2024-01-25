import { model, Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        },
    password: {
        type: String,
        required: true,
        minlength: 5
        },
    }, {timestamps: true, versionKey: false}
)

export default model<IUser>("UserDB", userSchema);