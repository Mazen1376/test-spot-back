import { Router } from 'express';
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from '../controllers/adminController.js';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js';

export const adminRoutes = Router();

adminRoutes.get('/api/admin/checkAdmin', requireAuth, requireAdmin, checkAdmin);

adminRoutes.post('/api/admin/songs', requireAuth, requireAdmin, createSong);
// adminRoutes.put("api/admin/songs", requireAuth, requireAdmin, updateSong);
adminRoutes.delete(
  '/api/admin/songs/:songId',
  requireAuth,
  requireAdmin,
  deleteSong
);

adminRoutes.post('/api/admin/album', requireAuth, requireAdmin, createAlbum);
adminRoutes.delete(
  '/api/admin/album/:albumId',
  requireAuth,
  requireAdmin,
  deleteAlbum
);
