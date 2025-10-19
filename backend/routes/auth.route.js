import express from "express"
import { loginUser, registerUser, getUser, refreshToken, logout } from "../controllers/auth.controller.js"
const route = express.Router()

route.get("/", getUser)
route.post("/register", registerUser)
route.post("/login", loginUser)
route.post("/refresh", refreshToken)  // Add refresh token endpoint
route.post("/logout", logout)         // Add logout endpoint

export default route