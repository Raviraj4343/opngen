import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (error, _req, res, _next) => {
  const normalizedError =
    error instanceof ApiError
      ? error
      : new ApiError(error.statusCode || 500, error.message || 'Internal server error');

  if (process.env.NODE_ENV !== 'production') {
    console.error(normalizedError);
  }

  res.status(normalizedError.statusCode).json({
    success: false,
    message: normalizedError.message,
    errors: normalizedError.errors,
    stack: process.env.NODE_ENV === 'production' ? undefined : normalizedError.stack,
  });
};
