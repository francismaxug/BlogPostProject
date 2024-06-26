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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServices = void 0;
const user_1 = require("./user");
const blog_1 = require("./blog");
const comment_1 = require("./comment");
const startServices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.UserServices(query);
        const blog = new blog_1.BlogServices(query);
        const comment = new comment_1.CommentServices(query);
        return { user, blog, comment };
    }
    catch (error) {
        throw error;
    }
});
exports.startServices = startServices;
