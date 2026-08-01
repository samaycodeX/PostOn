import { Router } from "express"
import { protect } from "../middlewares/auth.middleware.js";
import { generatePost, getGenerations, getPosts, schedulePost } from "../controllers/post.controller.js";
import { uploadFiles } from "../config/multer.js";

const postRouter = Router();

postRouter.get("/", protect, getPosts);
postRouter.get("/generations", protect, getGenerations);
postRouter.post("/", protect, uploadFiles, schedulePost);
postRouter.post("/generate", protect, generatePost);

export default postRouter