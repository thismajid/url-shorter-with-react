import { Router } from 'express';

import authRouter from './auth.route';
import linkRouter from './link.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/link', linkRouter);

export default router;
