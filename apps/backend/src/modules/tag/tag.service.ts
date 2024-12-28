import { TotalTags } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async getTotalUserThemes(userId: string): Promise<TotalTags> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const result = await this.tagRepository
      .createQueryBuilder('t')
      .select([
        'COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) AS total_tags_current',
        'COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) AS total_tags_previous',
      ])
      .innerJoin('insight_tag', 'it', 't.id = it.tagsId')
      .innerJoin('insights', 'i', 'i.id = it.insightsId')
      .where('i.userId = :userId', { userId })
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();

    const { total_tags_current, total_tags_previous } = result;

    const relative_difference_percent =
      total_tags_previous === 0
        ? 0
        : ((total_tags_current - total_tags_previous) * 100.0) /
          total_tags_previous;

    return {
      total_tags_current: total_tags_current.toString(),
      total_tags_previous: total_tags_previous.toString(),
      relative_difference_percent: relative_difference_percent.toString(),
    };
  }

  async getTotalTeamThemes(teamId: string): Promise<TotalTags> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const result = await this.tagRepository
      .createQueryBuilder('t')
      .select([
        'COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) AS total_tags_current',
        'COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) AS total_tags_previous',
      ])
      .innerJoin('insight_tag', 'it', 't.id = it.tagsId')
      .innerJoin('insights', 'i', 'i.id = it.insightsId')
      .innerJoin('users', 'u', 'i.userId = u.id')
      .where('u.teamId = :teamId', { teamId })
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();

    const { total_tags_current, total_tags_previous } = result;

    const relative_difference_percent =
      total_tags_previous === 0
        ? 0
        : ((total_tags_current - total_tags_previous) * 100.0) /
          total_tags_previous;

    return {
      total_tags_current: total_tags_current.toString(),
      total_tags_previous: total_tags_previous.toString(),
      relative_difference_percent: relative_difference_percent.toString(),
    };
  }
}
