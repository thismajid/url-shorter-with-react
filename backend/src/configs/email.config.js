import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;
const SERVER = process.env.EMAIL_SERVER;
const PORT = process.env.EMAIL_PORT;
const USERNAME = process.env.EMAIL_USERNAME;
const PASSWORD = process.env.EMAIL_PASSWORD;

export { HOST, SERVER, PORT, USERNAME, PASSWORD };
