import dotenv from 'dotenv';

dotenv.config();

const emailConfig = {
  HOST: process.env.HOST,
  SERVER: process.env.EMAIL_SERVER,
  PORT: process.env.EMAIL_PORT,
  USERNAME: process.env.EMAIL_USERNAME,
  PASSWORD: process.env.EMAIL_PASSWORD,
};

export default emailConfig;
