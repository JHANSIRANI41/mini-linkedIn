import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
let userRouter = express.Router();

//protected route
userRouter.get("/currentUser", isAuth, getCurrentUser);

export default userRouter;