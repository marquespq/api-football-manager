import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { Hability } from '../database/entities/User.Entity';
import UserRepository from '../database/repositories/User.Repository';
import { CreateUserSchema } from '../schemas/user.schema';

export async function createUser(
  input: CreateUserSchema['body']
): Promise<void> {
  const { name, email, password, hability } = input;
  const repository = getCustomRepository(UserRepository);

  const user = await repository.findOne({ where: { email: input.email } });

  if (user) throw new Error('Este usuário já existe');

  const passwordHash = await hash(password, 8);

  const newUser = {
    name,
    email,
    hability: hability as Hability,
    password: passwordHash,
  };

  await repository.save(newUser);
}
