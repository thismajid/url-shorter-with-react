import jwt from 'jsonwebtoken';

import jwtConfig from '../configs/jwt.config';

// import { getUserByUserId } from '../services/user.service';

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
    // if (req.user.userId) {
    //   const userFound = await getUserByUserId(req.user.userId);
    //   if (!userFound) throw new Error('Invalid token');
    // }
  } catch (err) {
    throw new Error('Invalid token');
  }
};

const adminAuthorize = (req, res, next) => {
  if (req.user.role === 'admin') return next();
  throw new Error('Unauthroized');
};

export { authorize, decodeToken, adminAuthorize };
