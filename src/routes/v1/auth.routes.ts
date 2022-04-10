import { Router } from 'express';
import * as AuthController from '../../controllers/auth.controller';
import validateResource from '../../middlewares/validateResource';
import { loginSchema } from '../../schemas/auth.schema';
import catchAsync from '../../utils/catchAsync';

const routes = Router();

routes
  .route('/')
  .post(validateResource(loginSchema), catchAsync(AuthController.loginHandler));

export default routes;
