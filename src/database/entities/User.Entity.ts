import { Entity, Column, ManyToMany } from 'typeorm';
import Base from './Base.Entity';
import type Team from './Team.Entity';

export enum Hability {
  AMATEUR = 'amateur',
  BEGINNER = 'beginner',
  SEMI_PROFESSIONAL = 'semiprofissional',
  PROFESSIONAL = 'professional',
  LEGENDARY = 'legendary',
}

@Entity('users')
export default class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Hability,
    default: Hability.SEMI_PROFESSIONAL,
  })
  hability: Hability;

  @Column()
  password: string;

  @ManyToMany('Team', 'users')
  teams?: Team[];
}
