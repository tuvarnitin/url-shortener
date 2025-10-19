import mongoose from "mongoose"

const urlScheme = new mongoose.Schema({
    urlId: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        default:null
    },
    name:{
        type: String,
        default:null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    clicks:{
        type: Number,
        default: 0
    }
})

const urlModel = mongoose.models.Url || mongoose.model("Url", urlScheme);
export default urlModel