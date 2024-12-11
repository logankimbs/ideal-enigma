import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team as SlackTeam } from '@slack/web-api/dist/types/response/TeamInfoResponse';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>
  ) {}

  async create(team: SlackTeam): Promise<Team> {
    return await this.teamRepository.save({ id: team.id, data: team });
  }

  findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async find(id: string): Promise<Team> {
    return await this.teamRepository.findOneOrFail({
      where: { id },
      relations: ['users'],
    });
  }
}
