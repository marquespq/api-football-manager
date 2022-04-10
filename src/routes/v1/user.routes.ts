import { Router } from 'express';
import { createHandler } from '../../controllers/user.controller';

import { createUserSchema } from '../../schemas/user.schema';

import validateResource from '../../middlewares/validateResource';

const routes = Router();

routes.route('/').post(validateResource(createUserSchema), createHandler);

export default routes;
