"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../../controllers/blogController");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create-blog", auth_1.protect, blogController_1.createBlogPost);
router.get("/getAllBlogs", auth_1.protect, blogController_1.getAllBlogPost);
router.get("/getMyBlogs", auth_1.protect, blogController_1.getAllMyBlogPost);
router
    .route("/:id")
    .get(auth_1.protect, blogController_1.getAblogPost)
    .patch(auth_1.protect, blogController_1.updateBlogPost)
    .delete(auth_1.protect, blogController_1.deleteBlogPost);
exports.default = router;
