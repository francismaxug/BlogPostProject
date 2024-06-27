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
exports.getAllMyBlogPost = exports.deleteBlogPost = exports.updateBlogPost = exports.getAllBlogPost = exports.getAblogPost = exports.createBlogPost = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appValidation_1 = require("../validators/appValidation");
const appError_1 = __importDefault(require("../utils/appError"));
//-------create a Blog--------
const createBlogPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, content } = req.body;
    //------get user_id from middleware---------
    const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { error } = (0, appValidation_1.blogValidator)(req.body);
    if (error) {
        const errorInputs = error.details[0].message;
        console.log(errorInputs);
        return next((0, appError_1.default)(errorInputs, 400));
    }
    const blog = yield ((_b = req.context.services) === null || _b === void 0 ? void 0 : _b.blog.createBlog({
        title,
        content,
        author
    }));
    // console.log(blog)
    return res.status(200).json(blog);
}));
exports.createBlogPost = createBlogPost;
//------------Get a blog--------------
const getAblogPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogId = req.params.id;
    const blog = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.blog.getBlog(blogId));
    // console.log(blog)
    return res.status(200).json(blog);
}));
exports.getAblogPost = getAblogPost;
//---get all user blog post----------------
const getAllMyBlogPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //------get user_id from middleware---------
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const allBlogs = yield ((_b = req.context.services) === null || _b === void 0 ? void 0 : _b.blog.getMyBlogs(req.query, userId.toString()));
    // console.log(allBlogs)
    return res.status(200).json(allBlogs);
}));
exports.getAllMyBlogPost = getAllMyBlogPost;
//-----Get-all-blog-Post-----------------
const getAllBlogPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const allBlogs = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.blog.getAllBlogs(req.query));
    // console.log(allBlogs)
    return res.status(200).json(allBlogs);
}));
exports.getAllBlogPost = getAllBlogPost;
//---update-blogPost------------
const updateBlogPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blogId = req.params.id;
    const { title, content } = req.body;
    //------get user_id from middleware---------
    const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    //---update blog---------------
    const updatedBlog = yield ((_b = req.context.services) === null || _b === void 0 ? void 0 : _b.blog.updateBlog(blogId, author.toString(), {
        title,
        content,
        author
    }));
    // console.log(updatedBlog)
    return res.status(200).json(updatedBlog);
}));
exports.updateBlogPost = updateBlogPost;
//------delete blog--------------
const deleteBlogPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blogId = req.params.id;
    //------get user_id from middleware---------
    const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    //---update blog---------------
    const deleteBlgMessage = yield ((_b = req.context.services) === null || _b === void 0 ? void 0 : _b.blog.deleteBlog(blogId, author.toString()));
    // console.log(deleteBlgMessage)
    return res.status(200).json(deleteBlgMessage);
}));
exports.deleteBlogPost = deleteBlogPost;
