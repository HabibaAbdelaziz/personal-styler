import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Where do we insert the URL from Mongo Atlas?

const connectDB =  async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error: ${errorMessage}`);
        process.exit(1);
    }
};

export default connectDB;