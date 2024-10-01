import { getDatasource, InsightEntity, TagEntity, UserEntity } from "@idealgma/datasource";

export const insightService = {
  async saveInsight(
    userId: string,
    text: string,
    tags: TagEntity[],
    link: string | undefined,
  ): Promise<InsightEntity> {
    const datasource = getDatasource();
    const insightRepository = datasource.getRepository(InsightEntity);
    const userRepository = datasource.getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (user) {
      return await insightRepository.save({
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
