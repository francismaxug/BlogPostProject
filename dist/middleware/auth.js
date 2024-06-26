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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../utils/appError"));
const protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req)
    let token;
    //--get the token-----
    token = req.cookies.jwt;
    // console.log(token)
    if (!token)
        return next((0, appError_1.default)("no token found", 404));
    const decodeUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    console.log(decodeUser);
    if (!decodeUser)
        return next((0, appError_1.default)("unauthorized", 404));
    const currentUser = yield userModel_1.default.findById(decodeUser._id).select("-password");
    console.log(currentUser);
    if (!currentUser)
        return next((0, appError_1.default)("no token found", 404));
    req.user = currentUser;
    next();
}));
exports.protect = protect;
