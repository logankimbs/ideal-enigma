import {
  ActiveContributors,
  Average,
  Stat,
  UserStreak,
} from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { calculateChange } from '../../common/utils';
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

  async getTotalUserInsights(userId: string): Promise<Stat> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const result = await this.insightRepository
      .createQueryBuilder('i')
      .select([
        'COUNT(CASE WHEN i."createdAt" >= :oneWeekAgo AND i."createdAt" < :currentDate THEN 1 END) AS "totalCurrent"',
        'COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END) AS "totalPrevious"',
      ])
      .where('i.userId = :userId', { userId })
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();

    const totalCurrent = Number(result.totalCurrent);
    const totalPrevious = Number(result.totalPrevious);
    const change = calculateChange(totalCurrent, totalPrevious).toFixed(2);

    return { value: totalCurrent.toString(), change: change.toString() };
  }

  async getTotalTeamInsights(teamId: string): Promise<Stat> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const team = await this.teamService.find(teamId);

    const result = await this.insightRepository
      .createQueryBuilder('i')
      .select([
        'COUNT(CASE WHEN i."createdAt" >= :oneWeekAgo AND i."createdAt" < :currentDate THEN 1 END) AS "totalCurrent"',
        'COUNT(CASE WHEN i."createdAt" >= :twoWeeksAgo AND i."createdAt" < :oneWeekAgo THEN 1 END) AS "totalPrevious"',
      ])
      .innerJoin('users', 'u', 'u.id = i.userId')
      .where('u.teamId = :teamId', { teamId: team.id })
      .setParameters({ oneWeekAgo, currentDate: new Date(), twoWeeksAgo })
      .getRawOne();

    const totalCurrent = Number(result.totalCurrent);
    const totalPrevious = Number(result.totalPrevious);
    const change = calculateChange(totalCurrent, totalPrevious).toFixed(2);

    return { value: totalCurrent.toString(), change: change.toString() };
  }

  async getUserStreak(userId: string): Promise<UserStreak> {
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

  async getAverageUserInsights(userId: string): Promise<Stat> {
    const sqlQuery = `
      with earliest_installation as ( select min(i."createdAt") as earliest_installation_date
                                      from "installations" i
                                             join "users" u on u."teamId" = i.id
                                      where u.id = $1 ),
           weeks as ( select generate_series(
                               date_trunc('week', ( select earliest_installation_date from earliest_installation )),
                               date_trunc('week', current_date), interval '1 week') as week_start ),
           insight_counts as ( select date_trunc('week', "createdAt") as week_start, count(*) as insight_count
                               from "insights"
                               where "userId" = $1
                               group by 1 )
      select w.week_start, coalesce(ic.insight_count, 0) as insight_count
      from weeks w
             left join insight_counts ic on w.week_start = ic.week_start
      order by w.week_start desc
    `;

    const results = await this.insightRepository.query(sqlQuery, [userId]);
    const sum = results.reduce((a, r) => a + Number(r.insight_count), 0);
    const averageInsights = results.length ? sum / results.length : 0;
    const currentWeekCount = Number(results[0]?.insight_count ?? 0);
    const previousWeekCount = Number(results[1]?.insight_count ?? 0);
    const change = calculateChange(currentWeekCount, previousWeekCount);

    return {
      value: averageInsights.toFixed(2),
      change: change.toString(),
    };
  }

  async getAverageTeamInsights(teamId: string): Promise<Stat> {
    const sqlQuery = `
      with team_installation_dates as ( select u.id as userId, i.id as teamId, i."createdAt" as installationDate
                                        from users u
                                               inner join installations i on i.id = $1 ),
           weeks as ( select generate_series(
                               ( select date_trunc('week', min(installationDate)) from team_installation_dates ),
                               date_trunc('week', current_date), interval '1 week') as week_start ),
           insight_counts as ( select date_trunc('week', i."createdAt") as week_start,
                                      count(distinct i.id)              as insight_count
                               from insights i
                               where i."userId" in ( select id from users where "teamId" = $1 )
                               group by 1 )
      select w.week_start, coalesce(ic.insight_count, 0) as insight_count
      from weeks w
             left join insight_counts ic on w.week_start = ic.week_start
      order by w.week_start desc;
    `;

    const results: Average[] = await this.insightRepository.query(sqlQuery, [
      teamId,
    ]);
    const sum = results.reduce((a, r) => a + Number(r.insight_count), 0);
    const averageInsights = results.length ? sum / results.length : 0;
    const currentWeekCount = Number(results[0]?.insight_count ?? 0);
    const previousWeekCount = Number(results[1]?.insight_count ?? 0);
    const change = calculateChange(currentWeekCount, previousWeekCount);

    return {
      value: averageInsights.toFixed(2),
      change: change.toString(),
    };
  }

  async getActiveContributors(teamId: string): Promise<ActiveContributors> {
    const weekResults = await this.insightRepository
      .createQueryBuilder('i')
      .innerJoin('users', 'u', 'u.id = i.userId')
      .select([
        `DATE_TRUNC('week', i."createdAt") AS "week_start"`,
        `COUNT(DISTINCT i."userId") AS "users_submitted_insights"`,
      ])
      .where('u.teamId = :teamId', { teamId })
      .groupBy(`DATE_TRUNC('week', i."createdAt")`)
      .orderBy(`DATE_TRUNC('week', i."createdAt")`, 'ASC')
      .getRawMany();

    if (!weekResults.length) {
      return { this_week_avg: 0, change_percent: 0 };
    }

    const this_week = weekResults.at(-1);
    let change_percent = null;

    if (weekResults.length > 1) {
      const last_week = weekResults.at(-2);

      change_percent =
        ((this_week.users_submitted_insights -
          last_week.users_submitted_insights) /
          last_week.users_submitted_insights) *
        100;
    }

    return {
      this_week_avg: this_week.users_submitted_insights,
      change_percent: change_percent || 0,
    };
  }
}
