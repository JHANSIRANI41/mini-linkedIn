import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDb = async() => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db error")
    }
}

export default connectDb;