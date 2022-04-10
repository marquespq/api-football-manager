import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserSchema } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import ApiReturnError from '../utils/apiReturnError';
import ApiReturnSuccess from '../utils/apiReturnSuccess';

export async function createHandler(
  request: Request<{}, {}, CreateUserSchema['body']>,
  response: Response
) {
  try {
    await createUser(request.body);
    response.status(StatusCodes.CREATED).json(new ApiReturnSuccess());
  } catch (err) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json(new ApiReturnError({ message: (err as Error).message }));
  }
}
