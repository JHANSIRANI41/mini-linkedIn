import User from "../models/user.model.js"
export const getCurrentUser = async(req, res) => {
    try {
        console.log(req.userId)
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({
                "message": "user does not found"
            })
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": "user error"
        })
    }
}