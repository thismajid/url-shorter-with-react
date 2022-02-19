import dotenv from 'dotenv';

dotenv.config();

const jwtConfig = {
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIREDATE,
};

export default jwtConfig;
