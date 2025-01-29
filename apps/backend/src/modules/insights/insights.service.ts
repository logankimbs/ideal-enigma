import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insight } from '../../infra/database/entities/insight.entity';
import { User } from '../../infra/database/entities/user.entity';
import { TagsService } from '../tags/tags.service';
import { TeamsService } from '../teams/teams.service';
import { CreateInsightDto } from './dtos/create-insight.dto';
import { GetInsightByIdDto } from './dtos/get-insight.dto';
import { MarkInsightSummarizedDto } from './dtos/insight-summarized.dto';

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(Insight) private insightRepository: Repository<Insight>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private teamService: TeamsService,
    private tagService: TagsService
  ) {}

  async create(createInsightDto: CreateInsightDto): Promise<Insight> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: createInsightDto.userId },
    });

    const tags = await this.tagService.create(createInsightDto.tags);
    const insight = new Insight();

    insight.user = user;
    insight.text = createInsightDto.text;
    insight.tags = tags;
    insight.link = createInsightDto.link || '';

    return await this.insightRepository.save(insight);
  }

  async getInsightsById(
    getInsightByIdDto: GetInsightByIdDto
  ): Promise<Insight> {
    return await this.insightRepository.findOneOrFail({
      where: { id: getInsightByIdDto.id },
      relations: ['tags', 'user'],
    });
  }

  async getInsightsRepository(userId: string): Promise<Insight[]> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['team'],
    });

    return this.insightRepository
      .createQueryBuilder('insights')
      .leftJoinAndSelect('insights.user', 'user')
      .leftJoinAndSelect('insights.tags', 'tags')
      .leftJoinAndSelect('user.team', 'team')
      .where('team.id = :teamId', { teamId: user.team.id })
      .orderBy('insights.createdAt', 'DESC')
      .getMany();
  }

  async getRecentInsights(teamId: string, limit: number): Promise<Insight[]> {
    const team = await this.teamService.find(teamId);

    return this.insightRepository
      .createQueryBuilder('insights')
      .leftJoinAndSelect('insights.user', 'user')
      .leftJoinAndSelect('user.team', 'team')
      .where('team.id = :teamId', { teamId: team.id })
      .orderBy('insights.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  }

  async getInsightsToSummarize(teamId: string): Promise<Insight[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.insightRepository
      .createQueryBuilder('insights')
      .leftJoinAndSelect('insights.user', 'users')
      .leftJoinAndSelect('users.team', 'teams')
      .where('teams.id = :teamId', { teamId })
      .andWhere('insights.isSummarized = false')
      .andWhere('insights.createdAt > :oneMonthAgo', { oneMonthAgo })
      .getMany();
  }

  async markInsightsSummarized(
    markInsightSummarizedDto: MarkInsightSummarizedDto
  ): Promise<void> {
    markInsightSummarizedDto.insights.forEach((insight) => {
      // TODO: Remove 'isSummarized' column. summaryId can take its place.
      insight.isSummarized = true;
      insight.summary = markInsightSummarizedDto.summary;
    });

    await this.insightRepository.save(markInsightSummarizedDto.insights);
  }

  async getInsightsBySummaryId(summaryId: string) {
    return await this.insightRepository.find({
      where: { summary: { id: summaryId } },
      relations: ['summary', 'user', 'tags'],
    });
  }
}
