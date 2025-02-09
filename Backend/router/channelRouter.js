import express from "express"
import { verifyToken } from "../middleware/authMidlleware.js"
import { createChannel, getUserChannels } from "../controllers/channelControllers.js"

const channelRoute = express.Router()

channelRoute.post("/create-channel", verifyToken, createChannel)
channelRoute.get("/get-user-channel", verifyToken, getUserChannels)

export default channelRoute