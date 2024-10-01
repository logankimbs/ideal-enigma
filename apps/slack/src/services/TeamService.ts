import { getDatasource, TeamEntity } from "@idealgma/datasource";
import { TeamInfoResponse } from "@slack/web-api";

const datasource = getDatasource();
const teamRepository = datasource.getRepository(TeamEntity);

export class TeamService {
  public async saveTeam(team: TeamInfoResponse["team"]): Promise<TeamEntity> {
    try {
      this.validateTeam(team);
      const teamEntity = this.mapToTeamEntity(team);

      return await teamRepository.save(teamEntity);
    } catch (error) {
      console.error(`Failed to save team with ID: ${team?.id}`, error);
      throw new Error(`Failed to save team: ${team?.id}`);
    }
  }

  private validateTeam(team: TeamInfoResponse["team"]): void {
    if (!team?.id) {
      throw new Error("Team ID is required but was not provided.");
    }
  }

  private mapToTeamEntity(team: TeamInfoResponse["team"]): TeamEntity {
    return {
      id: team?.id,
      data: team,
    } as TeamEntity;
  }
}

export const teamService = new TeamService();
