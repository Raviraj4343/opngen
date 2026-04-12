import dotenv from 'dotenv';

dotenv.config();

const getRequiredEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5600,
  mongoUri: getRequiredEnv('MONGO_URI'),
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
