import express from "express"
import { createShortUrl, redirectUrl, getUrls, createCustomUrl, updateUrl, deleteUrl } from "../controllers/url.controller.js"
const route = express.Router()

route.post("/",createShortUrl)
route.post("/custom",createCustomUrl)
route.delete("/:id",deleteUrl)
route.put("/:id",updateUrl)


export default route