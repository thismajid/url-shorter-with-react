import { Router } from 'express';

const adminRouter = Router();

import {
  getAllUrls,
  getAllUsers,
  changeUserRole,
} from '../controllers/admin.controller';

adminRouter.get('/urls', getAllUrls);

adminRouter.get('/users', getAllUsers);

adminRouter.put('/user', changeUserRole);

export default adminRouter;
