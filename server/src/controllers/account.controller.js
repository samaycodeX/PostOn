import zernio from "../config/zernio.js";
import { Account } from "../models/account.model.js"
import { Response } from "../services/customResponse.js";

// Get all accounts
//GET /api/accounts
export const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.user._id });
        return Response(res, 200, true, "Here's the all accounts", accounts)
    } catch (error) {
        return Response(res, 500, false)
    }
}
 
//Add account
//POST /api/addAccount
export const addAccount = async (req, res) => {
    try { 
        const { platform, handle, avatarutl } = req.body;

        const account = await Account.create({
            user: req.user._id,
            platform, handle, avatarutl
        })
        return Response(res, 201, true, "Account Successfully Added", account)

    } catch (error) {
        return Response(res, 500, false)
    }
}


//Disconnect account
//DELETE /api/accounts/:id
export const disconnectAccount = async (req, res) => {
    try {
        const account = await Account.findOne({
            user: req.user._id,
            _id: req.params.id,
        })
        if (!account) {
            return Response(res, 404, false, "Account not found")
        }

        if (account.zernioAccountId) {
            try {
                await zernio.accounts.deleteAccount({
                    path: { accountId: account.zernioAccountId }
                })
            } catch (error) {
                return Response(res, 500, false)
            }
        }

        await account.deleteOne()
        return Response(res, 201, true, "Account Successfully Disconnected")

    } catch (error) {
        return Response(res, 500, false)
    }
}