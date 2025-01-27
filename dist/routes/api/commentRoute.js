"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const commentsController_1 = require("../../controllers/commentsController");
const router = (0, express_1.Router)();
router.post("/:postId/create", auth_1.protect, commentsController_1.createComment);
router.get("/:postId/commentbypost", auth_1.protect, commentsController_1.getCommentByPost);
router.delete("/:commentId/delete", auth_1.protect, commentsController_1.deleteComment);
exports.default = router;
