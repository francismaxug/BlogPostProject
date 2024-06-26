"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const developement_1 = require("./developement");
const production_1 = require("./production");
exports.config = process.env.NODE_ENV === "development" ? developement_1.devConfig : production_1.prodConfig;
