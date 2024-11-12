import { Injectable } from '@nestjs/common';
import { Summary } from './summary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { TeamService } from '../team/team.service';
import { InstallationService } from '../installation/installation.service';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary) private summaryRepository: Repository<Summary>,
    private teamService: TeamService,
    private installationService: InstallationService
  ) {}

  async create(createSummaryDto: CreateSummaryDto): Promise<Summary> {
    // Let error message bubble up?
    const team = await this.teamService.find(createSummaryDto.teamId);
    const startDate = await this.getStartDate(team.id);

    const summary = new Summary();

    summary.data = createSummaryDto.data;
    summary.version = createSummaryDto.version;
    summary.startDate = startDate;
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

  // Find the last summary that ran or the date the app was installed
  async getStartDate(teamId: string): Promise<Date> {
    const latestSummary = await this.summaryRepository.findOne({
      where: { team: { id: teamId } },
      order: { createdAt: 'DESC' },
    });

    if (!latestSummary) {
      const installation = await this.installationService.findOne(teamId);

      return installation.createdAt;
    }

    return latestSummary.createdAt;
  }
}
