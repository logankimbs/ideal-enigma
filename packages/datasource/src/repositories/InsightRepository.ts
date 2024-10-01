import { Repository } from "typeorm";
import { InsightEntity } from "../entities";

export class InsightRepository extends Repository<InsightEntity> {
  async getRecentUnsummarizedInsightsForTeam(
    teamId: string,
  ): Promise<InsightEntity[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const insights = await this.createQueryBuilder("insights")
      .leftJoinAndSelect("insights.user", "users")
      .leftJoinAndSelect("users.team", "teams")
      .where("teams.id = :teamId", { teamId })
      .andWhere("insights.isSummarized = false")
      .andWhere("insights.createdAt > :oneMonthAgo", { oneMonthAgo })
      .getMany();

    return insights;
  }

  async markInsightsAsSummarized(insights: InsightEntity[]): Promise<void> {
    insights.forEach((insight) => {
      insight.isSummarized = true;
    });

    await this.save(insights);
  }
}
