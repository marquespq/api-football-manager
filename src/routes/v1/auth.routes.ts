import { Router } from 'express';
import { loginHandler } from '../../controllers/auth.controller';
import validateResource from '../../middlewares/validateResource';
import { loginSchema } from '../../schemas/auth.schema';
import catchAsync from '../../utils/catchAsync';

const routes = Router();

routes.route('/').post(validateResource(loginSchema), catchAsync(loginHandler));

export default routes;
