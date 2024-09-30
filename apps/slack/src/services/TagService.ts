import { TagEntity } from "../entities";
import { tagRepo } from "../repositories";

const tagService = {
  async parseAndSaveTags(tags?: string): Promise<TagEntity[]> {
    if (!tags) return [];

    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
      .map((text) => ({ text }) as TagEntity);

    return await tagRepo.save(parsedTags);
  },
};

export default tagService;
