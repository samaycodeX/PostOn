import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getActivity } from "../controllers/activitylog.controller.js";

const activityRouter = Router();

activityRouter.get("/", protect, getActivity);

export default activityRouter