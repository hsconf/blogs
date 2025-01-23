"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getToken = (id) => {
    if (!process.env.SECRET_KEY_IS) {
        throw new Error('Secret key is missing');
    }
    return jsonwebtoken_1.default.sign({ id, iat: Math.floor(Date.now() / 1000) }, process.env.SECRET_KEY_IS);
};
exports.getToken = getToken;
