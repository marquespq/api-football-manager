import { Router } from 'express';
import {
  createHandler,
  getCurrentUser,
} from '../../controllers/user.controller';

import { createUserSchema } from '../../schemas/user.schema';

import validateResource from '../../middlewares/validateResource';
import { auth } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const routes = Router();

routes
  .route('/')
  .post(validateResource(createUserSchema), createHandler)
  .get(catchAsync(auth), catchAsync(getCurrentUser));
export default routes;
