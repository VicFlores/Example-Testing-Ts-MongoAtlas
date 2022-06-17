import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routerApi from './routes';
import { handleError } from './middleware/handleErrors';

dotenv.config({ path: './.env' });

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:4000'],
  })
);

routerApi(app);

app.use(handleError);

export default app;
