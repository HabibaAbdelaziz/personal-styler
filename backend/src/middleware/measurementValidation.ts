import {Request, Response, NextFunction} from 'express';
import { MEASUREMENT_RANGES } from '../types/bodyMeasurement';

export const validateMeasurements = (req: Request, res: Response, next: NextFunction): void => {
    try {
        console.log('Validating measurements input:', req.body);
        const { height
            // , weight, bust, waist, hips, age
        } = req.body;

        // check if all req fiels exist
        if ( !height 
            // || !weight || !bust||!waist||!hips||!age
        ){
            console.log('Missing height field');
            res.status(400).json({
                bustuccess: false,
                message: 'Height is required'
                // 'All measurements are required: height, weight, bust, waist, hips and age.'
            });
            return;
        }

        if (height < MEASUREMENT_RANGES.height.min || height > MEASUREMENT_RANGES.height.max){
            res.status(400).json({
                success: false,
                message: `Height must be between ${MEASUREMENT_RANGES.height.min} and ${MEASUREMENT_RANGES.height.max} cm`
            });
            return;
        }

        // if (age < MEASUREMENT_RANGES.age.min || age > MEASUREMENT_RANGES.age.max){
        //     res.status(400).json({
        //         success: false,
        //         message: `Age must be between ${MEASUREMENT_RANGES.age.min} and ${MEASUREMENT_RANGES.age.max} years.`
        //     });
        //     return;
        // }

        

        // if (weight < MEASUREMENT_RANGES.weight.min || weight > MEASUREMENT_RANGES.weight.max){
        //     res.status(400).json({
        //         success: false,
        //         message: `Weight must be between ${MEASUREMENT_RANGES.weight.min} and ${MEASUREMENT_RANGES.weight.max} kg.`
        //     });
        //     return;
        // }

        // if (bust < MEASUREMENT_RANGES.bust.min || bust > MEASUREMENT_RANGES.bust.max){
        //     res.status(400).json({
        //         success: false,
        //         message: `bust must be between ${MEASUREMENT_RANGES.bust.min} and ${MEASUREMENT_RANGES.bust.max} cm.`
        //     });
        //     return;
        // }

        // if (waist < MEASUREMENT_RANGES.waist.min || waist > MEASUREMENT_RANGES.waist.max){
        //     res.status(400).json({
        //         success: false,
        //         message: `waist must be between ${MEASUREMENT_RANGES.waist.min} and ${MEASUREMENT_RANGES.waist.max} cm.`
        //     });
        //     return;
        // }

        // if (hips < MEASUREMENT_RANGES.hips.min || hips > MEASUREMENT_RANGES.hips.max){
        //     res.status(400).json({
        //         success: false,
        //         message: `hips must be between ${MEASUREMENT_RANGES.hips.min} and ${MEASUREMENT_RANGES.hips.max} cm.`
        //     });
        //     return;
        // }
        
        console.log('Validation passed for height:', height);
        // contin with next middleware if all validations pass
        next();
    } catch (error){
        console.error('Validation error:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid measurement data.'
        });
        return;
    }
};