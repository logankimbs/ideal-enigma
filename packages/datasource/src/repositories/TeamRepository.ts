import { EntityManager, Repository } from "typeorm";
import { TeamEntity } from "../entities";

export class TeamRepository extends Repository<TeamEntity> {
  constructor(manager: EntityManager) {
    super(TeamEntity, manager);
  }
  
  async getTeamWithUsers(teamId: string): Promise<TeamEntity | null> {
    const teamWithUsers = await this.findOne({
      where: { id: teamId },
      relations: ["users"], // This ensures that the users are loaded
    });

    return teamWithUsers;
  }
}
