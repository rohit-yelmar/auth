import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { request, response } from 'express';

const protect = AsyncHandler(async (req,res,next) => {
    let token;
    //possible bcz of cookie parser
    token = req.cookies.jwt;
    if(token){
        try {
            const decoded  = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Invalid Token');
            

        }
    }
    else{
        res.status(401);
        throw new Error('Not authorized');

    }
})
export {protect};