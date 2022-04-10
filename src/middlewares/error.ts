import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryFailedError } from 'typeorm';
import config, { environments } from '../config/config';
import logger from '../config/logger';
import ApiError from '../utils/apiError.utils';
import ApiReturnError from '../utils/apiReturnError';

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof QueryFailedError
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || StatusCodes[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === environments.PRODUCTION && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR];
  }

  const errorResponse = new ApiReturnError({
    message,
    ...(config.env === environments.DEVELOPMENT && { payload: err.stack }),
  });

  if (config.env === environments.DEVELOPMENT) {
    logger.error(err);
  }

  res.status(statusCode).send(errorResponse);
};
