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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            res.status(401).json({ success: false, message: "Username and password is required" });
            return;
        }
        const user = yield db_1.default.query('SELECT * FROM users where name = $1', [name]);
        if (user.rows.length > 0) {
            res.status(401).json({
                success: false,
                message: 'user already exists'
            });
            return;
        }
        const saltRounds = 10;
        const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const result = yield db_1.default.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id', [name, hashPassword]);
        const userId = result.rows[0].id;
        const token = (0, token_1.getToken)(userId);
        const userWithToken = yield db_1.default.query('UPDATE users SET token = $1 WHERE id = $2 RETURNING name, token', [token, userId]);
        res.status(201).json(userWithToken.rows[0]);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            res.status(401).json({ success: false, message: "Username and password is required" });
            return;
        }
        const user = yield db_1.default.query('SELECT * FROM users WHERE name = $1', [name]);
        if (user.rows.length === 0) {
            res.status(401).json({ success: false, message: {
                    user: 'User does not exist!'
                } });
            return;
        }
        const checkPassword = yield bcrypt_1.default.compare(password, user.rows[0].password);
        if (!checkPassword) {
            res.status(401).json({ success: false, message: {
                    password: 'Wrong Password!'
                } });
            return;
        }
        const token = (0, token_1.getToken)(user.rows[0].id);
        const updatedUserToken = yield db_1.default.query('UPDATE users SET token = $1 WHERE id = $2 RETURNING name, token', [token, user.rows[0].id]);
        res.status(200).json(updatedUserToken.rows[0]);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
userRouter.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get('Authorization');
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" });
            return;
        }
        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_IS);
        const userId = decoded.id;
        const newToken = (0, token_1.getToken)(userId);
        const user = yield db_1.default.query('UPDATE users SET token = $1 WHERE id = $2 RETURNING *', [newToken, userId]);
        res.status(200).json({
            success: true,
            message: `Logout successfully`,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
exports.default = userRouter;
