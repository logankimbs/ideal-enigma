import { Repository } from "typeorm";
import { UserEntity } from "../entities";

export class UserRepository extends Repository<UserEntity> {
  async findByTeamId(teamId: string): Promise<UserEntity[]> {
    const user = await this.createQueryBuilder("users")
      .where("users.teamId = :teamId", { teamId })
      .getMany();

    return user;
  }
}
