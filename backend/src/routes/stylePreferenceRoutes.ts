import express from 'express';
import { StylePreferenceController } from '../controllers/stylePreferencesController';
import { auth } from '../middleware/auth';

const router = express.Router();
const stylePreferencesController = new StylePreferenceController();

// all routes wull use auth middleware since they're user-specific

// POST /api/style-preferences - create new style preferences
router.post(
    '/',
    auth,
    stylePreferencesController.createPreference.bind(stylePreferencesController)
);

// PUT /ai/style-preferences - Update style preferences
router.put(
    '/',
    auth,
    stylePreferencesController.updatePreference.bind(stylePreferencesController)
);

//GET /api/style-preferences - Get user's style preferences
router.get(
    '/',
    auth,
    stylePreferencesController.getPreference.bind(stylePreferencesController)
);

export default router;