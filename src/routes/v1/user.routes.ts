import { Router } from 'express';
import {
  createHandler,
  deleteHandler,
  getCurrentUser,
  updateHandler,
} from '../../controllers/user.controller';

import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema';

import validateResource from '../../middlewares/validateResource';
import { auth } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const routes = Router();

routes
  .route('/')
  .post(
    catchAsync(auth),
    validateResource(createUserSchema),
    catchAsync(createHandler)
  )
  .get(catchAsync(auth), catchAsync(getCurrentUser));
routes
  .route('/:id')
  .put(
    catchAsync(auth),
    validateResource(updateUserSchema),
    catchAsync(updateHandler)
  )
  .delete(
    catchAsync(auth),
    validateResource(deleteUserSchema),
    catchAsync(deleteHandler)
  );

export default routes;
