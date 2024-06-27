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
exports.BlogServices = void 0;
const app_1 = require("../types/app");
const appError_1 = __importDefault(require("../utils/appError"));
const handlePaginate_1 = __importDefault(require("../utils/handlePaginate"));
class BlogServices extends app_1.IAppService {
    constructor(context) {
        super(context);
        //---create a blog post------------
        this.createBlog = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newBlog = yield this.queryDB.blog.create(input);
                return {
                    message: "Blog post created successfully",
                    blog: newBlog
                };
            }
            catch (err) {
                throw err;
            }
        });
        //---get a single blog post------------
        this.getBlog = (blogId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this.queryDB.blog.findById(blogId).populate("author");
                if (!blog) {
                    throw (0, appError_1.default)("Blog post not found", 404);
                }
                return blog;
            }
            catch (err) {
                throw err;
            }
        });
        //---get-all blog-by-The --login-user---
        this.getMyBlogs = (queryString, userId) => __awaiter(this, void 0, void 0, function* () {
            const query = this.queryDB.blog.find({ author: userId }).populate("author");
            // Create an instance of handlePaginate
            const handlePaginate = new handlePaginate_1.default(query, queryString)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            const blogs = yield handlePaginate.query;
            const totalBlogs = blogs.length;
            const totalPages = Math.ceil(totalBlogs === 0
                ? 0
                : totalBlogs / (Number(queryString.limit) || handlePaginate.limit));
            const currentPage = Number(queryString === null || queryString === void 0 ? void 0 : queryString.page) || handlePaginate.page;
            return {
                blogs,
                totalPages,
                currentPage
            };
        });
        //---get all blog posts------------
        this.getAllBlogs = (queryString) => __awaiter(this, void 0, void 0, function* () {
            const query = this.queryDB.blog.find().populate("author");
            // Create an instance of APIFeatures
            const handlePaginate = new handlePaginate_1.default(query, queryString)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            const blogs = yield handlePaginate.query;
            const totalBlogs = yield this.queryDB.blog.countDocuments();
            const totalPages = Math.ceil(totalBlogs === 0
                ? 0
                : totalBlogs / (Number(queryString === null || queryString === void 0 ? void 0 : queryString.limit) || handlePaginate.limit));
            const currentPage = Number(queryString === null || queryString === void 0 ? void 0 : queryString.page) || handlePaginate.page;
            return {
                blogs,
                totalPages,
                currentPage
            };
        });
        //----update blog post--------------------
        this.updateBlog = (blogId, authorId, input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this.queryDB.blog.findById(blogId);
                if (!blog) {
                    throw (0, appError_1.default)("Blog post not found", 404);
                }
                if (blog.author.toString() !== authorId) {
                    throw (0, appError_1.default)("Unauthorized", 403);
                }
                const updatedBlog = yield this.queryDB.blog.findByIdAndUpdate(blogId, Object.assign({}, input), { new: true });
                return {
                    message: "Blog post updated successfully",
                    blog: updatedBlog
                };
            }
            catch (err) {
                throw err;
            }
        });
        //-------delete blog post----------------
        this.deleteBlog = (blogId, authorId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this.queryDB.blog.findById(blogId);
                if (!blog) {
                    throw (0, appError_1.default)("Blog post not found", 404);
                }
                if (blog.author.toString() !== authorId.toString()) {
                    throw (0, appError_1.default)("Unauthorized", 403);
                }
                yield this.queryDB.blog.findByIdAndDelete(blogId);
                return {
                    message: "Blog post deleted successfully"
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.BlogServices = BlogServices;
