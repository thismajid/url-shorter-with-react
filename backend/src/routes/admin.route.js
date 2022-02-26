import { Router } from 'express';

const adminRouter = Router();

import { getAllUrls } from '../controllers/admin.controller';

adminRouter.get('/urls', getAllUrls);

export default adminRouter;
