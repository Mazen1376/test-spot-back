import { clerkClient } from '@clerk/express';

export const requireAuth = async (req, res, next) => {
  try {
    if (!req.auth.userId) {
      return res.status(402).json({ message: 'Unauthorized (user)' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'error in requireAuth' });
  }
};
export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.emailAddresses[0].emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: 'Unauthorized (admin)' });
    }
    next();
  } catch (error) {
    console.error('Error in requireAdmin:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
