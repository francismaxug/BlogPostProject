"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "title is a required field"] },
    content: { type: String, required: [true, "content is a required field"] },
    author: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Blog = mongoose_1.models.Blog || (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
