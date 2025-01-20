import { IStylePreference } from "../types/stylePreferences";
import { StylePreference } from "../models/StylePreference";

export class StylePreferenceService {
    async createPreference(prefData: IStylePreference): Promise<IStylePreference> {
        try {
            //check if user already has preferences set
            const existingPreference = await StylePreference.findOne({ userId: prefData.userId});
            if (existingPreference) {
                throw new Error('Style preferences already exist for this user');
            }

            const preference = new StylePreference(prefData);
            return await preference.save();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updatePreference(userId: string, prefData: Partial<IStylePreference>): Promise<IStylePreference | null>{
        try {
            return await StylePreference.findOneAndUpdate(
                { userId},
                prefData,
                {new: true}
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getPreference(userId: string): Promise<IStylePreference | null> {
        try{
            return await StylePreference.findOne({userId});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}