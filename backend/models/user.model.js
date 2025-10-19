import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
        name:{type:String,required:true},
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true }
    })

    userSchema.set("toJSON", {
        transform: (doc, ret, options) => {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    });

    const userModel = mongoose.models.User || mongoose.model("User", userSchema);
    export default userModel;
