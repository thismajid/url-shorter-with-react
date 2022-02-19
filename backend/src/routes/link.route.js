import { Router } from 'express';

import {
  createShortLink,
  getSingleLink,
  deleteLink,
} from '../controllers/link.controller';

const linkRouter = Router();

linkRouter.post('/', createShortLink);

linkRouter.get('/:shortname', getSingleLink);

linkRouter.delete('/', deleteLink);

export default linkRouter;
