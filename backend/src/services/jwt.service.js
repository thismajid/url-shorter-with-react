import jwt from 'jsonwebtoken';

import jwtConfig from '../configs/jwt.config';

const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

export { generateToken };
