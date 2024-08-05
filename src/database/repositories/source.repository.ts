import { AppDataSource } from "../data-source";
import { Source } from "../entities";

export const SourceRepository = AppDataSource.getRepository(Source).extend({
  // add custom methods
});
