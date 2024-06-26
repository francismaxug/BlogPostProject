import { Router } from "express"
import { createUser, userLogin, logout } from "../../controllers/userController"

const router = Router()

router.post("/register", createUser)
router.post("/login", userLogin)
router.get("/logout", logout)
export default router
