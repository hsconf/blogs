import express from "express";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();
const port = 8001;

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);

const run = async () => {

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
};

void run().catch((err) => console.log(err));