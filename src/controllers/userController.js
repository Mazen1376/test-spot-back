import { messageModel } from '../models/messageModel.js';
import { userModel } from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  // get all friends not all users TODO
  // get messages TODO
  try {
    /* const currentUserId = req.auth.userId;
    const users = await userModel.find({ clerkId: { $ne: currentUserId } }); */
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting all users' });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const senderId = req.auth.userId;
    const receiverId = req.params.id;

    console.log('Fetching messages between:', { senderId, receiverId });

    if (!senderId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const messages = await messageModel
      .find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { receiverId: senderId, senderId: receiverId },
        ],
      })
      .sort({ createdAt: 1 });

    console.log(`Found ${messages.length} messages`);
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting user messages' });
  }
};
