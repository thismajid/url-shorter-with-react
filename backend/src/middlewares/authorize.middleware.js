import jwt from 'jsonwebtoken';

import jwtConfig from '../configs/jwt.config';

const authorize = (req, res, next) => {
  req.user = {};
  const headers = req.headers.authorization;
  if (headers && headers.split(' ')[0] === 'Bearer') {
    req.user.token = headers.split(' ')[1];
    decodeToken(req, next);
  } else {
    next();
  }
};

const decodeToken = (req, next) => {
  try {
    req.user = jwt.verify(req.user.token, jwtConfig.secret);
    next();
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export { authorize, decodeToken };
