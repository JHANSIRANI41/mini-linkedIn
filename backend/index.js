import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()
const app = express();
app.use(cors({
    origin: "https://mini-linkedin-frontend-rbng.onrender.com",
    credentials: true
}));
// app.use(bodyParser.urlencoded())

// // parse application/json
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json());
let port = process.env.PORT || 3004;
app.get("/", function(req, res) {
    res.send("hello");
})


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);





app.listen(port, () => {
    connectDb();
    console.log("server started")
});
