import { Router } from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getUserMessages } from '../controllers/userController.js';

export const userRoutes = Router();

userRoutes.get('/users', getAllUsers);
userRoutes.get('/user/messages/:id', requireAuth, getUserMessages);
//userRoutes.get('/user/friends/:id', requireAuth, getUserFriends);
