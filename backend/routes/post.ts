import express from "express";
import client from "../db";
import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const postRouter = express.Router();

postRouter.post("/", async (req, res) => {
    try {
        const {message, media} = req.body;
        const token: string | undefined = req.get("Authorization");

        if (!token) {
            res.status(401).json({success: false, message: "No token provided"});
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

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_IS) as JwtPayload;

        const id = decodedToken.id

        const post = await client.query('INSERT INTO posts (message, media, author_id) VALUES ($1, $2, $3) RETURNING *', [message, media, id]);

        res.json(post.rows[0]);

    } catch (e) {
        console.log(e);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

postRouter.get("/", async (req, res) => {
    try {
        const posts = await client
            .query('SELECT posts.id, posts.message, posts.media, users.name FROM posts INNER JOIN users ON posts.author_id = users.id');

        if (posts.rows.length === 0) {
            res.status(404).json({success: false, message: "No posts found."});
            return;
        }

        res.status(200).json(posts.rows);

    } catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: "Server Error"});
        return;
    }
})

postRouter.put("/", async (req, res) => {
    try {
        const {message, media} = req.body;
        const token: string | undefined = req.get("Authorization");

        if (!token) {
            res.status(401).json({success: false, message: "No token provided"});
            return;
        }

        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_IS) as JwtPayload;

        const id = decodedToken.id

        const post = await client
            .query('UPDATE posts SET message = $1, media = $2 WHERE posts.author_id = $3 RETURNING *', [message, media, id]);

        res.json(post.rows[0]);

    } catch (e) {
        res.status(500).json({success: false, message: "Server Error"});
        return;
    }
})

postRouter.delete("/:id", async (req, res) => {
    try {
        const token: string | undefined = req.get("Authorization");

        if (!token) {
            res.status(401).json({success: false, message: "No token provided"});
            return;
        }

        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_IS) as JwtPayload;
        const id = decodedToken.id


        const result = await client.query('DELETE FROM posts WHERE id = $1 AND author_id = $2 RETURNING *', [req.params.id, id]);

        if (result.rowCount === 0) {
            res.status(404).json({ success: false, message: "No access" });
            return;
        }

        res.json({ success: true, message: "Post deleted successfully" });
    } catch (e) {
        res.status(500).json({success: false, message: "Server Error"});
        return;
    }
})

export default postRouter;