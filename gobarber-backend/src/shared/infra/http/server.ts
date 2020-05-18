import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';

import AppError from '@shared/errors/AppError';
import storageConfig from '@config/storage';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use('/files', express.static(storageConfig.uploadFolder));
=======
<<<<<<< HEAD
app.use('/files', express.static(uploadConfig.tmpFolder));
=======
app.use('/files', express.static(storageConfig.uploadFolder));
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err); //eslint-disable-line

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server is running on port 3333!');
});
