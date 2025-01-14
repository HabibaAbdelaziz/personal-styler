import mongoose, {Schema} from 'mongoose';
import {IUser} from '../types/user';

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true},
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    stylePreferences: {
        colors: [String],
        styles: [String]
    }
}, {
    timestamps: true // automatically adds createdAt and updatedAt fields
});

export const User = mongoose.model<IUser>('User', userSchema);