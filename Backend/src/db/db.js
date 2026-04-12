import mongoose from 'mongoose';

import { env } from '../config/env.js';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connection = await mongoose.connect(env.mongoUri, {
    dbName: DB_NAME,
    autoIndex: env.nodeEnv !== 'production',
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });

  console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);

  return connection.connection;
};

export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

export default connectDB;
