import dotenv from 'dotenv';
import { COMPANY_CONTACT_FORM_NAME } from '../constant.js';

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
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  brevoApiKey: process.env.BREVO_API_KEY || '',
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL || '',
  contactFromEmail: process.env.CONTACT_FROM_EMAIL || '',
  contactFromName: process.env.CONTACT_FROM_NAME || COMPANY_CONTACT_FORM_NAME,
};
