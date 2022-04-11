import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import config from '../config/config';
import TeamRepository from '../database/repositories/Team.Repository';
import { LoginInput } from '../schemas/auth.schema';
import ApiError from '../utils/apiError.utils';

const bcrypt = require('bcrypt');

export async function login(
  input: LoginInput['body']
): Promise<{ token: string }> {
  const repository = getCustomRepository(TeamRepository);

  const team = await repository.findOne({ where: { email: input.email } });

  const passwordMatch = await bcrypt.compare(input.password, team?.password);

  if (!team || !passwordMatch) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Email ou senha inválido');
  }

  const token = jwt.sign({ sub: team.id }, config.jwtKey as string);

  return { token };
}

export async function getUserById(id: string) {
  const repository = getCustomRepository(TeamRepository);
  const user = await repository.findOne({
    where: { id },
    relations: ['users'],
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Time não existe.');
  }

  return user;
}
