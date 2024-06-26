"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidator = exports.commentValidator = exports.userRegisterValidator = exports.userLoginValidator = void 0;
//----------JOI VALIDATOR TO VALIDATE USER INPUTS-----------------
const joi_1 = __importDefault(require("joi"));
//-------------------VALIDATE USER INPUTS---------------------
const validateUserRegister = (schema) => (payload) => schema.validate(payload, { abortEarly: true });
const userValidationRegister = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "gh"] }
    })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .required()
});
const userRegisterValidator = validateUserRegister(userValidationRegister);
exports.userRegisterValidator = userRegisterValidator;
const validateUserLogin = (schema) => (payload) => schema.validate(payload, { abortEarly: true });
const userValidationLogin = joi_1.default.object({
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "gh"] }
    })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .required()
});
const userLoginValidator = validateUserLogin(userValidationLogin);
exports.userLoginValidator = userLoginValidator;
//-------------------VALIDATE BLOG INPUTS---------------------
const validateBlog = (schema) => (payload) => schema.validate(payload, { abortEarly: true });
const blogValidation = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required()
});
const blogValidator = validateBlog(blogValidation);
exports.blogValidator = blogValidator;
//-------------------VALIDATE COMMENT INPUTS---------------------
const validateComment = (schema) => (payload) => schema.validate(payload, { abortEarly: true });
const commentValidation = joi_1.default.object({
    comment: joi_1.default.string().required()
});
const commentValidator = validateComment(commentValidation);
exports.commentValidator = commentValidator;
