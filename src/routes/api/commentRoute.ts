import { Router } from "express"
import { protect } from "../../middleware/auth"
import {
  createComment,
  deleteComment,
  getCommentByPost
} from "../../controllers/commentsController"

const router = Router()

router.post("/:postId/create", protect, createComment)
router.get("/:postId/commentbypost", protect, getCommentByPost)
router.delete("/:commentId/delete", protect, deleteComment)

export default router
