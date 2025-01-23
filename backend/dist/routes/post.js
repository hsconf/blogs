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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postRouter = express_1.default.Router();
postRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, media } = req.body;
        const token = req.get("Authorization");
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" });
            return;
        }
        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }
        if (!message) {
            res.status(400).send({
                status: "error",
                message: "Message is required",
            });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_IS);
        const id = decodedToken.id;
        const post = yield db_1.default.query('INSERT INTO posts (message, media, author_id) VALUES ($1, $2, $3) RETURNING *', [message, media, id,]);
        res.json(post.rows[0]);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_1.default
            .query('SELECT posts.id, posts.message, posts.media, posts.created_at, users.name FROM posts INNER JOIN users ON posts.author_id = users.id');
        if (posts.rows.length === 0) {
            res.status(404).json({ success: false, message: "No posts found." });
            return;
        }
        res.status(200).json(posts.rows.reverse());
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
postRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, media } = req.body;
        const token = req.get("Authorization");
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" });
            return;
        }
        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_IS);
        const id = decodedToken.id;
        const post = yield db_1.default
            .query('UPDATE posts SET message = $1, media = $2 WHERE posts.author_id = $3 AND posts.id = $4 RETURNING *', [message, media, id, req.params.id]);
        res.json(post.rows[0]);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
postRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get("Authorization");
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" });
            return;
        }
        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_IS);
        const id = decodedToken.id;
        const result = yield db_1.default.query('DELETE FROM posts WHERE id = $1 AND author_id = $2 RETURNING *', [req.params.id, id]);
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, message: "No access" });
            return;
        }
        res.json({ success: true, message: "Post deleted successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
}));
exports.default = postRouter;
