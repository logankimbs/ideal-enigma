import { Stat } from '@ideal-enigma/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { calculateChange } from '../../common/utils';
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

  async getTotalTeamThemes(teamId: string): Promise<Stat> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const result = await this.tagRepository
      .createQueryBuilder('t')
      .select([
        'COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) AS "totalCurrent"',
        'COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) AS "totalPrevious"',
      ])
      .innerJoin('insight_tag', 'it', 't.id = it.tagsId')
      .innerJoin('insights', 'i', 'i.id = it.insightsId')
      .innerJoin('users', 'u', 'i.userId = u.id')
      .where('u.teamId = :teamId', { teamId })
      .setParameters({ oneWeekAgo, currentDate: new Date(), twoWeeksAgo })
      .getRawOne();

    const totalCurrent = Number(result.totalCurrent);
    const totalPrevious = Number(result.totalPrevious);
    const change = calculateChange(totalCurrent, totalPrevious);

    return { value: totalCurrent.toString(), change: change.toString() };
  }
}
