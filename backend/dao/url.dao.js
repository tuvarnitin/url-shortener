import Url from "../models/url.model.js";

export const findUrlByUrlId = async (urlId) => {
    return await Url.findOneAndUpdate({ urlId: urlId }, { $inc: { clicks: 1 } });
}
export const findUrlBySlug = async (slug) => {
    return await Url.findOneAndUpdate({ slug: slug }, { $inc: { clicks: 1 } });
}


export const updateUrlInDatabase = async (id, urlName) => {
    return await Url.findByIdAndUpdate(id, { name: urlName }, { new: true });
}

export const deleteUrlById = async (id) => {
    return await Url.findByIdAndDelete(id);
}
export const findUrlsOfUser = async (userId) => {
    return await Url.find({ user: userId });
}