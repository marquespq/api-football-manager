import { EntityRepository, Repository } from 'typeorm';
import Team from '../entities/Team.Entity';

@EntityRepository(Team)
export default class TeamRepository extends Repository<Team> {
  async findOneByName(name: string): Promise<Team | undefined> {
    const team = await this.createQueryBuilder('team')
      .where('LOWER(team.name) = LOWER(:name)', { name })
      .getOne();
    return team;
  }
}
