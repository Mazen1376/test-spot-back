import { Server } from 'socket.io';
import { messageModel } from '../models/messageModel.js';

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    },
  });

  const userSockets = new Map();
  const userActivities = new Map();

  io.on('connection', (socket) => {
    socket.on('user_connected', (userId) => {
      console.log('User joined:', userId, 'with socket:', socket.id);

      if (!userSockets.has(userId)) {
        userSockets.set(userId, new Set());
      }
      userSockets.get(userId).add(socket.id);
      userActivities.set(userId, 'Idle');

      io.emit('user_connected', userId);

      socket.emit('users_online', Array.from(userSockets.keys()));
      io.emit('users_activities', Array.from(userActivities.entries()));
    });

    socket.on('update_activity', (data) => {
      const { userId, activity } = data;
      console.log('Activity update:', userId, activity);
      userActivities.set(userId, activity);
      io.emit('activity_updated', { userId, activity });
    });

    socket.on('disconnect', () => {
      let disconnectedUserId;
      for (const [userId, sockets] of userSockets.entries()) {
        if (sockets.has(socket.id)) {
          disconnectedUserId = userId;
          sockets.delete(socket.id);
          if (sockets.size === 0) {
            userSockets.delete(userId);
            userActivities.delete(userId);
          }
          break;
        }
      }

      if (disconnectedUserId) {
        if (!userSockets.has(disconnectedUserId)) {
          io.emit('user_disconnected', disconnectedUserId);
          io.emit('users_activities', Array.from(userActivities.entries()));
        }
      }
    });

    socket.on('send_message', async (data) => {
      console.log('Incoming message event:', data);
      try {
        const { senderId, receiverId, content } = data;

        if (!senderId || !receiverId || !content) {
          return console.error('Missing fields in message:', {
            senderId,
            receiverId,
            content,
          });
        }

        console.log('Attempting to save message to DB...');
        const message = await messageModel.create({
          senderId,
          receiverId,
          content,
        });

        console.log('Message stored successfully:', message._id);

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          console.log('Forwarding to recipient:', receiverId);
          io.to(receiverSocketId).emit('message_received', message);
        }

        socket.emit('message_sent', message);
      } catch (error) {
        console.error('SERVER SOCKET ERROR (send_message):', error);
      }
    });
  });
};

// listen server to client -> socket.on()
// listen client ro server -> socket.on()

// send server to client -> io.emit()
// send client ro server -> socket.emit()

// socket.emit() -> socket.on() -> io.emit()   -> socket.on()
// client send -> server listen -> server send -> client listen
