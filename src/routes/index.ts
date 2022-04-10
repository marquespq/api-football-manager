import { Express, Request, Response } from 'express';
import v1Routes from './v1';

function routes(app: Express) {
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use('/api', v1Routes);
}

export default routes;
