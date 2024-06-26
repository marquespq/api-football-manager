import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Ability, Position } from '../database/entities/User.Entity';
import { getUserById } from '../services/auth.service';
import ApiError from '../utils/apiError.utils';

export interface InfoTeam {
  id?: number;
  name?: string;
  ability?: Ability;
  position?: Position;
  email?: string;
  users?: any;
  description?: string;
}

declare global {
  namespace Express {
    interface Request {
      team: InfoTeam;
    }
  }
}

const promiseVerifyToken = (token: string, key: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

async function isTokenValid(token: string): Promise<any> {
  try {
    if (!token) return false;

    const jwtToken = token.replace('Bearer ', '').trim();

    const tokenContent = await promiseVerifyToken(
      jwtToken,
      config.jwtKey as string
    );

    return tokenContent;
  } catch (error) {
    return false;
  }
}

export async function auth(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization as any;

  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Acesso negado');
  }
  const isValid = await isTokenValid(token);

  if (!isValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Acesso negado');
  }

  let team;

  try {
    team = await getUserById(isValid.sub);
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Usuario não existe.');
  }

  const filterTeam = {
    id: team.id,
    name: team.name,
    email: team.email,
    users: team.users,
  };

  req.team = filterTeam;

  next();
}
