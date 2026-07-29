import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addAccount, disconnectAccount, getAccounts } from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.get('/', protect, getAccounts)
accountRouter.post('/', protect, addAccount)
accountRouter.delete('/:id', protect, disconnectAccount)

export default accountRouter