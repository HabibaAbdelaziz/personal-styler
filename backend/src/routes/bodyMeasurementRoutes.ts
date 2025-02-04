import express, { Request, Response} from 'express';
import { BodyMeasurementController } from '../controllers/bodyMeasurementController';
import { validateMeasurements } from '../middleware/measurementValidation';
import { auth } from '../middleware/auth';

const router = express.Router();
const bodyMeasurementController = new BodyMeasurementController();

//all routes will use auth middleware
router.post(
    '/', 
    auth, //Auth middleware
    validateMeasurements, // validate middleware
    (req: Request, res: Response, next: Function) => {
        console.log('Request to add new body measurement: ', req.body);
        next();
    },
    bodyMeasurementController.addMeasurement.bind(bodyMeasurementController)
);

// Get body measurement history by stylePreferenceId
router.get(
    '/history/:stylePreferenceId',
    auth,
    (req: Request, res: Response, next: Function) => {
        console.log('Request to get measurement history for stylePreferenceId: ', req.params.stylePreferenceId);
        next();
    },
    bodyMeasurementController.getMeasurementHistory.bind(bodyMeasurementController)
);

// Get latest body measurement by stylePreferenceId
router.get(
    '/latest/:stylePreferenceId',
    auth,
    (req: Request, res: Response, next: Function) => {
        console.log('Request to get latest measurement for stylePreferenceId:', req.params.stylePreferenceId);
        next();
    },
    bodyMeasurementController.getLatestMeasurement.bind(bodyMeasurementController)
);

export default router;

