import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { Ability, Position } from '../database/entities/User.Entity';
import UserRepository from '../database/repositories/User.Repository';
import { CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema';

export async function createUser(
  input: CreateUserSchema['body']
): Promise<void> {
  const { name, email, password, ability, position } = input;

  const repository = getCustomRepository(UserRepository);

  const user = await repository.findOne({ where: { email: input.email } });

  if (user) throw new Error('Este usuário já existe');

  let passwordHash;
  if (password) passwordHash = await hash(password as string, 8);

  const newUser = {
    name,
    email,
    ability: ability as Ability,
    password: passwordHash,
    position: position as Position,
  };

  await repository.save(newUser);
}

export async function updateUser(id: number, input: UpdateUserSchema['body']) {
  const { name, password, ability, email, position } = input;

  const repository = getCustomRepository(UserRepository);

  const userExists = await repository.findOne(id);

  if (!userExists) {
    throw new Error('Usuário não encontrado');
  }

  let passwordHash;
  if (password) passwordHash = await hash(password as string, 8);

  const userToUpdate = {
    id,
    name,
    email,
    ability: ability as Ability,
    password: passwordHash,
    position: position as Position,
  };

  await repository.save(userToUpdate);
}
