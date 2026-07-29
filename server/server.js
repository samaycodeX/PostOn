import "dotenv/config";
import express from 'express';
import cors from "cors";
import ConnectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.route.js";
import socialAuthRouter from "./src/routes/socialAuth.route.js";
import accountRouter from "./src/routes/account.route.js";
import postRouter from "./src/routes/post.route.js";

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

// Router
app.get('/', (req, res) => {
    res.send('Server is Live!');
});
app.use("/api/auth", authRouter)
app.use("/api/oauth", socialAuthRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/posts", postRouter)


//Global Error Handler
app.use( (err, req, res , next) => {
    console.error(err);
    res.status(500).send(err?.message)
})

app.listen(port, () => {
    ConnectDB()
    console.log(`Server is running at http://localhost:${port}`);
});