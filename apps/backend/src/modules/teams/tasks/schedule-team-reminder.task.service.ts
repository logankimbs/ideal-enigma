import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Installation } from '../../../infra/database/entities/installation.entity';
import { Team } from '../../../infra/database/entities/team.entity';
import { User } from '../../../infra/database/entities/user.entity';
import { SlackService } from '../../../infra/slack/slack.service';
import { InstallationsService } from '../../installations/installations.service';
import { TeamsService } from '../teams.service';

type Data = {
  installation: Installation;
  users: User[];
};

@Injectable()
export class ScheduleTeamReminderTaskService {
  private logger = new Logger(ScheduleTeamReminderTaskService.name);

  constructor(
    private readonly installationService: InstallationsService,
    private readonly teamService: TeamsService,
    private readonly slackService: SlackService
  ) {}

  // Runs every Monday at midnight (12:00 AM)
  @Cron('0 0 * * 1')
  async runTask() {
    this.logger.log('Starting schedule team reminder task...');

    try {
      const [installations, teams] = await this.fetchData();
      const installMap = InstallationsService.toMap(installations);
      const teamMap = this.createTeamMap(teams, installMap);

      await this.processTeams(teamMap);

      this.logger.log(
        `Ran task for ${teamMap.size} out of ${teams.length} teams`,
        'Schedule team reminder task successfully completed'
      );
    } catch (error) {
      this.logger.error(
        `Error running schedule team reminder task: ${error.message}`,
        error.stack
      );
    }
  }

  private async fetchData(): Promise<[Installation[], Team[]]> {
    return await Promise.all([
      this.installationService.getAllInstallations(),
      this.teamService.getAllTeams(),
    ]);
  }

  private createTeamMap(
    teams: Team[],
    installationMap: Map<string, Installation>
  ): Map<string, Data> {
    const teamMap = new Map<string, Data>();

    teams.forEach((team) => {
      if (!installationMap.has(team.id)) {
        this.logger.warn(`Installation does not exist for team: ${team.id}`);
        return;
      }

      teamMap.set(team.id, {
        installation: installationMap.get(team.id) ?? null,
        users: team.users?.filter((user) => user.notifications) ?? [],
      });
    });

    return teamMap;
  }

  private async processTeams(teamMap: Map<string, Data>): Promise<void> {
    await Promise.all(
      Array.from(teamMap.entries()).map(
        async ([teamId, { installation, users }]) => {
          const token = installation?.token;
          if (!token) {
            this.logger.warn(`Missing token for team ${teamId}`);
            return;
          }

          if (users.length === 0) return;

          try {
            this.logger.log(`Scheduling reminder for team ${teamId}`);
            await this.slackService.sendReminderMessage(token, users, 'friday');
          } catch (error) {
            this.logger.error(
              `Error generating summary for team ${teamId}`,
              error
            );
          }
        }
      )
    );
  }
}
