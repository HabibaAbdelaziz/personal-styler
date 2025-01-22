import {Request, Response} from 'express';
import { BodyMeasurementService } from '../services/bodyMeasurementService';

export class BodyMeasurementController {
    private bodyMeasurementService: BodyMeasurementService;

    constructor(){
        this.bodyMeasurementService = new BodyMeasurementService();
    }

    async addMeasurement(req: Request, res: Response): Promise<any>{
        try {
            const measurement = await this.bodyMeasurementService.addMeasurement({
                stylePreferenceId: req.body.stylePreferenceId,
                height: req.body.height,
                weight: req.body.weight,
                bust: req.body.bust,
                waist: req.body.waist,
                hips: req.body.hips,
                age: req.body.age
            });

            return res.status(201).json({
                success: true,
                message: 'Measurements are successfully',
                data: measurement
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: 'Failed to add measurements.',
                error: error.message
            });
        }
    }

    async getMeasurementHistory(req: Request, res: Response): Promise<any> {
        try {
            const history = await this.bodyMeasurementService.getMeasurementHistory(
                req.params.stylePreferenceId
            );

            return res.status(200).json({
                success: true,
                data: history
            });
        } catch (error: any){
            return res.status(400).json({
                success: false,
                message: 'Failed to get measurement history',
                error: error.message
            });
        }
    }

    async getLatestMeasurement(req: Request, res: Response): Promise<any>{
        try {
            const measurement = await this.bodyMeasurementService.getLatestMeasurement(
                req.params.stylePreferenceId
            );

            return res.status(200).json({
                success: true,
                data: measurement
            });
        } catch (error: any){
            return res.status(400).json({
                success: false,
                message: 'Failed to get latest measurements.',
                error: error.message
            });
        }
    }
}