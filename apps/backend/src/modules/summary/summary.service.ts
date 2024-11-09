import { Injectable } from '@nestjs/common';
import { Summary } from './summary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { TeamService } from '../team/team.service';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary) private summaryRepository: Repository<Summary>,
    private teamService: TeamService
  ) {}

  async create(createSummaryDto: CreateSummaryDto): Promise<Summary> {
    // Let error message bubble up?
    const team = await this.teamService.find(createSummaryDto.teamId);
    const summary = new Summary();

    summary.data = createSummaryDto.data;
    summary.version = createSummaryDto.version;
    summary.team = team;

    // TODO: Emit summary added event for websockets

    return this.summaryRepository.save(summary);
  }

  async findById(id: string) {
    return await this.summaryRepository.findOneByOrFail({ id });
  }

  async findByTeamId(teamId: string) {
    return await this.summaryRepository.find({
      where: { team: { id: teamId } },
      relations: ['team'],
    });
  }
}
