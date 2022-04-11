import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { Ability, Position } from '../database/entities/User.Entity';
import UserRepository from '../database/repositories/User.Repository';
import { CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema';
import ApiError from '../utils/apiError.utils';

export async function createUser(
  input: CreateUserSchema['body']
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, ability, position, team_id } = input;

  const repository = getCustomRepository(UserRepository);

  const newUser = {
    name,
    ability: ability as Ability,
    position: position as Position,
    team_id,
  };

  await repository.save(newUser);
}

export async function updateUser(id: number, input: UpdateUserSchema['body']) {
  const { name, ability, position } = input;

  const repository = getCustomRepository(UserRepository);

  const userExists = await repository.findOne(id);

  if (!userExists) {
    throw new Error('Usuário não encontrado');
  }

  const userToUpdate = {
    id,
    name,
    ability: ability as Ability,
    position: position as Position,
  };

  await repository.save(userToUpdate);
}

export async function remove(id: number) {
  const repository = getCustomRepository(UserRepository);
  const userExists = await repository.findOne({
    where: { id },
    relations: ['teams'],
  });

  if (userExists?.teams && Object.keys(userExists.teams).length) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Esse usuario não pode ser excluído, pois está sendo utilizado.'
    );
  }

  if (!userExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Usuario não encontrado.');
  }

  await repository.delete(id);
}
