import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import fileUpload from 'express-fileupload';
import os from 'os';
import path from 'path';

import { dbConnection } from './lib/db.js';

import { userRoutes } from './routes/userRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { songRoutes } from './routes/songRoutes.js';
import { albumRoutes } from './routes/albumRoutes.js';
import { statsRoutes } from './routes/statsRoutes.js';

import { clerkMiddleware } from '@clerk/express';
import { initSocket } from './lib/socket.io.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

const httpServer = createServer(app);
initSocket(httpServer);
dbConnection();

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

app.use(userRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(songRoutes);
app.use(albumRoutes);
app.use(statsRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// TODO: socket.io for chatting and realtime activity
