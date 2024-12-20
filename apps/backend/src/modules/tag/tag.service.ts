import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "./tag.entity";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async getUserWeeklyTagCountAndChange(userId: string) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    return await this.tagRepository
      .createQueryBuilder('t')
      .innerJoin('insight_tag', 'it', 't.id = it.tagsId')
      .innerJoin('insights', 'i', 'i.id = it.insightsId')
      .select([
        // Count tags in the last 7 days
        `COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) AS total_tags_current`,
        // Count tags in the previous week (7-14 days ago)
        `COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) AS total_tags_previous`,
        // Calculate percentage change
        `CASE
        WHEN COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) = 0 THEN NULL
        ELSE (
          (
            COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) -
            COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END)
          ) * 100.0 /
          COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END)
        )
      END AS relative_difference_percent`,
      ])
      .where('i.userId = :userId', {userId})
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();
  }

  async getTeamWeeklyTagCountAndChange(teamId: string) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    return await this.tagRepository
      .createQueryBuilder('t')
      .innerJoin('insight_tag', 'it', 't.id = it.tagsId')
      .innerJoin('insights', 'i', 'i.id = it.insightsId')
      .innerJoin('users', 'u', 'i.userId = u.id')
      .select([
        // Count tags created in the last 7 days
        `COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) AS total_tags_current`,
        // Count tags created in the previous week (7-14 days ago)
        `COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) AS total_tags_previous`,
        // Percentage change calculation
        `CASE
        WHEN COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END) = 0 THEN NULL
        ELSE (
          (
            COUNT(CASE WHEN t."createdAt" >= :oneWeekAgo AND t."createdAt" < :currentDate THEN 1 END) -
            COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END)
          ) * 100.0 /
          COUNT(CASE WHEN t."createdAt" >= :twoWeeksAgo AND t."createdAt" < :oneWeekAgo THEN 1 END)
        )
      END AS relative_difference_percent`,
      ])
      .where('u.teamId = :teamId', { teamId })
      .setParameters({
        oneWeekAgo,
        currentDate: new Date(),
        twoWeeksAgo,
      })
      .getRawOne();
  }
}
