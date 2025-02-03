import express from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

//==Public routes==
// route for user registration
router.post('/register', userController.register.bind(userController));
// route for user login
router.post('/login', userController.login.bind(userController));


//==Protected routes==
router.get('/profile', auth, (req, res) => {
    res.json({ user: req.user});
})

export default router;