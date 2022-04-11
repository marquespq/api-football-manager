import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserSchema } from '../schemas/user.schema';
import { createUser, remove, updateUser } from '../services/user.service';
import ApiReturnSuccess from '../utils/apiReturnSuccess';

export async function createHandler(
  request: Request<{}, {}, CreateUserSchema['body']>,
  response: Response
) {
  const { team } = request;
  await createUser({ ...request.body, team_id: team.id });
  response.status(StatusCodes.CREATED).json(new ApiReturnSuccess());
}

export async function getCurrentUser(request: Request, response: Response) {
  const { team } = request;
  response.status(StatusCodes.OK).json(new ApiReturnSuccess(team));
}

export async function updateHandler(request: Request, response: Response) {
  const { id } = request.params;
  await updateUser(Number(id), request.body);
  response.status(StatusCodes.OK).json(new ApiReturnSuccess());
}

export async function deleteHandler(request: Request, response: Response) {
  const { id } = request.params;
  await remove(Number(id));
  response.status(StatusCodes.NO_CONTENT).json(new ApiReturnSuccess());
}
