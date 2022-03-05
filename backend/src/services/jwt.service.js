import jwt from 'jsonwebtoken';

import { jwtConfig } from '../configs';

const { secret, expiresIn } = jwtConfig;

const generateToken = (payload) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export { generateToken };
