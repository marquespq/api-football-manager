import { Express, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorConverter, errorHandler } from '../middlewares/error';
import ApiError from '../utils/apiError.utils';
import v1Routes from './v1';

function routes(app: Express) {
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use('/api', v1Routes);

  app.use((req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
  });

  app.use(errorConverter);
  app.use(errorHandler);
}

export default routes;
