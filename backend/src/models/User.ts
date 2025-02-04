import mongoose, {Schema} from 'mongoose';
import {IUser} from '../types/user';
import { IStylePreference } from '../types/stylePreferences';

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true},
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    stylePreferenceId: {type: String, default: null // Set to null initially or generate a default if needed
    }
}, {
    timestamps: true // automatically adds createdAt and updatedAt fields
});

export const User = mongoose.model<IUser>('User', userSchema);