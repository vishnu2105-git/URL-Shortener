// routes/userRoutes.js
import express from 'express';
import { createUser, getUserByEmail, getUserProfile} from '../Controllers/userController.js';
import { get } from 'mongoose';
import { isLoggedIn } from '../Middleware/authMiddleware.js';
const router = express.Router();

router.post('/', createUser);
router.get('/:email',getUserByEmail);
router.get('/profile/me',isLoggedIn, getUserProfile);




export default router;