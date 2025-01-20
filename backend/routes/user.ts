import express from "express";
import client from "../db";
import bcrypt from "bcrypt";
import {getToken} from "../token";
import jwt, {JwtPayload} from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            res.status(401).json({success: false, message: "Username and password is required"});
            return;
        }

        const user = await client.query('SELECT * FROM users where name = $1', [name]);


        if (user.rows.length > 0) {
            res.status(401).json({
                success: false,
                message: 'user already exists'
            });
            return;
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const result = await client.query(
            'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id',
            [name, hashPassword]
        );

        const userId = result.rows[0].id;

        const token = getToken(userId);

        const userWithToken = await client.query(
            'UPDATE users SET token = $1 WHERE id = $2 RETURNING name, token',
            [token, userId]
        );

        res.status(201).json(userWithToken.rows[0]);
    } catch (e) {
        res.status(500).json({success: false, message: "Server Error"});
        return;
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const {name, password} = req.body;

        if (!name || !password) {
            res.status(401).json({success: false, message: "Username and password is required"});
            return;
        }

        const user = await client.query('SELECT * FROM users WHERE name = $1', [name]);

        if (user.rows.length === 0) {
            res.status(401).json({success: false, message: "User not exists"});
            return;
        }

        const checkPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!checkPassword) {
            res.status(401).json({success: false, message: "Password is incorrect"});
            return;
        }

        const token = getToken(user.rows[0].id);

        const updatedUserToken = await client.query('UPDATE users SET token = $1 WHERE id = $2 RETURNING name, token', [token, user.rows[0].id])

        res.status(200).json(updatedUserToken.rows[0]);

    } catch (e) {
        res.status(500).json({success: false, message: "Server Error"});
        return;
    }
});

userRouter.post("/logout", async (req, res) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            res.status(401).json({success: false, message: "No token provided"});
            return;
        }

        if (!process.env.SECRET_KEY_IS) {
            res.status(500).json({ success: false, message: "Server Error" });
            return;
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_IS) as JwtPayload;
        const userId: string = decoded.id;

        const newToken = getToken(userId);

        const user = await client.query('UPDATE users SET token = $1 WHERE id = $2 RETURNING *', [newToken, userId]);

        res.status(200).json({
            success: true,
            message: `Logout successfully`,
            user: user.rows[0]
        })
    } catch (e) {
      res.status(500).json({success: false, message: "Server Error"});
    }
})


export default userRouter;