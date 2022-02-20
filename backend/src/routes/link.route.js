import { Router } from 'express';
import { authorize, decodeToken } from '../middlewares/authorize.middleware';

import {
  createShortLink,
  getSingleLink,
  deleteLink,
  updateLink,
} from '../controllers/link.controller';

const linkRouter = Router();

linkRouter.post('/', authorize, createShortLink);

linkRouter.get('/:shortname', getSingleLink);

linkRouter.delete('/', authorize, deleteLink);

linkRouter.put('/', authorize, updateLink);

export default linkRouter;
