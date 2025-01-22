import express from "express";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/posts', postRouter);

const run = async () => {

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
};

void run().catch((err) => console.log(err));