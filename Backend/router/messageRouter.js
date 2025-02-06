
import express from "express"
import { verifyToken } from "../middleware/authMidlleware.js"
import getMessages from "../controllers/messageController.js"

const messageRoute = express.Router()

messageRoute.post("/get-messages", verifyToken,getMessages)

export default messageRoute;