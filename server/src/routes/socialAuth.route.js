import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { generateAuthUrl, syncAccounts } from "../controllers/socialAuth.controller.js";

const socialAuthRouter = Router();

socialAuthRouter.get("/:platform/url", protect, generateAuthUrl);
socialAuthRouter.get("/sync",protect ,syncAccounts);


export default socialAuthRouter;