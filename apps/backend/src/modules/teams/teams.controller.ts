import { Controller, Get, Param, Query } from '@nestjs/common';
import { Insight } from '../../infra/database/entities/insight.entity';
import { Summary } from '../../infra/database/entities/summary.entity';
import { Team } from '../../infra/database/entities/team.entity';
import { User } from '../../infra/database/entities/user.entity';
import { InsightsService } from '../insights/insights.service';
import { SummariesService } from '../summaries/summaries.service';
import { UsersService } from '../users/users.service';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamService: TeamsService,
    private readonly insightService: InsightsService,
    private readonly summaryService: SummariesService,
    private readonly userService: UsersService
  ) {}

  @Get(':id')
  find(@Param() params: { id: string }): Promise<Team> {
    return this.teamService.find(params.id);
  }

  @Get(':teamId/insights/recent')
  async getRecentInsights(
    @Param('teamId') teamId: string,
    @Query('limit') limit = 5
  ): Promise<Insight[]> {
    return this.insightService.getRecentInsights(teamId, limit);
  }

  @Get(':teamId/summaries/recent')
  async getRecentSummary(@Param('teamId') teamId: string): Promise<Summary> {
    return this.summaryService.getRecentSummary(teamId);
  }

  @Get(':teamId/users')
  async getTeamUsers(@Param('teamId') teamId: string): Promise<User[]> {
    return this.userService.getUsers(teamId);
  }

  @Get(':teamId/users/notifications-enabled')
  async getUsersWithNotifications(
    @Param('teamId') teamId: string
  ): Promise<User[]> {
    return this.userService.getUsersWithNotifications(teamId, true);
  }

  @Get(':teamId/stats')
  async getUserStats(@Param('teamId') teamId: string) {
    return await this.teamService.getTeamStats(teamId);
  }
}
