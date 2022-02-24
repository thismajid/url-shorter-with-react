import { Router } from 'express';

import { avatarUpload } from '../middlewares/uploader.middleware';

import {
  getUrls,
  getUser,
  updateProfile,
  uploadAvatar,
  removeAvatar,
  resetPassword,
} from '../controllers/dashboard.controller';

const dashboardRouter = Router();

dashboardRouter.get('/urls', getUrls);

dashboardRouter.get('/profile', getUser);

dashboardRouter.put('/profile', updateProfile);

dashboardRouter.post(
  '/profile/avatar',
  avatarUpload.single('avatar'),
  uploadAvatar
);

dashboardRouter.put('/profile/avatar', removeAvatar);

dashboardRouter.get('/profile/reset-password', resetPassword);

export default dashboardRouter;
