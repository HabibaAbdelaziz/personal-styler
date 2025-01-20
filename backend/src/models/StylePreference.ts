import mongoose, {Schema} from 'mongoose';
import { IStylePreference } from '../types/stylePreferences';

const stylePreferenceSchema = new Schema<IStylePreference>({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    bodyShape: {
        type: String,
        required: true,
        enum: ['hourglass' , 'pear' , 'rectangle' , 'apple' , 'inverted-triangle']
    },
    colorPreferences: [{
        type: String,
        required: true
    }],
    styleTypes: [{
        type: String,
        required: true,
        enum: ['casual', 'formal', 'business' , 'bohemian',  'streetwear' , 'minimalist' ]
    }]
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

export const StylePreference = mongoose.model<IStylePreference>('StylePreference', stylePreferenceSchema);