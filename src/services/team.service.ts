import { hash } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository, getRepository } from 'typeorm';
import User, { Ability, Position } from '../database/entities/User.Entity';
import TeamRepository from '../database/repositories/Team.Repository';
import UserRepository from '../database/repositories/User.Repository';
import { InfoTeam } from '../middlewares/auth';
import { CreateTeamInput, UpdateTeamInput } from '../schemas/team.schema';
import ApiError from '../utils/apiError.utils';
import { breakArray } from '../utils/breakArray';
import { sortTeam } from '../utils/sortTeam';

async function populateUsers(users: (number | undefined)[]) {
  const existingUsers = await getRepository(User).findByIds(users);
  if (!existingUsers.length) throw new Error('Usuário não encontrado.');
  return existingUsers;
}

export async function createTeam(
  input: CreateTeamInput['body']
): Promise<void> {
  const { name, password, users = [] } = input;

  const repository = getCustomRepository(TeamRepository);
  const teamAlreadyExists = await repository.findOneByName(name);

  if (teamAlreadyExists) {
    throw new Error('Time já existe.');
  }

  let passwordHash;
  if (password) passwordHash = await hash(password as string, 8);

  let existingUsers;
  if (users && users.length) {
    existingUsers = await populateUsers(users);
  }

  const createdTeam = repository.create({
    ...input,
    password: passwordHash,
    users: existingUsers,
  });

  await repository.save(createdTeam);
}

export async function updateTeam(id: number, input: UpdateTeamInput['body']) {
  const { users = [], password, name, description } = input;

  const repository = getCustomRepository(TeamRepository);

  const teamExists = await repository.findOne(id);

  if (!teamExists) {
    throw new Error('Time não encontrado');
  }

  const teamAlreadyExists = await repository.findOneByName(name);

  if (teamAlreadyExists && teamAlreadyExists.id !== id) {
    throw new Error('Já existe outro time cadastrado com esse nome.');
  }

  let passwordHash;
  if (password) passwordHash = await hash(password as string, 8);

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
    password: passwordHash,
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

export async function drawTeams(id: number) {
  const query = { where: { id } };

  const repository = getCustomRepository(TeamRepository);

  const team = await repository.findOne(query);

  if (!team)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Não existe esse time');

  const user = team?.users?.flatMap((filter: InfoTeam) => ({
    id: filter.id,
    name: filter.name,
    ability: filter.ability,
    position: filter.position,
  }));

  const LEVEL_ONE = [];
  const LEVEL_TWO = [];
  const LEVEL_THREE = [];
  const LEVEL_FOUR = [];
  const LEVEL_FIVE = [];
  const GKS = [];

  const amateur = user
    ?.filter(
      (level) =>
        level.ability === Ability.AMATEUR && level.position !== Position.GK
    )
    .flat();

  const beginner = user
    ?.filter(
      (level) =>
        level.ability === Ability.BEGINNER && level.position !== Position.GK
    )
    .flat();

  const semiProfessional = user
    ?.filter(
      (level) =>
        level.ability === Ability.SEMI_PROFESSIONAL &&
        level.position !== Position.GK
    )
    .flat();

  const professional = user
    ?.filter(
      (level) =>
        level.ability === Ability.PROFESSIONAL && level.position !== Position.GK
    )
    .flat();

  const legendary = user
    ?.filter(
      (level) =>
        level.ability === Ability.LEGENDARY && level.position !== Position.GK
    )
    .flat();

  const gk = user?.filter((gks) => gks.position === Position.GK).flat();

  LEVEL_ONE.push(amateur);
  LEVEL_TWO.push(beginner);
  LEVEL_THREE.push(semiProfessional);
  LEVEL_FOUR.push(professional);
  LEVEL_FIVE.push(legendary);
  GKS.push(gk);

  const amauterSet = LEVEL_ONE[0] ? sortTeam(LEVEL_ONE[0]) : '';
  const beginnerSet = LEVEL_TWO[0] ? sortTeam(LEVEL_TWO[0]) : '';
  const semiProfessionalSet = LEVEL_THREE[0] ? sortTeam(LEVEL_THREE[0]) : '';
  const professionalSet = LEVEL_FOUR[0] ? sortTeam(LEVEL_FOUR[0]) : '';
  const legendarySet = LEVEL_FIVE[0] ? sortTeam(LEVEL_FIVE[0]) : '';
  const gksSet = GKS[0] ? sortTeam(GKS[0]) : '';

  const amauters = amauterSet
    ? breakArray(amauterSet, amauterSet.length / 2)
    : '';
  const begginers = beginnerSet
    ? breakArray(beginnerSet, beginnerSet.length / 2)
    : '';
  const semiProfessionals = semiProfessionalSet
    ? breakArray(semiProfessionalSet, semiProfessionalSet.length / 2)
    : '';
  const professionals = professionalSet
    ? breakArray(professionalSet, professionalSet.length / 2)
    : '';
  const legendarys = legendarySet
    ? breakArray(legendarySet, legendarySet.length / 2)
    : '';
  const gks = gksSet ? breakArray(gksSet, gksSet.length / 2) : '';

  const teamOne = [
    gks[0],
    amauters[0],
    begginers[0],
    semiProfessionals[0],
    professionals[0],
    legendarys[0],
  ]
    .filter((f) => f !== undefined)
    .flat();

  const teamTwo = [
    gks[1],
    amauters[1],
    begginers[1],
    semiProfessionals[1],
    professionals[1],
    legendarys[1],
  ]
    .filter((f) => f !== undefined)
    .flat();

  const teamFilter = {
    teamOne,
    teamTwo,
  };

  return teamFilter;
}

export async function getUsersAvailable(id: number) {
  const repository = getCustomRepository(UserRepository);
  const users = await repository.findUserByTeamId(id);
  return users;
}
