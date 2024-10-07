import { Repository } from "typeorm";
import { TagEntity } from "../entities";

export class TagRepository extends Repository<TagEntity> {
  async getTagsForTeam(teamId: string) {
    const teamTags = await this.createQueryBuilder("tag")
      .innerJoin("tag.insights", "insight")
      .innerJoin("insight.user", "user")
      .innerJoin("user.team", "team")
      .where("team.id = :teamId", { teamId })
      .getMany();

    return teamTags;
  }
}
