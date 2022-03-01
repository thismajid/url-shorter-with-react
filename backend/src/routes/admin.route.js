import { Router } from 'express';

const adminRouter = Router();

import {
  getAllUrls,
  getAllUsers,
  changeUserRole,
  deleteUser,
} from '../controllers/admin.controller';

adminRouter.get('/urls', getAllUrls);

adminRouter.get('/users', getAllUsers);

adminRouter.put('/user', changeUserRole);

adminRouter.delete('/user', deleteUser);

export default adminRouter;
