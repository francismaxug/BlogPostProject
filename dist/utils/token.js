"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user, res) => {
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRESIN)) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "none"
        // maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return;
};
exports.default = generateToken;
