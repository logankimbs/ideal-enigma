import { getDatasource } from "@idealgma/datasource";
import { TeamEntity } from "../entities";

const datasource = getDatasource();

export const teamRepo = datasource.getRepository(TeamEntity).extend({
  async getTeamWithUsers(teamId: string): Promise<TeamEntity | null> {
    return await this.findOne({
      where: { id: teamId },
      relations: ["users"], // This ensures that the users are loaded
    });
  },
});
