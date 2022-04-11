import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginInput } from '../schemas/auth.schema';
import * as AuthService from '../services/auth.service';
import ApiReturnSuccess from '../utils/apiReturnSuccess';

export async function loginHandler(
  request: Request<{}, {}, LoginInput['body']>,
  response: Response
) {
  const token = await AuthService.login(request.body);
  response.status(StatusCodes.OK).json(new ApiReturnSuccess(token));
}

export async function getUser(request: Request, response: Response) {
  const { team } = request;

  response.status(StatusCodes.OK).json(new ApiReturnSuccess(team));
}
