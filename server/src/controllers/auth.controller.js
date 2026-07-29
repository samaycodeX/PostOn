import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Response } from "../services/customResponse.js";
import bcrypt from "bcrypt"
import { urlencoded } from "express";


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : "30d"
    })
}
// Register User

export const registerUser = async (req, res) => {
    try {
        const { name,email,password } = req.body;

        if(!name || !email || !password){
            return Response(res, 400, false, "Something Missing")
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return Response(res,400,false,"User Already Exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, email, hashedPassword
        })

        if(user) res.status(201).json({_id : user._id, name : user.name, email : user.email, token : generateToken(user._id) })
        else return Response(res, 400, false, "Invalid Data")

    } catch (error) {
        return Response(res, 500, false, "Server Error from Register")
    }
}

// login user

export const loginUser = async (req, res) => {
    try {
        const {email,password } = req.body;

        if(!email || !password){
            return Response(res, 400, false, "Something Missing")
        }

        const user = await User.findOne({email})
        if(!user){
            return Response(res,400,false,"User Not Exist")
        }

        const ComparePassword = await bcrypt.compare(password, user.password)
        if(!ComparePassword) return Response(res, 400, false, "Password not correct")

        if(user && ComparePassword) res.status(201).json({_id : user._id, name : user.name, email : user.email, token : generateToken(user._id) })
        else return Response(res, 400, false, "Incorrect email or password.")

    } catch (error) {
        return Response(res, 500, false, "Server Error from Register")
    }
}
