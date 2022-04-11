import { Router } from 'express';
import {
  createHandler,
  updateHandler,
  deleteHandler,
  getByIdHandler,
} from '../../controllers/team.controller';
import { auth } from '../../middlewares/auth';
import validateResource from '../../middlewares/validateResource';
import {
  createTeamSchema,
  updateTeamSchema,
  deleteTeamSchema,
} from '../../schemas/team.schema';
import catchAsync from '../../utils/catchAsync';

const routes = Router();

routes
  .route('/')
  .post(
    catchAsync(auth),
    validateResource(createTeamSchema),
    catchAsync(createHandler)
  );

routes
  .route('/:id')
  .put(
    catchAsync(auth),
    validateResource(updateTeamSchema),
    catchAsync(updateHandler)
  )
  .delete(
    catchAsync(auth),
    validateResource(deleteTeamSchema),
    catchAsync(deleteHandler)
  )
  .get(catchAsync(auth), catchAsync(getByIdHandler));
export default routes;
