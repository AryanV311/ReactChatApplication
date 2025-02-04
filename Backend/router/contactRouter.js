import express from "express"
import { verifyToken } from "../middleware/authMidlleware.js"
import { searchContacts } from "../controllers/contactsController.js"

const contactRoute = express.Router()


contactRoute.post("/search",verifyToken, searchContacts )

export default contactRoute;