import { IUser } from '../types/user';
import { User } from '../models/User';
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    // func to create new user
    async createUser(userData: IUser): Promise<IUser> {
        try{
            // check if user already exists
            const existingUser = await User.findOne({email: userData.email});
            if (existingUser) {
                throw new Error('Email already registered');
            }
            
            // hash passwrd before saving
            const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the salt rounds, whcih determines the complexity of the hash.
            
            // create new user with hashed password
            const user = new User({
                ...userData,
                password: hashedPassword
            });
            // save user to database but wait until operation is complete before saving
            return await user.save();
        } catch (error: any) {
            throw new Error(error.message);
        }   
    }

    // Function to login user
    async loginUser(email: string, password: string): Promise<{user: IUser, token: string}>{
        try{
            //find user by email
            const user = await User.findOne({email});
            if(!user){
                throw new Error('User not found');
            }

            //chec password
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error('Invalid password');
            }

            // use JWT tokens (json web token) to securely transmit info as a json object
            const token = jwt.sign(
                {userId: user._id},
                process.constrainedMemory.JWT_SECRET || 'your-secret-key',
                {expiresIn: '24h'}
            );

            return {user, token};
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // func to get user by id
    async getUserById(userId: string): Promise<IUser | null>{
        try {
            // select('-password) means exclude password from the result when retrieving the user document from the database (mongodb)
            return await User.findById(userId).select('-password');
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    //func to update user
    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        try {
            // don't allow email updates for security
            if (updateData.email){
                delete updateData.email;
            }

            //if updating psswrd, hash it first. salt is 10
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            return await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true }
            ).select('-password');
        } catch(error: any){
            throw new Error(error.message);
        }
    }

}