import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()

const getToken = async(userId) => {
    try {
        let token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return token;
    } catch (error) {
        console.log(error)
    }
}
export default getToken;