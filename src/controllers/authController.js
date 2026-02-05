import { userModel } from '../models/userModel.js';

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    console.log('Auth callback received for user:', id);

    const user = await userModel.findOne({ clerkId: id });

    if (user) {
      console.log('User already exists');
      return res.json({ message: 'user already exists', user });
    }

    const name =
      firstName || lastName
        ? `${firstName || ''} ${lastName || ''}`.trim()
        : 'Social User';

    const newUser = await userModel.create({
      clerkId: id,
      name,
      imageUrl,
    });
    console.log('New user created:', id);
    res.json({ message: 'user created successfully', newUser });
  } catch (error) {
    console.error('Error in authCallback:', error);
    res.status(500).json({ message: 'user not created', error: error.message });
  }
};
