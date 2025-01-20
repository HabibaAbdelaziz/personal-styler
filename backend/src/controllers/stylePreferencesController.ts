import { Request, Response} from 'express';
import { StylePreferenceService } from '../services/stylePreferenceService';

export class StylePreferenceController{
    private stylePreferenceService: StylePreferenceService;

    constructor(){
        this.stylePreferenceService = new StylePreferenceService();
    }

    async createPreference(req: Request, res: Response): Promise<any> {
        try{
            const preference = await this.stylePreferenceService.createPreference({
                userId: req.user.id,
                ...req.body
            });

            return res.status(201).json({
                success: true,
                message: 'Style preferences created successfully',
                data: preference
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create style preferences',
                error: error.message
            });
        }
    }

    async updatePreference(req: Request, res: Response): Promise<any> {
        try {
            const preference = await this.stylePreferenceService.updatePreference(
                req.user.id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: 'Style preferences updated successfully',
                data: preference
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: 'Failed to update style preferences',
                error: error.message
            });
        }
    }

    async getPreference(req: Request, res: Response): Promise<any> {
        try {
            const preference = await this.stylePreferenceService.getPreference(req.user.id);

            return res.status(200).json({
                success: true,
                data: preference
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: 'Failed to get style preferences',
                error: error.message
            });
        }
    }
}