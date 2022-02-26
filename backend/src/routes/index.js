import { Router } from 'express';

import { authorize, adminAuthorize } from '../middlewares/authorize.middleware';

import authRouter from './auth.route';
import urlRouter from './url.route';
import dashboardRouter from './dashboard.route';
import adminRouter from './admin.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/url', urlRouter);

router.use('/dashboard', authorize, dashboardRouter);

router.use('/admin', authorize, adminAuthorize, adminRouter);

export default router;
