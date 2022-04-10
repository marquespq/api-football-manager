import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserSchema } from '../schemas/user.schema';
import { createUser, updateUser } from '../services/user.service';
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

export async function getCurrentUser(request: Request, response: Response) {
  const { user } = request;
  response.status(StatusCodes.OK).json(new ApiReturnSuccess(user));
}

export async function updateHandler(request: Request, response: Response) {
  try {
    const { id } = request.params;

    await updateUser(Number(id), request.body);

    response.status(StatusCodes.OK).json(new ApiReturnSuccess());
  } catch (err) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json(new ApiReturnError({ message: (err as Error).message }));
  }
}
