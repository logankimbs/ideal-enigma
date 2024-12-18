import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { TeamService } from '../team/team.service';
import { User } from '../user/user.entity';
import { CreateInsightDto } from './dto/create-insight.dto';
import { GetInsightByIdDto } from './dto/get-insight.dto';
import { MarkInsightSummarizedDto } from './dto/insight-summarized.dto';
import { Insight } from './insight.entity';

@Injectable()
export class InsightService {
  constructor(
    @InjectRepository(Insight) private insightRepository: Repository<Insight>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    private teamService: TeamService
  ) {}

  // Create insight and tags. Tags are passed in as an array of strings i.e., ["tag1", "tag2"]
  async create(createInsightDto: CreateInsightDto): Promise<Insight> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: createInsightDto.userId },
    });

    let tags: Tag[] = [];
    if (createInsightDto.tags && createInsightDto.tags.length > 0) {
      const existingTags = await this.tagRepository.find({
        where: createInsightDto.tags.map((tagText) => ({ text: tagText })),
      });

      // Create a Set of existing tag for quick lookup
      const existingTagTexts = new Set(existingTags.map((tag) => tag.text));

      // Identify tags that don't exist yet
      const newTagsData = createInsightDto.tags
        .filter((tagText) => !existingTagTexts.has(tagText))
        .map((tagText) => this.tagRepository.create({ text: tagText }));

      // Save new tags in one batch if there are any
      if (newTagsData.length > 0) {
        const newTags = await this.tagRepository.save(newTagsData);
        tags = [...existingTags, ...newTags];
      } else {
        tags = existingTags;
      }
    }

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

  async getUserWeeklyInsightCount(userId: string){
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['team'],
    });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.insightRepository
      .createQueryBuilder('insights')
      .leftJoinAndSelect('insights.user', 'user')
      .leftJoinAndSelect('user.team', 'team')
      .where('team.id = :teamId', { teamId: user.team.id })
      .andWhere('insights.createdAt > :oneWeekAgo', { oneWeekAgo })
      .getCount();
  }
  async getTeamRecentInsights(userId: string): Promise<number> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
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
      .andWhere('insights.createdAt > :oneWeekAgo', { oneWeekAgo })
      .getCount();
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
