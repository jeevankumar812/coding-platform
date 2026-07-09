import express from 'express';
import { changePassword, getProfile, loginUser, logoutUser, registerUser, updateProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',protect ,logoutUser);
router.get('/profile',protect,getProfile);
router.put('/profile',protect,updateProfile);
router.put('/change-password',protect,changePassword);


export default router;