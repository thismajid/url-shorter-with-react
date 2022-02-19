import { Router } from 'express';

import { register, login, forget, reset } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../middlewares/validator.middleware';

const authRouter = Router();

authRouter.post('/register', registerValidator, register);

authRouter.post('/login', loginValidator, login);

authRouter.post('/forget', forget);

authRouter.put('/reset', reset);

export default authRouter;
