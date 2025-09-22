import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected!`);
  } catch (err) {
    console.error(`Connection Error: ${err.message}`);
    process.exit(1); // Exit app if DB fails
  }
};

export default connectDB;
