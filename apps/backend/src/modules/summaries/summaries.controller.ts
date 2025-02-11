import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Summary } from '../../infra/database/entities/summary.entity';
import { CreateSummaryDto } from './dtos/create-summary.dto';
import { SummariesService } from './summaries.service';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}

  @Post()
  async create(@Body() createSummaryDto: CreateSummaryDto): Promise<Summary> {
    return await this.summaryService.create(createSummaryDto);
  }

  @Get(':id')
  async getSummaryById(@Param('id') id: string) {
    return this.summaryService.findById(id);
  }

  @Get('team/:teamId')
  async getSummariesByTeamId(@Param('teamId') teamId: string) {
    return this.summaryService.findByTeamId(teamId);
  }

  @Get(':id/insights')
  async getInsightsInSummary(@Param('id') id: string) {
    return this.summaryService.getInsightsInSummary(id);
  }
}
