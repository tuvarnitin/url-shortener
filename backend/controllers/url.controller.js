
import { nanoid } from "nanoid";
import { createCustomShortUrl, createShortUrlWithoutuser, createShortUrlWithuser } from "../services/url.service.js";
import { deleteUrlById, findUrlBySlug, findUrlByUrlId, findUrlsOfUser, updateUrlInDatabase } from "../dao/url.dao.js";
import Url from "../models/url.model.js"
export const createShortUrl = async (req, res) => {
    try {
        const { url, userId = null } = req.body;
        if (!url) {
            return res.json({ success: false, message: "Please provide valid url" })
        }
        const urlId = nanoid(6);
        if (userId) {
            const exsitingUrl = await Url.findOne({ originalUrl: url , user:userId})
            if (exsitingUrl) return res.json({
                success: false,
                message: "You have already shorted this url"
            });

            const newUrl = await createShortUrlWithuser({ urlId, originalUrl: url, userId: userId });
            return res.json({
                success: true,
                shortUrl: newUrl.shortUrl
            });
        }
        const newUrl = await createShortUrlWithoutuser({ urlId, originalUrl: url });
        res.json({
            success: true,
            shortUrl: newUrl.shortUrl
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Internal server error , please try again after some time"
        })
    }
}
export const createCustomUrl = async (req, res) => {
    try {
        const { url, slug, userId = null } = req.body;

        const existingSlug = await Url.findOne({ slug })
        if (existingSlug) {
            return res.json({ success: false, message: "Slug already exists." })
        }
        const urlId = nanoid(6);
        if (userId) {
            const newUrl = await createCustomShortUrl({ urlId, originalUrl: url, userId: userId, slug: slug });
            return res.json({
                success: true,
                shortUrl: newUrl.shortUrl,
                message: "Url created successfuly"
            });
        }
        res.json({
            success: false,
            message: "Please login to create custom short URLs"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Internal server error , please try again after some time"
        })
    }
}

export const redirectUrl = async (req, res) => {
    try {
        const id = req.params.id;
        const url = await findUrlByUrlId(id);
        if (url) {
            return res.redirect(url.originalUrl)
        } else {
            return res.json({ message: "Url not found byid" })
        }
    } catch (error) {
        return res.json({ message: "Internal server error , please try again after some time" })
    }
}
export const redirectUrlBySlug = async (req, res) => {

    try {
        const slug = req.params.slug;
        const url = await findUrlBySlug(slug);
        if (url) {
            return res.redirect(url.originalUrl)
        }
    } catch (error) {
        return res.json({ message: "Internal server error , please try again after some time" })
    }
}

export const getUrls = async (req, res) => {
    try {
        const userId = req.params.userid;
        console.log(req.params)
        if (!userId) return res.json({ success: false, message: "Access denide" })
        const urls = await findUrlsOfUser(userId);
        console.log(urls)
        res.json({ success: true ,urls: urls });
    } catch (error) {
        res.json({ success: false, message: "Intenal server Error" });
    }
}

export const updateUrl = async (req, res) => {
    try {
        const id = req.params.id;
        const { urlName } = req.body;
        const updatedUrl = await updateUrlInDatabase(id, urlName);
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error , please try again after some time" });
    }
}

export const deleteUrl = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteUrlById(id);
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error , please try again after some time" });
    }
}
