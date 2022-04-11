import { Router } from 'express';
import {
  createHandler,
  updateHandler,
  deleteHandler,
  drawTeamsHandler,
  getUsersByTeamHandler,
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
  .post(validateResource(createTeamSchema), catchAsync(createHandler))
  .get(catchAsync(auth), catchAsync(getUsersByTeamHandler));

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
  .get(catchAsync(auth), catchAsync(drawTeamsHandler));

export default routes;
