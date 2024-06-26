"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    comment: { type: String, required: [true, "content is a required field"] },
    author: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    post: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Blog" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Comment = mongoose_1.models.Comment ||
    (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
