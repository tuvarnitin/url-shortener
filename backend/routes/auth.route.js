import express from "express"
import { loginUser, registerUser, getUser } from "../controllers/auth.controller.js"
const route = express.Router()

route.get("/:id",getUser)
route.post("/register",registerUser)
route.post("/login",loginUser)

export default route