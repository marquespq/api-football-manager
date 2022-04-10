import { Router } from 'express';
import {
  createHandler,
  getCurrentUser,
  updateHandler,
} from '../../controllers/user.controller';

import { createUserSchema, updateUserSchema } from '../../schemas/user.schema';

import validateResource from '../../middlewares/validateResource';
import { auth } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const routes = Router();

routes
  // PUBLIC
  .route('/')
  .post(validateResource(createUserSchema), createHandler)

  // PRIVATE
  .get(catchAsync(auth), catchAsync(getCurrentUser));

// PUBLIC
routes.route('/:id').put(validateResource(updateUserSchema), updateHandler);

export default routes;
