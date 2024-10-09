import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateInsightDto } from "./dto/create-insight.dto";
import { MarkInsightSummarized } from "./dto/insight-summarized.dto";
import { Insight } from "./insight.entity";
import { InsightService } from "./insight.service";

@Controller("insight")
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Post()
  async create(@Body() createInsightDto: CreateInsightDto): Promise<Insight> {
    return await this.insightService.create(createInsightDto);
  }

  @Get()
  async findAll(): Promise<Insight[]> {
    const insights = await this.insightService.findAll();
    return insights;
  }

  @Get(":id")
  async getRecentUnsummarizedInsightsForTeam(
    @Param() params: { id: string },
  ): Promise<Insight[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return await this.insightService.getRecentUnsummarizedInsightsForTeam(
      params.id,
      oneMonthAgo,
    );
  }

  @Put()
  async markInsightsAsSummarized(
    @Body() markInsightSummarized: MarkInsightSummarized,
  ): Promise<void> {
    return await this.insightService.markInsightsAsSummarized(
      markInsightSummarized,
    );
  }
}
