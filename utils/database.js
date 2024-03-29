import mongoose from 'mongoose';
import User from '@models/user';

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "login",
        })

        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}