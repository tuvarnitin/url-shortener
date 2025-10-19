import Url from "../models/url.model.js";

export const createShortUrlWithoutuser = async ({ urlId, originalUrl }) => {
    const newUrl = new Url({
        urlId,
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/${urlId}`
    });
    await newUrl.save();
    return newUrl;
}
export const createShortUrlWithuser = async ({ urlId, originalUrl, userId }) => {
    const newUrl = new Url({
        urlId,
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/${urlId}`,
        user: userId
    });
    await newUrl.save();
    return newUrl;
}
export const createCustomShortUrl = async ({ urlId, originalUrl, userId, slug }) => {

    const newUrl = new Url({
        urlId,
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/custom/${slug}`,
        slug: slug,
        user: userId
    });
    await newUrl.save();
    return newUrl;
}