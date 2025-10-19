import mongoose from "mongoose"

const connectDB = async() =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected")
    }).catch(err => {
        console.log(err)
    })
}

export default connectDB;