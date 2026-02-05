import { Router } from 'express';
import { getAllAlbums, getAlbum } from '../controllers/albumController.js';

export const albumRoutes = Router();

albumRoutes.get('/api/albums', getAllAlbums);
albumRoutes.get('/api/album/:albumId', getAlbum);
