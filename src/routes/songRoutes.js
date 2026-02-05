import { Router } from 'express';
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getSong,
  getTrendingSongs,
} from '../controllers/songController.js';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js';

export const songRoutes = Router();

songRoutes.get('/api/songs', requireAuth, requireAdmin, getAllSongs);
songRoutes.get('/api/songs/featured', getFeaturedSongs);
songRoutes.get('/api/songs/trending', getTrendingSongs);
songRoutes.get('/api/songs/made-for-you', getMadeForYouSongs);
songRoutes.get('/api/songs/:songId', getSong);
