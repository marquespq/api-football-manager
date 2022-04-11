import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateTeamInput } from '../schemas/team.schema';
import {
  createTeam,
  drawTeams,
  remove,
  updateTeam,
} from '../services/team.service';
import ApiReturnSuccess from '../utils/apiReturnSuccess';

export async function createHandler(
  req: Request<{}, {}, CreateTeamInput['body']>,
  response: Response
) {
  await createTeam(req.body);
  response.status(StatusCodes.CREATED).json(new ApiReturnSuccess());
}

export async function updateHandler(request: Request, response: Response) {
  const { id } = request.params;
  await updateTeam(Number(id), request.body);
  response.status(StatusCodes.OK).json(new ApiReturnSuccess());
}

export async function deleteHandler(request: Request, response: Response) {
  const { id } = request.params;
  await remove(Number(id));
  response.status(StatusCodes.NO_CONTENT).json(new ApiReturnSuccess());
}

export async function drawTeamsHandler(request: Request, response: Response) {
  const { id } = request.params;
  const team = await drawTeams(Number(id));
  response.status(StatusCodes.OK).json(new ApiReturnSuccess(team));
}
