import { AppDataSource } from "../data-source";
import { Insight } from "../entities";

export const InsightRepository = AppDataSource.getRepository(Insight).extend({
  // add custom methods
});
