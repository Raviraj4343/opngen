import cors from 'cors';
import express from 'express';

import { COMPANY_NAME, HTTP_STATUS } from './constant.js';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import routes from './routes/index.js';
import { ApiResponse } from './utils/ApiResponse.js';

const app = express();

app.disable('x-powered-by');

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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
      `${COMPANY_NAME} backend API is running`,
    ),
  );
};

app.get('/api/v1', getApiBaseResponse);
app.get('/api/v1/', getApiBaseResponse);
app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
