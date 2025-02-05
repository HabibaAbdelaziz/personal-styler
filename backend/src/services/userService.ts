import { IUser } from '../types/user';
import { User } from '../models/User';
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';
import { StylePreference } from '../models/StylePreference';


interface LoginResponse {
    user: IUser;
    token: string;
    stylePreferenceId: string;
}


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
    async loginUser(email: string, password: string): Promise<LoginResponse>{
        try{
            console.log('Attempting login for email', email);

            //find user by email
            const user = await User.findOne({email});
            console.log('Found user:', user? 'Yes': 'No');

            if(!user){
                console.log('User not found for email: ', email)
                throw new Error('User not found');
            }

            //chec password
            console.log('Checking password...')
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch? 'Yes': 'No')
            
            if(!isMatch){
                console.log('Password mismatch for user:', email);
                throw new Error('Invalid password');
            }
            console.log('User authenticated successfully');

            //find user's style pref id
            const stylePreference = await StylePreference.findOne({ userId: user._id})
            console.log('stylePreference:', stylePreference);
            console.log('User stylePreferenceId:', user.stylePreferenceId);
            
            // use JWT tokens (json web token) to securely transmit info as a json object
            const token = jwt.sign(
                {userId: user._id},
                process.env.JWT_SECRET || 'your-secret-key',
                {expiresIn: '24h'}
            );
            console.log('JWT token generated')

            return {
                user,
                token,
                stylePreferenceId: user.stylePreferenceId || ''
            };
        } catch (error: any) {
            console.error('Login error:', error.message);
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