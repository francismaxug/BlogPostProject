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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("./userModel"));
const commentModel_1 = __importDefault(require("./commentModel"));
const blogModel_1 = __importDefault(require("./blogModel"));
dotenv_1.default.config();
let connected = false;
const connectDB = (db) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(db.uri || "");
        connected = true;
        //------------create collections-------------
        yield userModel_1.default.createCollection();
        yield commentModel_1.default.createCollection();
        yield blogModel_1.default.createCollection();
        console.log(`MongoDB Connected`);
        return {
            user: userModel_1.default,
            comment: commentModel_1.default,
            blog: blogModel_1.default
        };
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
});
exports.default = connectDB;
