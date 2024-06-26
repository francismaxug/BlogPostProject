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
exports.UserServices = void 0;
const app_1 = require("../types/app");
const appError_1 = __importDefault(require("../utils/appError"));
const token_1 = __importDefault(require("../utils/token"));
class UserServices extends app_1.IAppService {
    constructor(context) {
        super(context);
        this.createUser = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                //----check if useralready exist with email------
                const existingUser = yield this.queryDB.user.findOne({
                    email: input.email
                });
                if (existingUser) {
                    throw (0, appError_1.default)("User already exists", 400);
                }
                const user = yield this.queryDB.user.create(input);
                // token here
                (0, token_1.default)({ _id: user._id.toString() }, input.res);
                //--return a response-----
                return {
                    message: "User created successfully",
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.queryDB.user.findOne({
                    email: input.email
                });
                //----check if user exist with email------
                if (!user)
                    throw (0, appError_1.default)("Invalid Credentials", 404);
                const checkPassword = yield user.comparePasswords(input.password);
                //------check if password is correct------
                if (!checkPassword)
                    throw (0, appError_1.default)("Invalid Credentials", 404);
                //token here
                (0, token_1.default)({ _id: user._id.toString() }, input.res);
                return {
                    message: "Login successful",
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UserServices = UserServices;
