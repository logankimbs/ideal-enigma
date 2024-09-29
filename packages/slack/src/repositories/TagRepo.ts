import datasource from "@idealgma/datasource";
import { TagEntity } from "../entities";

export const tagRepo = datasource.getRepository(TagEntity).extend({
  async getTagsForTeam(teamId: string) {
    return await this.createQueryBuilder("tag")
      .innerJoin("tag.insights", "insight")
      .innerJoin("insight.user", "user")
      .innerJoin("user.team", "team")
      .where("team.id = :teamId", { teamId })
      .getMany();
  },
});
