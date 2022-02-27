import { Router } from 'express';

const adminRouter = Router();

import { getAllUrls, getAllUsers } from '../controllers/admin.controller';

adminRouter.get('/urls', getAllUrls);

adminRouter.get('/users', getAllUsers);

export default adminRouter;
