import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Response } from "../services/customResponse.js";



export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            return Response(res, 401, false, error?.message || "Not authorized, token failed");
        }
    }
    else {
        return Response(res, 401, false, "Not authorized, token failed");
    }
}