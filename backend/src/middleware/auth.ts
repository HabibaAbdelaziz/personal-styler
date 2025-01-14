import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/User';

//middleware to protect certain routes

// extend express request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer', '');

        if(!token){
            throw new Error();
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        //find user
        const user = await User.findById((decoded as any).userId).select('-password');

        if(!user){
            throw new Error();
        }

        // add user to request
        req.user = user;
        next();
    } catch(error){
        res.status(401).json({ message: 'Please authenticate'});
    }
};