import { insightRepo, userRepo } from "../repositories";

export const insightService = {
  async saveInsight(userId: string, text: string) {
    const user = await userRepo.findOne({ where: { id: userId } });

    if (user) {
      await insightRepo.save({ text, user, isSummarized: false });
    }
  },
};
