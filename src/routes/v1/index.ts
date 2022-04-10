import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import teamRoutes from './team.routes';

const routes = Router();

// PUBLIC ROUTES
routes.use('/v1/user', userRoutes);
routes.use('/v1/auth', authRoutes);

// PRIVATE ROUTES
routes.use('/v1/team', teamRoutes);

export default routes;
