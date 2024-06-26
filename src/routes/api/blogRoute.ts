import { Router } from "express"
import {
  createBlogPost,
  updateBlogPost,
  getAblogPost,
  getAllBlogPost,
  deleteBlogPost
} from "../../controllers/blogController"
import { protect } from "../../middleware/auth"

const router = Router()
router.post("/create-blog", protect, createBlogPost)
router.get("/getAllBlogs", protect, getAllBlogPost)
router
  .route("/:id")
  .get(protect, getAblogPost)
  .patch(protect, updateBlogPost)
  .delete(protect, deleteBlogPost)
export default router
