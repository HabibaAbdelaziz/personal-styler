import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/User';

//middleware to protect certain routes

// extend express request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
            token?: string;
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Auth Header:', req.header('Authorization')); // Debug log
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer', '');

        console.log('Extracted Token:', token); // Debug log

        if(!token){
            throw new Error("No token provided");
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        console.log('Decoded Token:', decoded); // Debug log

        //find user
        const user = await User.findById((decoded as any).userId).select('-password');
        console.log('Found User:', user); // Debug log

        if(!user){
            throw new Error('User not found');
        }

        // add user to request
        req.user = user;
        req.token = token;
        next();
    } catch(error){
        console.error('Auth Error:', error); // Debug log
        res.status(401).json({ message: 'Please authenticate'});
    }
};