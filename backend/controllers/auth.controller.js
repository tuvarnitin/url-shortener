import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { authenticateUser, createUser, findUserByEmail, findUserById } from "../dao/user.dao.js";


export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const user = await findUserByEmail(email);

        if (user) return res.json({ sucess: false, message: "User allready exists." })

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1m" })
        res.cookie("token", token)

        res.json({
            success: true,
            user: newUser,
            message: "Register success"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Internal server error , please try again after some time"
        })
    }
}
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) return res.json({ success: false, message: "Invalid credentials" });

        const isUserAuthanticated = await authenticateUser(password, user.password);

        if (!isUserAuthanticated) return res.json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" })
        res.cookie("token", token)

        res.json({
            user: user,
            success: true,
            message: "Login success"
        })
    } catch (error) {
        res.json({ success: false, message: "Internal server error , please try again after some time" })
    }
}
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await findUserById(id);
        if (!user) return res.json({ success: false, message: "User not found" });
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: "Internal server error , please try again after some time" });
    }
}