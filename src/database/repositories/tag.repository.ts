import { AppDataSource } from "../data-source";
import { Tag } from "../entities";

export const TagRepository = AppDataSource.getRepository(Tag).extend({
  // add custom methods
});
