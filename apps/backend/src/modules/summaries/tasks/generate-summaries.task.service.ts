import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Insight } from '../../../infra/database/entities/insight.entity';
import { Installation } from '../../../infra/database/entities/installation.entity';
import { Team } from '../../../infra/database/entities/team.entity';
import { User } from '../../../infra/database/entities/user.entity';
import { OpenAIService } from '../../../infra/openai/openai.service';
import { SlackService } from '../../../infra/slack/slack.service';
import { InsightsService } from '../../insights/insights.service';
import { InstallationsService } from '../../installations/installations.service';
import { TeamsService } from '../../teams/teams.service';
import { SummariesService } from '../summaries.service';

type Data = {
  installation: Installation;
  users: User[];
  insights: Insight[];
};

@Injectable()
export class GenerateSummariesTaskService {
  private logger = new Logger(GenerateSummariesTaskService.name);

  constructor(
    private readonly summariesService: SummariesService,
    private readonly installationService: InstallationsService,
    private readonly insightService: InsightsService,
    private readonly openAIService: OpenAIService,
    private readonly slackService: SlackService,
    private readonly teamService: TeamsService
  ) {}

  // Runs every Sunday at midnight (12:00 AM)
  @Cron('0 0 * * 0')
  async runTask() {
    this.logger.log('Starting generate summaries task...');

    try {
      const [installations, teams, insights] = await this.fetchData();
      const installMap = InstallationsService.toMap(installations);
      const teamInsightsMap = this.createTeamInsightsMap(insights);
      const teamMap = this.createTeamMap(teams, installMap, teamInsightsMap);

      await this.processTeams(teamMap);

      this.logger.log(
        `Ran task for ${teamMap.size} out of ${teams.length} teams`,
        'Generate summaries task successfully completed'
      );
    } catch (error) {
      this.logger.error(
        `Error running generate summaries task: ${error.message}`,
        error.stack
      );
    }
  }

  private async fetchData(): Promise<[Installation[], Team[], Insight[]]> {
    return await Promise.all([
      this.installationService.getAllInstallations(),
      this.teamService.getAllTeams(),
      this.insightService.getAllUnsummarizedInsights(),
    ]);
  }

  private createTeamInsightsMap(insights: Insight[]): Map<string, Insight[]> {
    const teamInsightsMap = new Map<string, Insight[]>();

    insights.forEach((insight) => {
      const teamId = insight.user?.team?.id;

      if (!teamId) {
        this.logger.warn(`Insight ${insight.id} does not belong to a team.`);
        return;
      }

      if (!teamInsightsMap.has(teamId)) {
        teamInsightsMap.set(teamId, []);
      }

      teamInsightsMap.get(teamId).push(insight);
    });

    return teamInsightsMap;
  }

  private createTeamMap(
    teams: Team[],
    installationMap: Map<string, Installation>,
    teamInsightsMap: Map<string, Insight[]>
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
        insights: teamInsightsMap.get(team.id) ?? [],
      });
    });

    return teamMap;
  }

  private async processTeams(teamMap: Map<string, Data>): Promise<void> {
    await Promise.all(
      Array.from(teamMap.entries()).map(
        async ([teamId, { installation, users, insights }]) => {
          const token = installation?.token;
          if (!token) {
            this.logger.warn(`Missing token for team ${teamId}`);
            return;
          }

          try {
            if (insights.length < 10) {
              this.logger.log(`Sending reminder message to team ${teamId}`);
              await this.slackService.sendReminderMessage(
                token,
                users,
                'monday'
              );
              return;
            }

            this.logger.log(`Generating summary for team ${teamId}`);
            const response = await this.openAIService.generateSummary(insights);
            const summary = await this.summariesService.create({
              teamId,
              ...response,
            });

            await this.slackService.sendSummaryMessage(
              token,
              users,
              response.data
            );
            await this.insightService.markInsightsSummarized({
              insights,
              summary,
            });
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
