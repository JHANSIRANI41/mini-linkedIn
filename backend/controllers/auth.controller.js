import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import getToken from "../config/token.js";
export const signUp = async(req, res) => {
    try {
        let { firstName, lastName, userName, email, password } = req.body;
        let EmailCheck = await User.findOne({ email });
        if (EmailCheck) {
            return res.status(400).json({
                msg: "email already exists!"
            })
        }
        //password should 8 character long
        if (password.length < 8) {
            return res.status(400).json({
                msg: "password should 8 letters long!"
            })
        }
        let userNameCheck = await User.findOne({ userName });
        if (userNameCheck) {
            return res.status(400).json({
                msg: "userName already exists!"
            })
        }

        //hashing the password
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
                firstName,
                lastName,
                userName,
                email,
                password: hashedPassword
            })
            //get the token 
        let token = await getToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(201).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "message": error
        })
    }
}

export const login = async(req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "email doesn't exists!"
            })
        }
        //hashing the password
        let matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                "message": "incorrect password"
            })
        }
        //get the token 
        let token = await getToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(200).json(
            user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "message": error
        })
    }
}

export const logOut = async function(req, res) {
    //clear the cookies
    try {
        res.clearCookie("token");
        return res.status(200).json({
            "message": "logout successful"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": "logout error" })
    }
}