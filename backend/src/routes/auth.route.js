import { Router } from 'express';

import { register, login, forget, reset } from '../controllers/auth.controller'

const router = Router();

router.post('/register', register)

router.post('/login', login)

router.post('/forget', forget)

router.put('/reset', reset)

export default router;
