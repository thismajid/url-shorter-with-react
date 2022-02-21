import { Router } from 'express';

import authRouter from './auth.route';
import urlRouter from './url.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/url', urlRouter);

export default router;
