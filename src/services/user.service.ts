import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../database/repositories/User.Repository';
import { CreateUserSchema } from '../schemas/user.schema';

export async function createUser(
  input: CreateUserSchema['body']
): Promise<void> {
  const repository = getCustomRepository(UserRepository);

  const user = await repository.findOne({ where: { email: input.email } });

  if (user) throw new Error('Este usuário já existe');

  const passwordHash = await hash(input.password, 8);

  const spreadUser = {
    name: input.name,
    email: input.email,
    password: passwordHash,
  };
  const newUser = repository.create(spreadUser);

  await repository.save(newUser);
}
