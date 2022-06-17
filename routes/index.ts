import express from 'express';
import UsersRouter from './users';

const routerApi = (app: express.Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', UsersRouter);
};

export default routerApi;
