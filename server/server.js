import "dotenv/config";
import express from 'express';
import cors from "cors";
import ConnectDB from "./src/config/db.js";

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is Live!');
});
//Global Error Handler
app.use( (err, req, res , next) => {
    console.error(err);
    res.status(500).send(err?.message)
})

app.listen(port, () => {
    ConnectDB()
    console.log(`Server is running at http://localhost:${port}`);
});