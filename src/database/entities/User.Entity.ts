import { Entity, Column } from 'typeorm';
import Base from './Base.Entity';

@Entity('users')
export default class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
