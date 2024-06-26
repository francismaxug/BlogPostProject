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
exports.deleteComment = exports.getCommentByPost = exports.createComment = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appValidation_1 = require("../validators/appValidation");
const appError_1 = __importDefault(require("../utils/appError"));
//-------create a Comment--------
const createComment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req);
    const { comment } = req.body;
    console.log(comment);
    const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const postId = req.params.postId;
    console.log(author, postId);
    const { error } = (0, appValidation_1.commentValidator)(req.body);
    console.log(error);
    if (error) {
        const errorInputs = error.details[0].message;
        console.log(errorInputs);
        return next((0, appError_1.default)(errorInputs, 400));
    }
    console.log("see it");
    const createdComment = yield ((_b = req.context.services) === null || _b === void 0 ? void 0 : _b.comment.createComment({
        comment,
        author,
        post: postId
    }));
    console.log(createdComment);
    return res.status(200).json(createdComment);
}));
exports.createComment = createComment;
//-----getCommentByPost----------------
const getCommentByPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = req.params.postId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const getCommentbyPost = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.comment.getCommentsByPost(postId, page, limit));
    console.log(getCommentByPost);
    return res.status(200).json(getCommentbyPost);
}));
exports.getCommentByPost = getCommentByPost;
const deleteComment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const commentId = req.params.commentId;
    const deleteComment = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.comment.deleteComment(commentId));
    return res.status(200).json(deleteComment);
}));
exports.deleteComment = deleteComment;
