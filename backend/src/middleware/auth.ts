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
        // Log initial request state
        console.log('Initial request state:', {
            headers: req.headers,
            user: req.user
        });

        console.log('Auth Header:', req.header('Authorization')); // Debug log
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        console.log('Extracted Token:', token); // Debug log

        if(!token){
            throw new Error("No token provided");
        }

        // log jwt verif attempt
        console.log('Attempting to verify token with secret:',
            process.env.JWT_SECRET ? 'Secret exists' : 'No secret found');
        

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        console.log('Decoded Token:', decoded); // Debug log

        //find user
        const user = await User.findById((decoded as any).userId).select('-password');
        console.log('Found User:', user); // Debug log

        if(!user){
            throw new Error('User not found');
        }

        // log state bef adding user to req
        console.log('Request before adding user:', {
            user: req.user,
            token: req.token
        });

        // add user to request
        req.user = user;
        req.token = token;
        
        // log state after addig user
        console.log('Request after adding user: ', {
            user: req.user,
            token: req.token
        });
        
        next();

    } catch(error){
        console.error('Auth Error:', error); // Debug log
        res.status(401).json({ message: 'Please authenticate'});
    }
};