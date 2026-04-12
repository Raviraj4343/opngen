import { HTTP_STATUS } from '../constant.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getHealth = asyncHandler(async (_req, res) => {
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(HTTP_STATUS.OK, {
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    }, 'Backend is healthy'),
  );
});
