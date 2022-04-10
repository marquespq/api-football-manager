import { StatusCodes } from 'http-status-codes';
import { getCustomRepository, getRepository } from 'typeorm';
import User from '../database/entities/User.Entity';
import TeamRepository from '../database/repositories/Team.Repository';
import { CreateTeamInput, UpdateTeamInput } from '../schemas/team.schema';
import ApiError from '../utils/apiError.utils';

async function populateUsers(users: (number | undefined)[]) {
  const existingUsers = await getRepository(User).findByIds(users);
  if (!existingUsers.length) throw new Error('Usuário não encontrado.');
  return existingUsers;
}

export async function createTeam(
  input: CreateTeamInput['body']
): Promise<void> {
  const { name, users = [] } = input;

  const repository = getCustomRepository(TeamRepository);
  const teamAlreadyExists = await repository.findOneByName(name);

  if (teamAlreadyExists) {
    throw new Error('Time já existe.');
  }

  let existingUsers;
  if (users && users.length) {
    existingUsers = await populateUsers(users);
  }

  const createdTeam = repository.create({
    ...input,
    users: existingUsers,
  });

  await repository.save(createdTeam);
}

export async function updateTeam(id: number, input: UpdateTeamInput['body']) {
  const { users = [], name, description } = input;

  const repository = getCustomRepository(TeamRepository);

  const teamExists = await repository.findOne(id);

  if (!teamExists) {
    throw new Error('Time não encontrado');
  }

  const teamAlreadyExists = await repository.findOneByName(name);

  if (teamAlreadyExists && teamAlreadyExists.id !== id) {
    throw new Error('Já existe outro time cadastrado com esse nome.');
  }

  let existingUsers: User[];

  if (users && users.length) {
    existingUsers = await populateUsers(users);
  } else {
    existingUsers = [];
  }

  const teamToUpdate = {
    id,
    name,
    description,
    users: existingUsers,
  };

  await repository.save(teamToUpdate);
}

export async function remove(id: number) {
  const repository = getCustomRepository(TeamRepository);
  const teamExists = await repository.findOne(id);

  if (!teamExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Time não encontrado.');
  }
  await repository.delete(id);
}