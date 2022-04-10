import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserSchema } from '../schemas/user.schema';
import { createUser, updateUser } from '../services/user.service';
import ApiReturnSuccess from '../utils/apiReturnSuccess';

export async function createHandler(
  request: Request<{}, {}, CreateUserSchema['body']>,
  response: Response
) {
  await createUser(request.body);
  response.status(StatusCodes.CREATED).json(new ApiReturnSuccess());
}

export async function getCurrentUser(request: Request, response: Response) {
  const { user } = request;
  response.status(StatusCodes.OK).json(new ApiReturnSuccess(user));
}

export async function updateHandler(request: Request, response: Response) {
  const { id } = request.params;
  await updateUser(Number(id), request.body);
  response.status(StatusCodes.OK).json(new ApiReturnSuccess());
}
