import { getDatasource } from "@idealgma/datasource";
import { UserEntity } from "../entities";

const datasource = getDatasource();

export const userRepo = datasource.getRepository(UserEntity).extend({
  async findByTeamId(teamId: string): Promise<UserEntity[]> {
    return this.createQueryBuilder("users")
      .where("users.teamId = :teamId", { teamId })
      .getMany();
  },
});
