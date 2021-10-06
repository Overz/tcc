import 'express-async-errors';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { routes } from './routes';
import { JWT_KEY } from './utils/constants';

let app: Express;

const getApp = () => {
  app = express();

  // Configurations
  app.set('trust proxy', true);
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(currentUser(JWT_KEY));
  app.use(urlencoded({ extended: true }));

  // Comunicação com o front
  app.use(cors());

  // Rotas a aplicação
  app.use(routes);

  // Not Found
  app.all('*', async (req) => {
    console.log('NOT-FOUND URL: ', req.url);
    throw new NotFoundError();
  });

  app.use(errorHandler);
};

export { app, getApp };
