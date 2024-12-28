import { Controller, Get, Param, Query } from '@nestjs/common';
import { Insight } from '../insight/insight.entity';
import { InsightService } from '../insight/insight.service';
import { Summary } from '../summary/summary.entity';
import { SummaryService } from '../summary/summary.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly insightService: InsightService,
    private readonly summaryService: SummaryService,
    private readonly userService: UserService
  ) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

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

  // This endpoint gets all users for a given team.
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

  @Get(':teamId/insights/average')
  async getTeamInsightAverage(@Param('teamId') teamId: string): Promise<any> {
    return this.insightService.getAverageTeamInsights(teamId);
  }

  @Get(':teamId/contributors')
  async getContributors(@Param('teamId') teamId: string) {
    return this.insightService.getActiveContributors(teamId);
  }

  @Get(':teamId/themes/total')
  async getTotalTeamThemes(@Param('teamId') teamId: string) {
    return await this.userService.getTotalTeamThemes(teamId);
  }

  @Get(':teamId/insights/total')
  async getTotalTeamInsights(@Param('teamId') teamId: string) {
    return await this.insightService.getTotalTeamInsights(teamId);
  }
}
