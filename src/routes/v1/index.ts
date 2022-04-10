import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/v1/user', userRoutes);
routes.use('/v1/auth', authRoutes);

export default routes;
