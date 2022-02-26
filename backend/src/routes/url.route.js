import { Router } from 'express';
import { authorize } from '../middlewares/authorize.middleware';

import {
  createShortUrl,
  getSingleUrl,
  getSingleUrlById,
  deleteUrl,
  editUrl,
} from '../controllers/url.controller';

const urlRouter = Router();

urlRouter.post('/', authorize, createShortUrl);

urlRouter.get('/:shortname', getSingleUrl);

urlRouter.delete('/', authorize, deleteUrl);

urlRouter.put('/', authorize, editUrl);

export default urlRouter;
