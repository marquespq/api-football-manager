import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import config from '../config/config';
import UserRepository from '../database/repositories/User.Repository';
import { LoginInput } from '../schemas/auth.schema';
import ApiError from '../utils/apiError.utils';

const bcrypt = require('bcrypt');

export async function login(
  input: LoginInput['body']
): Promise<{ token: string }> {
  const repository = getCustomRepository(UserRepository);

  const user = await repository.findOne({ where: { email: input.email } });

  const passwordMatch = await bcrypt.compare(input.password, user?.password);

  if (!user || !passwordMatch) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Email ou senha inválido');
  }

  const token = jwt.sign({ sub: user.id }, config.jwtKey as string);

  return { token };
}

export async function getUserById(id: string) {
  const repository = getCustomRepository(UserRepository);
  const user = await repository.findOne(id);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Usuario não existe.');
  }

  return user;
}
