import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware';
import { avatarUpload } from '../middlewares/uploader.middleware';

import {
  getUrls,
  getUser,
  updateProfile,
  uploadAvatar,
  removeAvatar,
} from '../controllers/dashboard.controller';

const dashboardRouter = Router();

dashboardRouter.get('/urls', authorize, getUrls);

dashboardRouter.get('/profile', authorize, getUser);

dashboardRouter.put('/profile', authorize, updateProfile);

dashboardRouter.post(
  '/profile/avatar',
  authorize,
  avatarUpload.single('avatar'),
  uploadAvatar
);

dashboardRouter.put('/profile/avatar', authorize, removeAvatar);

export default dashboardRouter;
