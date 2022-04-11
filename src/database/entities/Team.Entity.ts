import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import Base from './Base.Entity';
import User from './User.Entity';

@Entity('teams')
export default class Team extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany('User', 'teams', { eager: true })
  @JoinTable({
    name: 'teams_users',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  @Column()
  password: string;
}
