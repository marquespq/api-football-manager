import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryFailedError } from 'typeorm';
import { CreateTeamInput } from '../schemas/team.schema';
import { createTeam, remove, updateTeam } from '../services/team.service';
import ApiReturnError from '../utils/apiReturnError';
import ApiReturnSuccess from '../utils/apiReturnSuccess';

export async function createHandler(
  req: Request<{}, {}, CreateTeamInput['body']>,
  response: Response
) {
  try {
    await createTeam(req.body);
    response.status(StatusCodes.CREATED).json(new ApiReturnSuccess());
  } catch (err) {
    if (err instanceof QueryFailedError && 'code' in err) {
      const { code } = err;
      response.status(StatusCodes.BAD_REQUEST).json(
        new ApiReturnError({
          message: `Regra de dados não atendida. Code: ${code}`,
        })
      );
    } else {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json(new ApiReturnError({ message: (err as Error).message }));
    }
  }
}

export async function updateHandler(request: Request, response: Response) {
  try {
    const { id } = request.params;

    await updateTeam(Number(id), request.body);

    response.status(StatusCodes.OK).json(new ApiReturnSuccess());
  } catch (err) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json(new ApiReturnError({ message: (err as Error).message }));
  }
}

export async function deleteHandler(request: Request, response: Response) {
  const { id } = request.params;
  await remove(Number(id));
  response.status(StatusCodes.NO_CONTENT).json(new ApiReturnSuccess());
}
