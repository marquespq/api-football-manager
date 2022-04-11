import { Entity, Column, ManyToMany } from 'typeorm';
import Base from './Base.Entity';
import type Team from './Team.Entity';

export enum Ability {
  AMATEUR = 'amateur',
  BEGINNER = 'beginner',
  SEMI_PROFESSIONAL = 'semiprofessional',
  PROFESSIONAL = 'professional',
  LEGENDARY = 'legendary',
}

export enum Position {
  GK = 'goalkeeper',
  CA = 'attacker',
  ME = 'half',
  DEFENDER = 'defender',
}

@Entity('users')
export default class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Ability,
    default: Ability.SEMI_PROFESSIONAL,
  })
  ability: Ability;

  @Column({
    type: 'enum',
    enum: Position,
    default: Position.DEFENDER,
  })
  position: Position;

  @Column({ nullable: true })
  password?: string;

  @ManyToMany('Team', 'users')
  teams?: Team[];
}
