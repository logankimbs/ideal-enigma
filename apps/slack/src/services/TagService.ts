import { getDatasource, TagEntity } from "@idealgma/datasource";

const tagService = {
  async parseAndSaveTags(tags?: string): Promise<TagEntity[]> {
    if (!tags) return [];

    const datasource = getDatasource();
    const tagRepository = datasource.getRepository(TagEntity);
    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
      .map((text) => ({ text }) as TagEntity);

    return await tagRepository.save(parsedTags);
  },
};

export default tagService;
