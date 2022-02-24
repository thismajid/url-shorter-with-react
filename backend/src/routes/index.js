import { Router } from 'express';

import authRouter from './auth.route';
import urlRouter from './url.route';
import dashboardRouter from './dashboard.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/url', urlRouter);

router.use('/dashboard', dashboardRouter);

export default router;
