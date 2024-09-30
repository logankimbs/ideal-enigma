import { InsightEntity, TagEntity } from "../entities";
import { insightRepo, userRepo } from "../repositories";

export const insightService = {
  async saveInsight(
    userId: string,
    text: string,
    tags: TagEntity[],
    link: string | undefined,
  ): Promise<InsightEntity> {
    const user = await userRepo.findOne({ where: { id: userId } });

    if (user) {
      return await insightRepo.save({
        text,
        user,
        isSummarized: false,
        tags,
        link,
      });
    }

    throw new Error(`User ${userId} not found when trying to save insight.`);
  },
};
