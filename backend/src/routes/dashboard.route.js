import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware';

import {
  getUrls,
  getUser,
  updateProfile,
} from '../controllers/dashboard.controller';

const dashboardRouter = Router();

dashboardRouter.get('/urls', authorize, getUrls);

dashboardRouter.get('/profile', authorize, getUser);

dashboardRouter.put('/profile', authorize, updateProfile);

export default dashboardRouter;
