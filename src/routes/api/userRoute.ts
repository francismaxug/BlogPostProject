import {
  adminLogin,

} from "../../controllers/userController"
import express from "express"
import { protect } from "../../middleware/auth"
const router = express.Router()

router.post("/login", adminLogin)

export default router
