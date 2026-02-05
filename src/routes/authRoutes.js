import { Router } from 'express';
import { authCallback } from '../controllers/authController.js';

export const authRoutes = Router();

authRoutes.post('/authCallback', authCallback);
