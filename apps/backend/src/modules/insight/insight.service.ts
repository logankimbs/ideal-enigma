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

  async getUserWeeklyInsightCountAndChange(userId: string) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['team'],
    });

    return await this.insightRepository
      .createQueryBuilder('i')
      .select([
        `COUNT(CASE WHEN i."createdAt" >= :oneWeekAgo AND i."createdAt" < :currentDate THEN 1 END) AS last_7_days_count`,
        `COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END) AS previous_7_days_count`,
        `CASE
      WHEN COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END) = 0 THEN NULL
      ELSE (
        (
          COUNT(CASE WHEN i."createdAt" >= :oneWeekAgo AND i."createdAt" < :currentDate THEN 1 END) -
          COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END)
        ) * 100.0 /
        COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END)
      )
    END AS relative_difference_percent`,
      ])
      .where('i.userId = :userId', { userId })
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();
  }

  async getTeamRecentInsights(userId: string) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['team'],
    });

    return await this.insightRepository
      .createQueryBuilder('i')
      .select([
        `COUNT(CASE WHEN i."createdAt" >= :oneWeekAgo AND i."createdAt" < :currentDate THEN 1 END) AS last_7_days_count`,
        `COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END) AS previous_7_days_count`,
        `CASE
      WHEN COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END) = 0 THEN NULL
      ELSE (
        (
          COUNT(CASE WHEN i."createdAt" >= :oneWeekAgo AND i."createdAt" < :currentDate THEN 1 END) -
          COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END)
        ) * 100.0 /
        COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END)
      )
    END AS relative_difference_percent`,
      ])
      .innerJoin('users', 'u', 'u.id = i.userId')
      .where('u.teamId = :teamId', { teamId: user.team.id })
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();
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

  async getUserStreak(userId: string) {
    const result = await this.insightRepository
      .createQueryBuilder('insights')
      .select(`DATE_TRUNC('week', insights.createdAt)`, 'week_start') // Use "week_start" alias
      .addSelect(
        `RANK() OVER (ORDER BY DATE_TRUNC('week', insights.createdAt) ASC)`,
        'week_rank' // Alias the rank column
      )
      .where('insights.userId = :userId', { userId })
      .groupBy(`DATE_TRUNC('week', insights.createdAt)`)
      .orderBy(`DATE_TRUNC('week', insights.createdAt)`, 'ASC') // Use the actual expression instead of alias
      .getRawMany();

    // Process the raw results to calculate the streak
    let streak = 0;
    let lastWeek = null;

    for (const row of result) {
      const currentWeek = new Date(row.week_start).getTime(); // Use the correct alias
      if (!lastWeek || currentWeek - lastWeek === 7 * 24 * 60 * 60 * 1000) {
        // Either the first week or consecutive week
        streak++;
      } else if (currentWeek - lastWeek > 7 * 24 * 60 * 60 * 1000) {
        // Break in the streak
        break;
      }
      lastWeek = currentWeek;
    }
    
    return { count: streak };
  }
}
