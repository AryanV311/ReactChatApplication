import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDb from "./config/connectdb.js";
import cookieParser from "cookie-parser";
import authRouter from "./router/authRouter.js";

const app = express();
app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE","PATCH"],
        credentials:true
    })
)

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)

const PORT = 5000
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("database is connected");
        console.log(`server running on http://localhost:${PORT}`);
    })
})