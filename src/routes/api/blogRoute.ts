import { Router } from "express"
import {
  createBlogPost,
  updateBlogPost,
  getAblogPost,
  getAllBlogPost,
  deleteBlogPost,
  getAllMyBlogPost
} from "../../controllers/blogController"
import { protect } from "../../middleware/auth"

const router = Router()
router.post("/create-blog", protect, createBlogPost)
router.get("/getAllBlogs", protect, getAllBlogPost)
router.get("/getMyBlogs", protect, getAllMyBlogPost)
router
  .route("/:id")
  .get(protect, getAblogPost)
  .patch(protect, updateBlogPost)
  .delete(protect, deleteBlogPost)
export default router
