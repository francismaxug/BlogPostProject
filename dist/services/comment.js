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
const handlePaginate_1 = __importDefault(require("../utils/handlePaginate"));
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
        this.getCommentsByPost = (queryString, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.queryDB.comment
                    .find({ post: postId })
                    .populate("author");
                const handlePaginate = new handlePaginate_1.default(query, queryString)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();
                const comments = yield handlePaginate.query;
                const totalComments = comments.length;
                const totalPages = Math.ceil(totalComments === 0
                    ? 0
                    : totalComments / (Number(queryString.limit) || handlePaginate.limit));
                const currentPage = Number(queryString === null || queryString === void 0 ? void 0 : queryString.page) || handlePaginate.page;
                return {
                    comments,
                    totalPages,
                    currentPage
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
