import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const findUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

export const createUser = async ({ name, email, password }) => {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return newUser;
}

export const authenticateUser = async (password, userPassword) => {
    if (!userPassword) return false;
    return await bcrypt.compare(password, userPassword);
}

export const findUserById = async (id) => {
    return await User.findById(id);
}