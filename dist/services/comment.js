"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const app_1 = require("../types/app");
const appError_1 = __importDefault(require("../utils/appError"));
class CommentServices extends app_1.IAppService {
    constructor(context) {
        super(context);
        this.createComment = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("seen");
                const newComment = yield this.queryDB.comment.create(input);
                return {
                    message: "Comment created successfully",
                    comment: newComment
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.getCommentsByPost = (postId, page, limit) => __awaiter(this, void 0, void 0, function* () {
            try {
                const totalComments = yield this.queryDB.comment.countDocuments({
                    post: postId
                }); // Count total comments for this post
                const comments = yield this.queryDB.comment
                    .find({ post: postId })
                    .populate("author")
                    .skip((page - 1) * limit) // Calculate skip value
                    .limit(limit) // Limit the number of comments
                    .sort({ createdAt: -1 });
                return {
                    comments,
                    totalPages: Math.ceil(totalComments / limit), // Calculate total pages
                    currentPage: page
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.deleteComment = (commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.queryDB.comment.findByIdAndDelete(commentId);
                if (!comment) {
                    throw (0, appError_1.default)("Comment not found", 404);
                }
                return {
                    message: "Comment deleted successfully",
                    deletedComment: comment
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.CommentServices = CommentServices;
