import express from "express"
import { getUserInfo, login, signup } from "../controllers/userController.js"
import { verifyToken } from "../middleware/authMidlleware.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/user-info",verifyToken,getUserInfo)

export default authRouter;