import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User.Entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async findOneByName(name: string): Promise<User | undefined> {
    const user = await this.createQueryBuilder('user')
      .where('LOWER(user.name) = LOWER(:name)', { name })
      .getOne();
    return user;
  }
}
