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
exports.logout = exports.createUser = exports.userLogin = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = require("../utils/catchAsync");
const appValidation_1 = require("../validators/appValidation");
//-----------------login admin----------------------
const userLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    if (!email || !password) {
        return next((0, appError_1.default)("Please provide email and password", 400));
    }
    const { error } = (0, appValidation_1.userLoginValidator)({ email, password });
    console.log(error);
    if (error) {
        const errorInputs = error.details[0].message;
        console.log(errorInputs);
        return next((0, appError_1.default)(errorInputs, 400));
    }
    const user = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.user.login({
        email,
        password,
        res
    }));
    // console.log(user)
    return res.status(200).json(user);
}));
exports.userLogin = userLogin;
//-------create a User--------
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, password } = req.body;
    if (!email || !name) {
        return next((0, appError_1.default)("Please provide email and password", 400));
    }
    const { error } = (0, appValidation_1.userRegisterValidator)(req.body);
    console.log(error);
    if (error) {
        const errorInputs = error.details[0].message;
        console.log(errorInputs);
        return next((0, appError_1.default)(errorInputs, 400));
    }
    const user = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.user.createUser(Object.assign(Object.assign({}, req.body), { res })));
    // console.log(user)
    return res.status(200).json(user);
}));
exports.createUser = createUser;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", {
            expires: new Date(0)
        });
        res.status(200).json({
            status: "success",
            message: "Logout Successful"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
