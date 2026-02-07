import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(uri);
    console.log('DB Connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
