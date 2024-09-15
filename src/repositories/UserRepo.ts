import { datasource } from "../config/datasource";
import { UserEntity } from "../entities";

export const userRepo = datasource.getRepository(UserEntity).extend({
  async findByTeamId(teamId: string): Promise<UserEntity[]> {
    return this.createQueryBuilder("users")
      .where("users.teamId = :teamId", { teamId })
      .getMany();
  },
});
