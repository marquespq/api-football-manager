import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User.Entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
