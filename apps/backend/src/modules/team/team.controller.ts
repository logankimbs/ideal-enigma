import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Insight } from '../insight/insight.entity';
import { InsightService } from '../insight/insight.service';
import { Summary } from '../summary/summary.entity';
import { SummaryService } from '../summary/summary.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly insightService: InsightService,
    private readonly summaryService: SummaryService
  ) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

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
}
