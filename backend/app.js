import express from "express"
import connectDB from "./config/db.config.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import urlRoute from "./routes/url.route.js";
import authRoute from "./routes/auth.route.js";
import contactRoute from "./routes/contact.route.js";
import { getUrls, redirectUrl, redirectUrlBySlug } from "./controllers/url.controller.js";
const app = express();

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Server Running")
})
app.use("/api/url", urlRoute)

app.get("/custom/:slug", redirectUrlBySlug)

app.get("/urls/:userid", getUrls)

app.get("/:id", redirectUrl)

app.use("/api/auth/user", authRoute)
app.use("/api/contact", contactRoute)

app.listen(process.env.PORT || 3000, "0.0.0.0",()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`)
})