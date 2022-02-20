import { Router } from 'express';

import {
  createShortLink,
  getSingleLink,
  deleteLink,
  updateLink,
} from '../controllers/link.controller';

const linkRouter = Router();

linkRouter.post('/', createShortLink);

linkRouter.get('/:shortname', getSingleLink);

linkRouter.delete('/', deleteLink);

linkRouter.put('/', updateLink);

export default linkRouter;
