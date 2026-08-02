import User from "../models/auth.model";
import { Id } from "../types/common";

//register in database
export const saveDb = async (email: string, password: string) => {
    const user = new User({
        email: email,
        password: password,
    });

    await user.save();
    return user.toObject();
};

//update role in database
export const roleSave = async (userId: Id, role: string) => {
    const user = User.findByIdAndUpdate(userId, { role: role }).lean().exec();
    return user;
};

// soft user delete
export const userDelete = async (userId: Id) => {
    const user = User.findByIdAndUpdate(userId, { isActive: false }).lean().exec();
    return user;
};
