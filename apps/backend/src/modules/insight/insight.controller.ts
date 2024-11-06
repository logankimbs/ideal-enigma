import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CreateInsightDto } from './dto/create-insight.dto';
import { MarkInsightSummarizedDto } from './dto/insight-summarized.dto';
import { Insight } from './insight.entity';
import { InsightService } from './insight.service';

@Controller('insights')
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Post()
  async create(@Body() createInsightDto: CreateInsightDto): Promise<Insight> {
    return await this.insightService.create(createInsightDto);
  }

  @Get('repository')
  async getInsightsRepository(
    @Query() query: { userId: string }
  ): Promise<Insight[]> {
    console.log('getting insight repo for user', query.userId);
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
