import cors from 'cors';
import express from 'express';

import { HTTP_STATUS } from './constant.js';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import routes from './routes/index.js';
import { ApiResponse } from './utils/ApiResponse.js';

const app = express();

app.disable('x-powered-by');

app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((origin) => origin.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

const getApiBaseResponse = (_req, res) => {
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {
        healthCheck: '/api/v1/health',
      },
      'OpenGen backend API is running',
    ),
  );
};

app.get('/api/v1', getApiBaseResponse);
app.get('/api/v1/', getApiBaseResponse);
app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
