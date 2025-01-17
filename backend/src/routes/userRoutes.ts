import express from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

//==Public routes==
// route for user registration
router.post('/register', (req, res) => userController.register(req, res));
// route for user login
router.post('/login', (req, res) => userController.login(req, res));


//==Protected routes==
router.get('/profile', auth, (req, res) => {
    res.json({ user: req.user});
})

export default router;