import { userModel } from '../models/userModel.js';

export const authCallback = async (req, res) => {
  console.log('--- INCOMING AUTH CALLBACK REQUEST ---');
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    console.log('Auth callback received for user:', {
      firstName,
      lastName,
      id,
    });

    const user = await userModel.findOne({ clerkId: id });

    if (user) {
      console.log('User already exists in DB:', id);
      return res.json({ message: 'user already exists', user });
    }

    const name =
      firstName || lastName
        ? `${firstName || ''} ${lastName || ''}`.trim()
        : 'Social User';

    const newUser = await userModel.create({
      clerkId: id,
      name,
      imageUrl: imageUrl || 'https://uit-api.clerk.com/v1/avatar/default',
    });
    console.log('New user created successfully:', id);
    res.json({ message: 'user created successfully', newUser });
  } catch (error) {
    console.error('Error in authCallback detail:', error);
    res.status(500).json({ message: 'user not created', error: error.message });
  }
};
