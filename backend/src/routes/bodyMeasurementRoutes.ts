import express from 'express';
import { BodyMeasurementController } from '../controllers/bodyMeasurementController';
import { validateMeasurements } from '../middleware/measurementValidation';
import { auth } from '../middleware/auth';

const router = express.Router();
const bodyMeasurementController = new BodyMeasurementController();

//all routes will use auth middleware
router.post(
    '/',
    auth,
    validateMeasurements,
    (req, res) => bodyMeasurementController.addMeasurement(req, res)
);

// router.get(
//     '/history/:stylePreferenceId',
//     auth,
//     bodyMeasurementController.getMeasurementHistory.bind(bodyMeasurementController)
// );

// router.get(
//     '/latest/:stylePreferenceId',
//     auth,
//     bodyMeasurementController.getLatestMeasurement.bind(bodyMeasurementController)
// );

export default router;

