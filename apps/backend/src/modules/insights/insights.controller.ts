import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Insight } from '../../infra/database/entities/insight.entity';
import { CreateInsightDto } from './dtos/create-insight.dto';
import { GetInsightByIdDto } from './dtos/get-insight.dto';
import { MarkInsightSummarizedDto } from './dtos/insight-summarized.dto';
import { InsightsService } from './insights.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightService: InsightsService) {}

  @Post()
  async create(@Body() createInsightDto: CreateInsightDto): Promise<Insight> {
    return await this.insightService.create(createInsightDto);
  }

  @Get()
  async getInsightsById(
    @Query() getInsightByIdDto: GetInsightByIdDto
  ): Promise<Insight> {
    return await this.insightService.getInsightsById(getInsightByIdDto);
  }

  @Get('repository')
  async getInsightsRepository(
    @Query() query: { userId: string }
  ): Promise<Insight[]> {
    return await this.insightService.getInsightsRepository(query.userId);
  }

  @Get('summarize')
  async getInsightsToSummarize(
    @Query() query: { teamId: string }
  ): Promise<Insight[]> {
    return await this.insightService.getInsightsToSummarize(query.teamId);
  }

  @Put()
  async markInsightsSummarized(
    @Body() markInsightSummarizedDto: MarkInsightSummarizedDto
  ): Promise<void> {
    return await this.insightService.markInsightsSummarized(
      markInsightSummarizedDto
    );
  }
}
