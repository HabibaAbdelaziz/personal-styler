export interface IStylePreference {
    id?: string;
    userId: string;
    bodyShape: string;
    colorPreferences: string[];
    styleTypes: string[];
    occasionPreferences: string[];
    updatedAt?: Date;
}

// Type definitions
export type BodyShape = 'hourglass' | 'pear' | 'rectangle' | 'apple' | 'inverted-triangle';
export type StyleType = 'casual' | 'formal' | 'business' | 'bohemian' | 'streetwear' | 'minimalist';
export type Occasion  = 'everyday' | 'work' | 'formal' | 'party' | 'sports' | 'vacation';