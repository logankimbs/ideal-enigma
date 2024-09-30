import { getDatasource } from "@idealgma/datasource";
import { InsightEntity } from "../entities";

const datasource = getDatasource();

export const insightRepo = datasource.getRepository(InsightEntity).extend({
  // TODO: This function will need to be optimized
  async getRecentUnsummarizedInsightsForTeam(
    teamId: string,
  ): Promise<InsightEntity[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.createQueryBuilder("insights")
      .leftJoinAndSelect("insights.user", "users")
      .leftJoinAndSelect("users.team", "teams")
      .where("teams.id = :teamId", { teamId })
      .andWhere("insights.isSummarized = false")
      .andWhere("insights.createdAt > :oneMonthAgo", { oneMonthAgo })
      .getMany();
  },

  async markInsightsAsSummarized(insights: InsightEntity[]): Promise<void> {
    insights.forEach((insight) => {
      insight.isSummarized = true;
    });

    await this.save(insights);
  },
});
